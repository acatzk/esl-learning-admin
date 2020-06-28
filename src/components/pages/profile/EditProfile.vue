<template>
    <v-form 
        :disabled="!show" 
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row class="ma-3">
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Firstname" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-account-outline"
                    v-model="firstname"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Middlename" 
                    autocomplete="off" 
                    prepend-inner-icon="mdi-account-outline"
                    v-model="middlename"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Lastname" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-account-outline"
                    v-model="lastname"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Company" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-hospital-building"
                    v-model="company"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Location" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-map-marker-circle"
                    v-model="location"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Website" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-link"
                    v-model="website"
                ></v-text-field>
            </v-col>
                <v-col cols="12" sm="6">
                <v-text-field 
                    label="Twitter/username" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-twitter"
                    v-model="twitterUser"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea
                    clearable
                    clear-icon="mdi-close"
                    label="Bio"
                    autocomplete="off"
                    prepend-inner-icon="mdi-paper-cut-vertical"
                    v-model="bio"
                    rows="1"
                ></v-textarea>
            </v-col>
            <v-col cols="12">
                <v-btn  
                    @click="saveAdminProfile"
                    color="success"
                    class="float-right"
                    depressed
                    v-show="show"
                    :loading="loading"
                >
                <v-icon left>mdi-content-save</v-icon> Save
                </v-btn>
                <v-btn  
                    class="float-right mr-2"
                    text
                    v-show="show"
                    @click="show = !show"
                >
                <v-icon left>mdi-close-circle-outline</v-icon> Cancel
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { ADD_PROFILE_MUTATION } from '@/graphql/mutations/profile'

export default {
    name: 'EditProfile',

    props: ['visible'],

    data () {
        return {
            loading: false,
            valid: true,
            id: fb.auth().currentUser,
            firstname: null,
            middlename: null,
            lastname: null,
            company: null,
            location: null,
            website: null,
            twitterUser: null,
            bio: null
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
        saveAdminProfile () {
            this.loading = true

            const { 
                firstname, middlename, lastname, website,
                company, location, twitterUser, bio
            } = this.$data

            this.$apollo
                .mutate({
                    mutation: ADD_PROFILE_MUTATION,
                    variables: {
                        id: this.id.uid,
                        firstname, middlename, lastname,
                        company, location, twitterUser, 
                        website, bio
                    }
                })
                .then(() => {
                    this.loading = false
                    this.show = !this.show
                    toastAlertStatus('success', 'Successfully Updated Profile')
                })
                .catch(error => toastAlertStatus('error', error))
        }
    }
}
</script>