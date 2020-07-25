<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="400px">
            <v-card :dark="mode ? false : true">
                <v-card-title>
                    <span class="headline" v-if="modalType === 'email'">
                        <v-icon left size="35">mdi-email-outline</v-icon> Update Email
                    </span>
                     <span class="headline" v-else>
                        <v-icon left size="35">mdi-lock-outline</v-icon> Change Password
                    </span>
                </v-card-title>

                <alert 
                    v-if="error && modalType !== 'email'"
                    :text="`${error}`"
                    :textStyle="true"
                /> <!-- SHOW ALERT ERROR MESSAGE -->

                <v-card-text>
                    <v-container>
                        <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row v-for="(account, index) in accounts" :key="index">
                                <v-col cols="12" v-if="modalType === 'email'">
                                    <v-text-field 
                                        label="Email" 
                                        prepend-inner-icon="mdi-email-outline"
                                        v-model="account.email"
                                        :rules="[required('Email'), emailRules('Email')]"
                                        @keyup.enter="saveUpdatedAccount(account)"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" v-else>
                                    <v-text-field 
                                        label="Password" 
                                        prepend-inner-icon="mdi-lock-outline"
                                        v-model="account.password"
                                        :rules="[required('Password'), minLength('Password', 5), maxLength('Password', 20)]"
                                        @keyup.enter="saveUpdatedAccount(account)"
                                        :type="showPassword ? 'text' : 'password'"
                                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="showPassword = !showPassword"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        :color="mode ? 'indigo darken-1' : 'grey'" 
                        text  
                        @click="show = !show" small
                    >
                        <v-icon left>mdi-close-circle-outline</v-icon> Close
                    </v-btn>
                    <v-btn 
                        :color="mode ? 'indigo darken-1 white--text' : 'error'" 
                        depressed
                        small
                        :loading="loading"  
                        v-for="(account, index) in accounts" :key="index"
                        @click="saveUpdatedAccount(account)"
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

import { ACCOUNT_UPDATE_MUTATION } from '@/graphql/mutations/accounts'

export default {
    name: 'AccountDialog',

    props: ['visible', 'modalType', 'accounts'],

    components: {
        Alert: () => import('@/components/mixins/Alert')
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
            error: '',
            showPassword: true
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

        // Hide email info name
        showEmail (account) {
            return '****'+ "@" + account.email.split('@')[1]
        },

        saveUpdatedAccount (account) {
           if (this.$refs.form.validate()) {
                this.loading = true
                if (this.modalType === 'email') {
                    this.updateEmail(account) // UPDATE EMAIL IN FIREBASE
                }    
                if (this.modalType === 'password') {
                    this.updatePassword(account) // UPDATE PASSWORD IN FIREBASE
                }
           }
        },

        // UPDAT EMAIL IN FIREBASE AUTHENTICATION
        updateEmail(account) {
            let admin = fb.auth().currentUser
            admin
            .updateEmail(account.email)
            .then(() => {
                this.show = !this.show // OPEN CLOSE MODAL
                this.loading = false // SET LOADING INTO FALSE
                toastAlertStatus('success', `Successfully Updated Email in Firebase`)
                this.updateAccountInHasura(account) // UPDATE EMAIL IN HASURA
             })
             .catch(error => {
                this.loading = false // SET LOADING INTO FALSE
                toastAlertStatus('error', error)
             })
        },

        // UPDATE PASSWORD IN FIREBASE AUTHENTICATION
        updatePassword(account) {
            let admin = fb.auth().currentUser
            admin
            .updatePassword(account.password)
            .then(() => {
                this.show = !this.show // OPEN CLOSE MODAL
                this.loading = false // SET LOADING INTO FALSE
                toastAlertStatus('success', `Successfully Updated Password in Firebase`)
                this.updateAccountInHasura(account) // UPDATE PASSWORD IN HASURA
            })
            .catch(error => {
              this.loading = false // SET LOADING INTO FALSE
              this.error = error
              toastAlertStatus('error', error)
            })
        },

        // UPDATE EMAIL AND PASSWORD IN HASURA GRAPHQL ACCOUNTS
        updateAccountInHasura(account) {
            this
             .$apollo
             .mutate({
                 mutation: ACCOUNT_UPDATE_MUTATION,
                 variables: {
                    id: account.id,
                    email: account.email,
                    password: account.password
                 }
             })
             .then(() => {
                 toastAlertStatus('success', 'Successfully Updated in Hasura')
             })
             .catch(error => toastAlertStatus('error', error))
        }
    }

}
</script>