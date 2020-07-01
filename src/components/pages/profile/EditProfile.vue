<template>
    <v-form 
        :disabled="!show" 
        ref="form"
        v-model="valid"
        lazy-validation
    >   
        <!-- ** SKELETON LOADING FOR DATA ** -->
        <v-skeleton-loader
            type="table"
            class="mx-auto"
            tile
            v-if="$apollo.loading"
        ></v-skeleton-loader> 
        <v-row 
            v-else
            class="ma-3"  
            v-for="(admin, index) in hasura_admin" :key="index"
        >
            <v-col cols="12" sm="6" md="4">
               <v-text-field 
                    label="Firstname" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-account-outline"
                    v-model="admin.firstname"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Middlename" 
                    autocomplete="off" 
                    prepend-inner-icon="mdi-account-outline"
                    v-model="admin.middlename"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Lastname" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-account-outline"
                    v-model="admin.lastname"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Company" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-hospital-building"
                    v-model="admin.company"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Location" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-map-marker-circle"
                    v-model="admin.location"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Website" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-link"
                    v-model="admin.website"
                ></v-text-field>
            </v-col>
                <v-col cols="12" sm="6">
                <v-text-field 
                    label="Twitter/username" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-twitter"
                    v-model="admin.twitterUser"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea
                    clearable
                    clear-icon="mdi-close"
                    label="Bio"
                    autocomplete="off"
                    prepend-inner-icon="mdi-paper-cut-vertical"
                    v-model="admin.bio"
                    rows="1"
                ></v-textarea>
            </v-col>
            <v-col cols="12">
                <v-btn  
                    @click="saveAdminProfile(admin)"
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

import { UPDATE_PROFILE_MUTATION } from '@/graphql/mutations/profile'

import { PROFILE_QUERY } from '@/graphql/queries/profile'

import { PROFILE_SUBSCRIPTION } from '@/graphql/subscriptions/profile'

export default {
    name: 'EditProfile',

    props: ['visible'],

    data () {
        return {
            loading: false,
            valid: true,
            firebase_admin: fb.auth().currentUser,
            firstname: null,
            middlename: null,
            lastname: null,
            company: null,
            location: null,
            website: null,
            twitterUser: null,
            bio: null,
            hasura_admin: null
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
        saveAdminProfile(admin) {
            this.loading = true

            this.$apollo
                .mutate({
                    mutation: UPDATE_PROFILE_MUTATION,
                    variables: {
                        id: this.$route.params.id,
                        firstname: admin.firstname, 
                        middlename: admin.middlename, 
                        lastname: admin.lastname,
                        company: admin.company, 
                        location: admin.location, 
                        twitterUser: admin.twitterUser, 
                        website: admin.website, 
                        bio: admin.bio
                    }
                })
                .then(() => {
                    this.loading = false
                    this.show = !this.show
                    toastAlertStatus('success', 'Successfully Updated Profile')
                })
                .catch(error => toastAlertStatus('error', error))

        }
    },

    apollo: {
        administrators: {
            query: PROFILE_QUERY,
            variables () {
                return {
                    id: this.firebase_admin ? this.$route.params.id : this.firebase_admin.uid
                }
            },
            subscribeToMore: {
                document: PROFILE_SUBSCRIPTION,
                variables () {
                    return {
                        id: this.firebase_admin ? this.$route.params.id : this.firebase_admin.uid
                    }
                },
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            administrators: [
                                ...subscriptionData.data.administrators
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.hasura_admin = data.administrators
            }
        }
    },

}
</script>


<style scoped>
.v-btn {
    text-transform: capitalize;
}
</style>