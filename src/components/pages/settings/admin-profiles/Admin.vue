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
                    v-model="search"
                    prepend-inner-icon="search"
                ></v-text-field>

                <v-tooltip bottom >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            class="mt-3" 
                            icon 
                            large 
                            v-on="on"
                            depressed
                            :color="mode ? 'primary' : 'error'"
                            v-bind="attrs"
                            @click.stop="dialog = true"
                        >
                            <v-icon center>mdi-information</v-icon>
                        </v-btn> 
                    </template>
                    <span>Read Auth</span>
                </v-tooltip>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            icon 
                            class="mt-3" 
                            large 
                            v-on="on"
                            depressed
                            v-bind="attrs"
                        >
                            <v-icon>mdi-reload</v-icon>
                        </v-btn>
                    </template>
                    <span>Reload</span>
                </v-tooltip>
            </div>

            <!-- ** SKELETON LOADING FOR DATA ** -->
            <v-skeleton-loader
                type="table-tbody"
                class="mx-auto"
                tile
                v-if="$apollo.loading"
            ></v-skeleton-loader> 

             <!-- ** TEACHERS VUETIFY TABLE ** -->
            <admins-table 
                v-else
                :items="accounts"
                :headers="headers"
                :search="search"
            />

        </v-card>
    </div>
</template>


<script>

import { fb } from '@/firebase'

import { mapState } from 'vuex'

import { toastAlertStatus } from '@/utils'

import { ALL_ACCOUNT_QUERY_EXCEPT_CURRENT_ADMIN } from '@/graphql/queries/accounts'

import { ALL_ACCOUNT_SUBSCRIPTION_EXCEPT_CURRENT_ADMIN } from '@/graphql/subscriptions/accounts'

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
                { text: 'Admin UID', value: 'uid' },
                { text: 'Options', value: 'id', sortable: false }
            ]
        },
        ...mapState(['mode'])
    },

    apollo: {
        accounts: {
            query: ALL_ACCOUNT_QUERY_EXCEPT_CURRENT_ADMIN,
            variables () {
                return {
                    id: fb.auth().currentUser.uid
                }
            },
            subscribeToMore: {
                document: ALL_ACCOUNT_SUBSCRIPTION_EXCEPT_CURRENT_ADMIN,
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