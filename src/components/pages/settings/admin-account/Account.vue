<template>
    <div class="account-setting">
        <v-container>
            <form v-for="(account, index) in accounts" :key="index">
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
                ></v-text-field>
                <v-btn class="mr-4" color="primary white--text text-capitalize">
                    <v-icon left>mdi-pencil</v-icon> Save
                </v-btn>
            </form>
        </v-container>
    </div>
</template>


<script>

import { fb } from '@/firebase'

import { ACCOUNT_QUERY } from '@/graphql/queries/accounts'

import { ACCOUNT_SUBSCRIPTION } from '@/graphql/subscriptions/accounts'

export default {
    name: 'Account',

    data () {
        return {
            accounts: [],
            required(propertyType) { 
                return v => v && v.length > 0 || `${propertyType} is required.`
            },
            emailRules(propertyType) {
                return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
            },
            show: false,
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