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
                        @click="onClickDeleteFile"
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

import Swal from 'sweetalert2'


import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { DELETE_LESSONS_MUTATION } from '@/graphql/mutations/lessons'

export default {
    name: 'LessonActionButton',

    components: {
        LessonDialog: () => import('./LessonDialog')
    },

    props: ['item', 'items'],

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
        },

        // TRIGGER THE EVENT TO DELETE
        onClickDeleteFile () {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.removeFileInFirebase()
                }
            })
        },

        // DELETE THE FILE IN THE FIREBASE
        removeFileInFirebase () {
            let file = fb.storage().refFromURL(this.item.url_files)
            this.items.splice(this.item, 1)

            file
             .delete()
             .then(() => {
                this.removeFileDataInHasura () // PASSED THE HASURA REMOVE METHOD
                toastAlertStatus('success', `Successfully Deleted in Firebase.`)
             })
             .catch(error => toastAlertStatus('error', error))
        },

        // DELETE THE FILE DATA IN HASURA
        removeFileDataInHasura () {
            this
             .$apollo
             .mutate({
                 mutation: DELETE_LESSONS_MUTATION,
                 variables: { id: this.item.id }
             })
             .then(() => {
                toastAlertStatus('success', `Successfully Deleted in Hasura.`)
             })
             .catch(error => toastAlertStatus('error', error))
        }
    }
}
</script>