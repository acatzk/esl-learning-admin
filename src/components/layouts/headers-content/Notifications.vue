<template>
    <v-menu offset-y transition="slide-x-transition">
         
        <template v-slot:activator="{ on, attrs }">
            <v-badge
                color="error"
                overlap
                :content="2"
                offset-x="20"
                offset-y="20"
            >
                <v-btn 
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-bell</v-icon>
                </v-btn>
            </v-badge>
        </template>
        
        <v-list class="mt-3">
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
                    <v-subheader>Today {{ timeOfToday }}</v-subheader>

                    <div v-for="(item, index) in notifications" :key="item.id">
                        <v-list-item dense v-if="!item.header" :to="`/admin/inbox/${item.id}`">
                            <v-list-item-avatar>
                                <v-icon color="indigo darken-1">mdi-email-outline</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.name }} - 
                                    <date-display 
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

import { fb } from '@/firebase'

import gql from 'graphql-tag'

import { toastAlertStatus } from '@/assets/js/toastAlert'

export default {
    name: 'Notifications',

    data () {
        return {
            error: null,
            notifications: []
        }
    },

    components: {
        DateDisplay: () => import('@/components/pages/DateDisplay')
    },

    computed: {
        timeOfToday () {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            today = mm + '/' + dd + '/' + yyyy;
            return today
        }
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
                                ...subscriptionData.data.inboxes
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.notifications = data.inboxes
            }
        }
    }
}
</script>