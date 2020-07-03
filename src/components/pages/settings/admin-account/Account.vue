<template>
    <div class="account-setting">

        <alert 
            v-show="error" 
            :text="error" 
            :textStyle="true"  
        />

        <v-container>
            <form>
                <v-skeleton-loader
                    type="card"
                    class="mx-auto"
                    tile
                    v-if="$apollo.loading"
                ></v-skeleton-loader> 
                <div 
                    v-else 
                    v-for="(account, index) in accounts" :key="index"
                > 
                    <v-toolbar-title class="text-center ma-3 font-weight-medium grey--text">
                        Firebase Account Authentication
                    </v-toolbar-title>
                    <v-text-field
                        label="E-mail"
                        filled
                        v-model="account.email"
                        rounded
                        :rules="[required('Email'), emailRules('Email')]"
                        prepend-inner-icon="mdi-email-outline"
                        @keyup.enter="updateAccount(account)"
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        v-model="account.password"
                        filled
                        rounded
                        prepend-inner-icon="mdi-lock-outline"
                        :type="show ? 'text' : 'password'"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="show = !show"
                        :rules="[required('Password')]"
                        @keyup.enter="updateAccount(account)"
                    ></v-text-field>
                    <v-btn 
                        :disabled="account.email === '' || account.password === ''"
                        class="mr-4" 
                        color="primary white--text text-capitalize" 
                        :loading="loading"
                        @click="updateAccount(account)"
                    >
                        <v-icon left>mdi-pencil</v-icon> Save
                    </v-btn>
                </div>
            </form>
        </v-container>
    </div>
</template>


<script>

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { ACCOUNT_QUERY } from '@/graphql/queries/accounts'

import { ACCOUNT_SUBSCRIPTION } from '@/graphql/subscriptions/accounts'

import { ACCOUNT_UPDATE_MUTATION } from '@/graphql/mutations/accounts'

export default {
    name: 'Account',

    components: {
        Alert: () => import('@/components/pages/Alert')
    },

    data () {
        return {
            accounts: [],
            loading: false,
            valid: true,
            required(propertyType) { 
                return v => v && v.length > 0 || `${propertyType} is required.`
            },
            emailRules(propertyType) {
                return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
            },
            show: false,
            error: ''
        }
    },

    methods: {
        updateAccount (account) {
           this.loading = true
           this.updateEmail(account)
        },

        updateEmail(account) {
            let admin = fb.auth().currentUser
            admin
            .updateEmail(account.email)
            .then(acc => {
                this.loading = false
                this.updatePassword(account)
                this.updateAccountInHasura(account)
                toastAlertStatus('success', `Successfully update email`)
             })
             .catch(error => {
                toastAlertStatus('error', error)
                this.error = error
                this.loading = false
             })
        },

        updatePassword(account) {
            let admin = fb.auth().currentUser
            admin
            .updatePassword(account.password)
            .then(acc => {
                this.loading = false
                this.updateAccountInHasura(account)
                toastAlertStatus('success', `Successfully update password`)
             })
             .catch(error => {
                toastAlertStatus('error', error)
                this.error = error
                this.loading = false
             })
        },

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
                 toastAlertStatus('success', `Successfully update hasura`)
             })
             .catch(error => toastAlertStatus('error', error))
        }
    },

    apollo: {
        accounts: {
            query: ACCOUNT_QUERY,
            variables () {
                return {
                    id: fb.auth().currentUser.uid
                }
            },
            subscribeToMore: {
                document: ACCOUNT_SUBSCRIPTION,
                variables () {
                    return {
                        id: fb.auth().currentUser.uid
                    }
                },
                updateQuery(previousResult, { subscriptionData }) {
                    return {
                        accounts: [
                            ...subscriptionData.data.accounts
                        ]
                    }
                }
            },
            result ({ data }) {
                this.accounts = data.accounts
            }
        }
    }

}
</script>

<style scoped>
.account-setting {
    border-top: 1px solid #eee;
}
</style>