<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="450px">
            <v-card>
                <v-card-title>
                    <v-icon left size="35">mdi-camera-outline</v-icon> Upload Avatar
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-layout>
                                <v-flex>
                                    <v-img
                                        v-if="image !== null"
                                        :src="previewImage(image)"
                                        :lazy-src="previewImage(image)"
                                        aspect-ratio="1"
                                        class="grey lighten-2"
                                        max-height="50vh"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                            >
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                    <v-img
                                        v-else
                                        v-for="(admin, index) in admins" :key="index"
                                        :src="previewImage(admin.profileUrl)"
                                        :lazy-src="previewImage(admin.profileUrl)"
                                        aspect-ratio="1"
                                        class="grey lighten-2"
                                        max-height="50vh"
                                    >
                                        <template v-slot:placeholder>
                                            <v-row
                                                class="fill-height ma-0"
                                                align="center"
                                                justify="center"
                                            >
                                            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex>
                                    <v-file-input
                                        :rules="rules"
                                        accept="image/png, image/jpeg, image/bmp"
                                        prepend-icon="mdi-camera-iris"
                                        @change="uploadImage"
                                        label="Avatar"
                                        placeholder="Pick an avatar"
                                        :loading="loading"
                                    ></v-file-input>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary white--text" 
                        depressed
                        :loading="loading"  
                        small
                        @click="onUpdateImage"
                    >
                      <v-icon left>mdi-content-save</v-icon> Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { UPDATE_PROFILE_IMAGE_MUTATION } from '@/graphql/mutations/profile'

export default {
    
    props: ['visible', 'admins'],

    data () {
        return {
            menu: false,
            loading: false,
            valid: true,
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            image: null
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
        uploadImage (file) {

            if (!file) return;

            this.loading = true
            let storageRef = fb.storage().ref('admin-profiles/' + file.name)
            let uploadTask = storageRef.put(file)
            uploadTask.on('state_changed', (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
                            this.image = downloadUrl
                            // toastAlertStatus('success', `Avatar uploaded.`)
                        })
                        .catch(error => toastAlertStatus('error', error))
            })
        },

        previewImage(image) {
            if (image === null) {
                return image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU'
            } else {
                 return image
            }            
        },

        onUpdateImage () {
            this.loading = true
            this
             .$apollo
             .mutate({
                 mutation: UPDATE_PROFILE_IMAGE_MUTATION,
                 variables: { 
                    id: fb.auth().currentUser ? this.$route.params.id : fb.auth().currentUser.uid, 
                    profileUrl: this.image
                }
             })
             .then(() => {
                 this.loading = false
                 this.show = !this.show
                 toastAlertStatus('success', `Profile image updated.`)
             })
             .catch(error => toastAlertStatus('error', error))
        }


    }

}
</script>