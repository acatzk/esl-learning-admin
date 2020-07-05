<template>
    <div class="profile-setting">
        <!-- ADMIN-DIALOG ADD AND EDIT -->
        <admin-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`add`"
            :item="item"
        />

        <v-card>
            <div class="d-flex justify-content-center align-items-center mx-5 mt-5">
                <!-- ** SEARCH TEXT FIELD ** -->
                <v-text-field
                    placeholder="Search"
                    filled
                    rounded
                    flat
                    v-model="search"
                    prepend-inner-icon="search"
                    style="position: relative; margin-right: 5px; top: 6px;"
                ></v-text-field>

                <v-btn class="mt-4" color="primary" depressed @click.stop="dialog = true">
                    <v-icon center>mdi-plus</v-icon>
                </v-btn> 

                <v-btn icon class="ml-1 mt-3" large depressed>
                    <v-icon>mdi-reload</v-icon>
                </v-btn>
            </div>

             <!-- ** TEACHERS VUETIFY TABLE ** -->
            <admins-table 
                :items="accounts"
                :headers="headers"
                :search="search"
            />

        </v-card>
    </div>
</template>


<script>

import { fb } from '@/firebase'

import { toastAlertStatus } from '@/assets/js/toastAlert'

import { ALL_ACCOUNT_QUERY } from '@/graphql/queries/accounts'

import { ALL_ACCOUNT_SUBSCRIPTION } from '@/graphql/subscriptions/accounts'

export default {
    name: 'Admin',

    data () {
        return {
            search: '',
            accounts: [],
            dialog: false,
            item: [
                { email: null },
                { created_at: null }
            ]
        }
    },

    components: {
        AdminsTable: () => import('./AdminsTable'),
        AdminDialog: () => import('./AdminDialog')
    },

    computed: {
        headers() {
            return [
                { text: 'Identifier', value: 'email' },
                { text: 'Provider', value: 'provider', sortable: false },
                { text: 'Created', value: 'created_at' },
                { text: 'User UID', value: 'uid' },
                { text: 'Options', value: 'id', sortable: false }
            ]
        }
    },

    apollo: {
        accounts: {
            query: ALL_ACCOUNT_QUERY,
            subscribeToMore: {
                document: ALL_ACCOUNT_SUBSCRIPTION,
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

<style scoped lang="scss">
.profile-setting {
    border-top: 1px solid #eee;
    .v-card {
        box-shadow: none !important;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
    }
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>