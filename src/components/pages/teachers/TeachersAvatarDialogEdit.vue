<template>
   <v-row justify="center">
        <v-dialog v-model="show" max-width="450px">
            <v-card :dark="mode ? false : true">
                <v-card-title>
                    <span class="headline">
                        <v-icon left size="35">mdi-camera-outline</v-icon> {{ capitalize(`${item.firstname}`) }} Avatar
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
                            <v-layout>
                                <v-flex>
                                    <v-img
                                        :src="image === null ? previewImage(item.profile_url) : previewImage(image)"
                                        :lazy-src="image === null ? previewImage(item.profile_url) : previewImage(image)"
                                        aspect-ratio="1"
                                        :class="mode ? 'grey lighten-2' : 'black'"
                                        max-height="50vh"
                                    >
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn 
                                                    v-show="item.profile_url !== null"
                                                    icon 
                                                    v-on="on"
                                                    v-bind="attrs"
                                                    color="white" 
                                                    class="float-right"
                                                    :loading="closeLoading"
                                                    @click="onDeleteProfileImage(item)"
                                                >
                                                    <v-icon>close</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Remove</span>
                                        </v-tooltip>
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
                    <v-btn :color="mode ? 'indigo darken-1 white' : ''" text  @click="show = !show" small>
                        <v-icon left>mdi-close-circle-outline</v-icon> Close
                    </v-btn>
                    <v-btn 
                        :color="mode ? 'indigo darken-1 white--text' : 'error'" 
                        small
                        depressed
                        :loading="loading"  
                        @click="onUpdateImage"
                    >
                      <v-icon left>mdi-content-save</v-icon>  Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>

import { fb } from '@/services'

import { mapState } from 'vuex'

import { toastAlertStatus } from '@/utils'

import { UPDATE_TEACHERS_PROFILE_IMAGE_MUTATION } from '@/graphql/mutations/teachers'

export default {

    name: 'TeachersAvatarDialogEdit',

    props: ['visible', 'item'],

    data () {
        return {
            loading: false,
            valid: true,
            image: null,
            closeLoading: false
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

       // UPLOAD TEACHERS IMAGE PROFILE
       uploadImage (file) {
           if (!file) return;

            this.loading = true
            let storageRef = fb.storage().ref('teacher-profiles/' + file.name)
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

       // PREVIEW PROFILE IMAGE UPLOADED
       previewImage(image) {
            if (image === null) {
                return image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxs9QORl3noSnnXUQaU_Vlt3pbxfSy718YOuSIY3d3O69t3FeF&usqp=CAU'
            } else {
                 return image
            }            
        },

        // CAPITALIZED TEXT
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },

        // UPDATE PROFILE URL IN HASURA GRAPHQL DATABASE
        onUpdateImage () {
            this.loading = true
            this
             .$apollo
             .mutate({
                 mutation: UPDATE_TEACHERS_PROFILE_IMAGE_MUTATION,
                 variables: { 
                    id: this.item ? this.item.id : this.item.id, 
                    profileUrl: this.image
                }
             })
             .then(() => {
                 this.loading = false
                 this.show = !this.show
                 toastAlertStatus('success', `Profile Image Updated.`)
             })
             .catch(error => toastAlertStatus('error', error))
        },

        // REMOVED ACTUAL PICTURE IN FIREBASE STORAGE
        onDeleteProfileImage (teacher) {
            this.closeLoading = true
            let image = fb.storage().refFromURL(teacher.profile_url)

            image
             .delete()
             .then(() => {
                this.onRemoveProfileURLInHasura (teacher) // PASSED THE HASURA REMOVE METHOD
                this.closeLoading = false
                this.image = null
             })
             .catch(error => toastAlertStatus('error', error))
        },

        // REMOVED PROFILEURL COLUMN IN HASURA
        onRemoveProfileURLInHasura (teacher) {
            this
             .$apollo
             .mutate({
                mutation: UPDATE_TEACHERS_PROFILE_IMAGE_MUTATION,
                variables: {
                    id: teacher.id,
                    profileUrl: null
                }
             })
             .catch(error => toastAlertStatus('error', error))
        }
    }

}
</script>


<style scoped>
.v-btn {
    text-transform: capitalize;
}
</style>