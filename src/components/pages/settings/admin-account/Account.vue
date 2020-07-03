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
                ></v-text-field>
                <v-text-field
                    label="Password"
                    v-model="account.password"
                    filled
                    rounded
                ></v-text-field>
                <v-btn class="mr-4" color="primary white--text text-capitalize">
                    <v-icon left>mdi-pencil</v-icon> Update
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
            accounts: []
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