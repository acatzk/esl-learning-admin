<template>
    <div class="account-setting">

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
                    <v-container>
                        <v-toolbar-title class="text-center font-weight-medium grey--text">
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn 
                                        v-on="on"
                                        v-bind="attrs"
                                        href="https://firebase.google.com/docs/auth"
                                        target="_blank"
                                        icon
                                        :color="mode ? 'primary' : 'error'"
                                    >
                                        <v-icon>mdi-information</v-icon>
                                    </v-btn>
                                    </template>
                                <span dense>About Firebase</span>
                            </v-tooltip>
                            Firebase Account Authentication
                        </v-toolbar-title>

                        <div class="grey--text my-3">
                            Most apps need to know the identity of a user. Knowing a user's identity allows an app to securely save user data in the cloud and provide the same personalized experience across all of the user's devices.
                            <br />
                            <br />
                            Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.
                            <br />
                            <br />
                            Firebase Authentication integrates tightly with other Firebase services, and it leverages industry standards like OAuth 2.0 and OpenID Connect, so it can be easily integrated with your custom backend.
                        </div>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-btn 
                                    block 
                                    depressed
                                    :color="mode ? 'primary lighten-1' : 'error'"
                                    @click="dialog = !dialog, modalType = 'email'"
                                >
                                <v-icon left>mdi-email-outline</v-icon> Update Your Email
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-btn 
                                    block
                                    outlined
                                    depressed
                                    :color="mode ? 'primary lighten-1' : 'error'"
                                    @click="dialog = !dialog, modalType = 'password'"
                                >
                                <v-icon left>mdi-lock</v-icon> Update Your Password
                                </v-btn>
                            </v-col>

                            <!-- Account Dialog either Update Email or Password -->
                            <account-dialog 
                                :visible="dialog" @close="dialog = false"
                                :modalType="modalType" 
                                :accounts="accounts"
                            />

                        </v-row>
                    </v-container>
                </div>
            </form>
        </v-container>
    </div>
</template>


<script>

import { fb } from '@/firebase'

import { mapState } from 'vuex'

import { ACCOUNT_QUERY } from '@/graphql/queries/accounts'

import { ACCOUNT_SUBSCRIPTION } from '@/graphql/subscriptions/accounts'


export default {
    name: 'Account',

    components: {
        AccountDialog: () => import('./AccountDialog')
    },

    data () {
        return {
            accounts: [],
            show: false,
            dialog: false,
            modalType: ''
        }
    },

    computed: {
        ...mapState(['mode'])
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