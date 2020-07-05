<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="modalType === 'add'">
                        <v-icon left size="35">mdi-information</v-icon> About Authentication
                    </span>
                     <span class="headline" v-else>
                        <v-icon left size="35">mdi-pencil</v-icon> Edit Admin
                    </span>
                </v-card-title>

                 <alert 
                    v-show="error"
                    :text="`${error}`"
                    :textStyle="true"
                /> <!-- SHOW ALERT ERROR MESSAGE -->

                <v-card-text>
                    <v-container v-if="modalType === 'add'">
                        <v-card-text class="text-justify">
                            You don't have authorized to add new administrator due to the complex of authentication. Our team uses <b>Firebase Authentication</b> to authenticate user but during the process when we add new administrator while you are logged in the jsonwebtoken changes your stored information due to it's requested add new admin. To add new administrator please contact backend developer in you software. Please go to <b>Developers Info</b> tab.
                        </v-card-text>
                    </v-container>

                    <v-container v-else>
                         <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="Email" 
                                        prepend-inner-icon="mdi-email-outline"
                                        v-model="item.email"
                                        :rules="[required('Email'), emailRules('Email')]"
                                        @keyup.enter="saveAdmin(item)"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions v-show="modalType !== 'add'">
                    <v-spacer></v-spacer>
                    <v-btn color="indigo darken-1" text  @click="show = !show">
                        <v-icon left>mdi-close</v-icon> Close
                    </v-btn>
                    <v-btn 
                        color="indigo darken-1 white--text" 
                        depressed
                        :loading="loading"  
                    >
                      <v-icon left>mdi-content-save</v-icon>  Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>


import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { ADD_ACCOUNT_MUTATION } from '@/graphql/mutations/accounts'

export default {
    
    props: ['visible', 'modalType', 'item'],

    components: {
        Alert: () => import('@/components/pages/Alert')
    },

    data () {
        return {
            loading: false,
            valid: true,
            required(propertyType) { 
                return v => v && v.length > 0 || `${propertyType} is required.`
            },
            minLength(propertyType, minLength) {
                return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters.`
            },
            maxLength(propertyType, maxLength) {
                return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters.`
            },
            emailRules(propertyType) {
                return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
            },
            showPassword: true,
            error: ''
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
        
    }

}
</script>