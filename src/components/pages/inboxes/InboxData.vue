<template>
    <div class="inbox-data">
        
        <!-- ** SEARCH TEXT FIELD ** -->
        <v-text-field
            placeholder="Search"
            v-model="search"
            filled
            class="mx-3"
            prepend-inner-icon="search"
            rounded
            style="position: relative; top: 17px; border-radius: 50px;"
        ></v-text-field>

        <!-- ** SKELETON LOADING FOR DATA ** -->
        <v-skeleton-loader
            type="table-tbody"
            class="mx-auto"
            tile
            v-if="$apollo.loading"
        ></v-skeleton-loader> 


        <!-- ** TEACHERS VUETIFY TABLE ** -->
        <inbox-table 
            v-else
            :items="inboxes"
            :headers="headers"
            :search="search"
        />
    </div>
</template>

<script>

// Toast Alert Status
import { toastAlertStatus } from '@/utils'
// INBOXES QUERY 
import { INBOX_QUERY } from '@/graphql/queries/inboxes'
// INBOXES SUBSCRIPTION
import { INBOXES_SUBSCRIPTION } from '@/graphql/subscriptions/inboxes'

export default {
    name: 'InboxData',

    components: {
        InboxTable: () => import('./InboxTable')
    },

    data: () => ({
        inboxes: [],
        search: '',
        error: null
    }),

    computed: {
        headers() {
            return [
                { text: 'Name',  value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Date', value: 'created_at' },
                { text: 'Contact', value: 'contact', sortable: false },
                // { text: 'Status', value: 'status', sortable: false }
            ]
        }
    },

    apollo: {
        inboxes: {
            query: INBOX_QUERY,
            error (error) {
                this.error = toastAlertStatus('error', error)
            },
            subscribeToMore: {
                document: INBOXES_SUBSCRIPTION,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            inboxes: [
                                ...subscriptionData.data.inboxes
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.inboxes = data.inboxes
            }
        }
    }
}
</script>