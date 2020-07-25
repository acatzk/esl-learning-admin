<template>
    <v-menu offset-y transition="slide-x-transition">
         
        <template v-slot:activator="{ on, attrs }">
            
            <v-btn 
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-badge
                    color="error"
                    overlap
                    :content="inboxCounter ? inboxCounter.aggregate.count : 0"
                    v-if="inboxCounter ? inboxCounter.aggregate.count !== 0 : 0"
                >
                    <v-icon>mdi-bell</v-icon>
                </v-badge>
                <v-icon v-else>mdi-bell</v-icon>
            </v-btn>
        </template>
        
        <v-list class="mt-2" :dark="mode ? false : true">
            <v-list 
                three-line 
                dense 
                style="width: 250px; max-height: 500px;"
            >
                <div 
                    v-if="$apollo.loading"
                    class="d-flex justify-center"
                >
                    <v-btn 
                        icon 
                        :loading="true"
                        color="indigo darken-1"
                    >
                    </v-btn>
                </div>
                <template
                    v-else
                >
                    <v-subheader>
                        Today {{ timeOfToday }}
                    </v-subheader>

                    <div v-for="(item, index) in notifications" :key="item.id">
                        <v-list-item dense v-if="!item.header" :to="`/admin/inbox/${item.id}`">
                            <v-list-item-avatar>
                                <v-icon :color="mode ? 'indigo darken-1' : ''">mdi-email-outline</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.name }} - 
                                    <date-format 
                                        class="grey--text text--lighten-1"
                                        :created_at="item.created_at" 
                                    />
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ item.message }}
                                </v-list-item-subtitle>
                                <v-divider :key="`d-${index}`"></v-divider>
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </template>
            </v-list>
        </v-list>
    </v-menu>

</template>

<script>

import { fb } from '@/services'

import gql from 'graphql-tag'

import moment from 'moment'

import { toastAlertStatus } from '@/utils'

export default {
    name: 'Notifications',

    props: ['mode'],

    data () {
        return {
            error: null,
            notifications: [],
            inboxCounter: 0
        }
    },

    computed: {
        timeOfToday () {
           return moment().format("MMM Do YYYY")
        }
    },

    components: {
        DateFormat: () => import('@/components/mixins/DateFormat')
    },

    apollo: {
        inboxes: {
            query: gql`
                query InboxesQuery {
                    inboxes(order_by: {created_at: desc}, where: {status: {_eq: "unread"}}) {
                        id
                        name
                        created_at
                        message
                    }
                }
            `,
            error (error) {
                this.error = toastAlertStatus('error', error)
            },
            subscribeToMore: {
                document: gql`
                    subscription InboxesSubscriptions {
                        inboxes(order_by: {created_at: desc}, where: {status: {_eq: "unread"}}) {
                            id
                            name
                            created_at
                            message
                        }
                    }
                `,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            inboxes: [
                                ...subscriptionData.data.inboxes,
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.notifications = data.inboxes
            }
        },

        $subscribe: {
            inboxCount: {
                query: gql`
                    subscription InboxCountQuery {
                        inboxCount: inboxes_aggregate(where: {status: {_eq: "unread"}}) {
                            aggregate {
                                count
                            }
                        }
                    }
                `,
                result ({ data }) {
                    this.inboxCounter = data.inboxCount
                }
            }
        }
    }
}
</script>