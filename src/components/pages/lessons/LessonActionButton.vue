<template>
    <div class="action-button">
        <v-btn-toggle>
            <v-tooltip top color="primary">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small 
                        icon
                        :loading="loading"
                        @click="onDownloadPDF"
                    >
                        <v-icon>mdi-download</v-icon>
                    </v-btn>
                </template> 
                <span>Download</span>
            </v-tooltip>

            <v-tooltip top color="warning">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small 
                        icon
                        @click="dialog = true"
                    >
                        <v-icon>mdi-pencil-box-outline</v-icon>
                    </v-btn>
                </template>
                <span>Edit</span>
            </v-tooltip>

            <v-tooltip top color="error">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small
                        icon
                    >
                        <v-icon>delete_outline</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
        </v-btn-toggle>

        <lesson-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`edit`" 
            :item="item"
        />

    </div>
</template>

<script>

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

export default {
    name: 'LessonActionButton',

    components: {
        LessonDialog: () => import('./LessonDialog')
    },

    props: ['item'],

    data () {
        return {
            dialog: false,
            loading: false
        }
    },

    methods: {
        onDownloadPDF () {
            this.loading = true

            let storageRef = fb.storage().refFromURL(this.item.url_files)

            // Get the download URL
            storageRef.getDownloadURL().then((url) => {
                // Insert url into an <img> tag to "download"
                this.loading = false
                toastAlertStatus('success', `Downloaded ${this.item.title}`)
            }).catch((error) => {
                this.loading = false
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        toastAlertStatus('error', "Not Found: " + error.code)
                    break;

                    case 'storage/unauthorized':
                        toastAlertStatus('error', "Unauthorized: " + error.code)
                    break;

                    case 'storage/canceled':
                        toastAlertStatus('error', "Canceled: " + error.code)
                    break;

                    case 'storage/unknown':
                        toastAlertStatus('error', "Unknown: " + error.code)
                    break;
                }
            })
        }
    }
}
</script>