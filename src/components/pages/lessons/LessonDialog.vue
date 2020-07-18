<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="550px">
            <v-card>
                <v-card-title>
                    <span class="headline">
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
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Title"
                                        v-model="title"
                                        prepend-icon="mdi-file-document"
                                        :rules="[required('Title')]"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Description"
                                        rows="2"
                                        v-model="description"
                                        prepend-icon="mdi-image-filter-frames"
                                        hint="Optional"
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Price in peso"
                                        v-model="price"
                                        type="number"
                                        prepend-icon="mdi-currency-php"
                                        :rules="[required('Price')]"
                                    />
                                </v-col>
                                <v-col>
                                    <v-file-input
                                        @change="onChangeUploadFiles"
                                        label="Upload PDF File"
                                        prepend-icon="mdi-file-pdf-box"
                                        :show-size="1000"
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
                                <!-- <v-col cols="12">
                                    <pdf 
                                        src="C:\Users\Jheferzon\Documents\PDF\cashflow.pdf"
                                    />
                                </v-col> -->
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn 
                        text 
                        small
                        color="grey" 
                        v-show="!loading"
                        @click="$refs.form.reset()" 
                    >
                        <v-icon left>mdi-reload</v-icon> Reset
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="indigo darken-1" text small @click="show = !show">
                        <v-icon left>mdi-close-circle-outline</v-icon> Close
                    </v-btn>
                    <v-btn 
                        color="indigo darken-1 white--text" 
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

import pdf from 'vue-pdf'

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { ADD_LESSONS_MUTATION } from '@/graphql/mutations/lessons'

export default {
    name: 'LessonDialog',

    props: ['visible'],

    components: {
        pdf
    },

    data () {
        return {
            loading: false,
            valid: true,
            title: '',
            description: '',
            price: '',
            url_files: '',
            progress: 0,
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
        }
    },

    methods: {
        onSubmitLesson () {
            if (this.$refs.form.validate()) {
                this.loading = true

                const {
                    title,
                    description,
                    price,
                    url_files
                } = this.$data

                this
                 .$apollo
                 .mutate({
                     mutation: ADD_LESSONS_MUTATION,
                     variables: {
                         title,
                         description,
                         price,
                         url_files
                     }
                 })
                 .then(() => {
                     this.loading = false
                     this.show = !this.show
                     this.$refs.form.reset()
                     toastAlertStatus('success', 'Lesson Added successfully')
                 })
                 .catch(error => {
                     this.loading = false
                     toastAlertStatus('error', error)
                 })
            }
        },

        onChangeUploadFiles (file) {

            if (!file) return; // RETURN IF NULL
            
            this.loading = true

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
                            this.url_files = downloadUrl
                        })
                        .catch(error => toastAlertStatus('error', error))
            })
        }
    }
}
</script>

<style scoped>
.v-btn {
  text-transform: capitalize;
}
</style>