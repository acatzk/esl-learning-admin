<template>
    <v-row justify="center">
        <v-dialog v-model="show" :max-width="modalType === 'edit' ? '1000px' : '500px'">
            <v-card :dark="mode ? false : true">
                <v-card-title>
                    <span class="headline" v-if="modalType === 'edit'">
                        <v-icon left size="35">mdi-pencil</v-icon> Edit Lesson
                    </span>
                    <span class="headline" v-else>
                        <v-icon left size="35">mdi-plus</v-icon> New Lesson
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                         <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <div class="d-flex">
                                <v-row style="max-width: 500px;">
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Title"
                                            v-model="item.title"
                                            prepend-icon="mdi-file-document"
                                            :rules="[required('Title')]"
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea
                                            label="Description"
                                            rows="2"
                                            v-model="item.description"
                                            prepend-icon="mdi-image-filter-frames"
                                            hint="Optional"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Price in peso"
                                            v-model="item.price"
                                            type="number"
                                            prepend-icon="mdi-currency-php"
                                            :rules="[required('Price')]"
                                        />
                                    </v-col>
                                    <v-col cols="12">
                                        <v-file-input
                                            @change="onChangeUploadFiles"
                                            :label="modalType === 'edit' ? 'Click here to update an existing file' : 'Upload File'"
                                            prepend-icon="mdi-file-cloud"
                                            show-size
                                            :loading="loading"
                                            accept="application/pdf"
                                        ></v-file-input>
                                        <div v-show="loading">
                                            <v-progress-linear
                                                color="light-blue"
                                                height="10"
                                                :value="progress"
                                                striped
                                            >
                                            </v-progress-linear>
                                            Upload is {{ progress }}% done
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row class="pdf-file" v-show="modalType === 'edit'">
                                     <v-toolbar
                                            dark
                                            flat
                                    >
                                        <v-toolbar-title class="d-flex">
                                            <v-icon left>{{ getDynamicFileIcon (item) }}</v-icon> {{ item.title }}
                                        </v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-tooltip top color="error">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn 
                                                    icon 
                                                    fab 
                                                    small
                                                    color="white"
                                                    v-on="on"
                                                    v-bind="attrs"
                                                >
                                                    <v-icon>mdi-close</v-icon>
                                                </v-btn>
                                        </template>
                                            <span>
                                            <v-icon color="white">delete</v-icon> Remove
                                            </span>
                                        </v-tooltip>
                                    </v-toolbar>
                                    <embed
                                        :src="item.url_files"
                                        type="application/pdf"
                                        class="pdf-embeded"
                                    />
                                </v-row>
                            </div>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        text 
                        small
                        color="grey" 
                        v-show="!loading && modalType === 'add'"
                        @click="$refs.form.reset()" 
                    >
                        <v-icon left>mdi-reload</v-icon> Reset
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :color="mode ? 'indigo darken-1 white' : ''" text small @click="show = !show">
                        <v-icon left>mdi-close-circle-outline</v-icon> Close
                    </v-btn>
                    <v-btn 
                        :color="mode ? 'indigo darken-1 white--text' : 'error'" 
                        small
                        depressed
                        :loading="loading"
                        @click="onSubmitLesson"
                    >
                      <v-icon left>mdi-content-save</v-icon>  Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>

import { mapState } from 'vuex'

import { fb } from '@/firebase'

import { toastAlertStatus, fileExtentionIcon } from '@/utils'

import { ADD_LESSONS_MUTATION, UPDATE_LESSONS_MUTATION } from '@/graphql/mutations/lessons'

export default {
    name: 'LessonDialog',

    props: ['visible', 'modalType', 'item'],

    data () {
        return {
            loading: false,
            valid: true,
            progress: 0,
            files: [],
            required(propertyType) { 
                return v => v && v.length > 0 || `${propertyType} is required.`
            }
        }
    },

    computed: {
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        },
        ...mapState(['mode'])
    },

    methods: {
        onSubmitLesson () {
            if (this.$refs.form.validate()) {
                this.loading = true

                const {
                    id,
                    title,
                    description,
                    price,
                    url_files,
                    size,
                    type
                } = this.item

                if (this.modalType === 'add') {
                    this
                    .$apollo
                    .mutate({
                        mutation: ADD_LESSONS_MUTATION,
                        variables: {
                            title,
                            description,
                            price,
                            url_files,
                            size,
                            type
                        }
                    })
                    .then(() => {
                        this.loading = false
                        this.show = !this.show
                        this.$refs.form.reset()
                        toastAlertStatus('success', 'Lesson Added Successfully')
                    })
                    .catch(error => {
                        this.loading = false
                        toastAlertStatus('error', error)
                    })
                }   

                if (this.modalType === 'edit') {
                    this
                    .$apollo
                    .mutate({
                        mutation: UPDATE_LESSONS_MUTATION,
                        variables: {
                            id,
                            title,
                            description,
                            price,
                            url_files,
                            size,
                            type
                        }
                    })
                    .then(() => {
                        this.loading = false
                        this.show = !this.show
                        this.$refs.form.reset()
                        toastAlertStatus('success', 'Lesson Updated Successfully')
                    })
                    .catch(error => {
                        this.loading = false
                        toastAlertStatus('error', error)
                    })
                }

            }
        },

        onChangeUploadFiles (file) {

            if (!file)  return;

            this.loading = true

            this.item.size = file.size // AUTOMATIC CAPTURE THE SIZE IN PDF FILE

            this.item.type = file.type // AUTOMATIC CAPTURE THE TYPE OF A FILE UPLOADED

            let storageRef = fb.storage().ref('lessons-files/' + file.name)
            let uploadTask = storageRef.put(file)
            uploadTask.on('state_changed', (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    this.progress = progress
                    console.log('Upload is ' + progress + '% done')
                }, (error) => {
                    // Handle unsuccessful uploads
                    toastAlertStatus('error', error)
                }, () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    this.loading = false
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then(downloadUrl => {
                            this.item.url_files = downloadUrl
                        })
                        .catch(error => toastAlertStatus('error', error))
            })

        },

        getDynamicFileIcon (item) {
            return fileExtentionIcon(item)
        }
    }
}
</script>

<style scoped lang="scss">
.v-btn {
  text-transform: capitalize;
}
.pdf-file {
    max-width: 500px; 
    margin-left: 15px; 
    border-radius: 5px !important;
    background: rgb(0, 0, 0);
    color: white;
    border: 1px solid rgb(207, 207, 207);
}
.pdf-embeded {
    height: 51vh;
    width: 100%;
}
</style>