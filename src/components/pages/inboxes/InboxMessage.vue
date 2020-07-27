<template>
    <div class="inbox-message">
        <div class="d-flex justify-space-between">
            <div class="ma-2">
                <v-btn 
                    to="/admin/inbox/messages" 
                    icon 
                    class="mr-2"
                >
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            icon 
                            class="mr-2"
                            v-bind="attrs"
                            v-on="on"
                            :loading="emailLoading"
                            @click="markAsReadMessage(id)"
                        >
                            <v-icon>mdi-email-outline</v-icon>
                        </v-btn>
                    </template>
                    <span>Mark as Read</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            icon
                            class="mr-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="removedMessage(id)"
                        >
                            <v-icon>mdi-delete-variant</v-icon>
                        </v-btn>
                    </template>
                    <span>Delete Message</span>
                </v-tooltip>
            </div>
            <h4 style="position: relative; top: 15px; right: 10px;" class="font-weight-medium">Inbox message</h4>
        </div>
        <v-divider></v-divider>
        <v-skeleton-loader
            type="table-thead, table-tbody"
            class="mx-auto"
            tile
            v-if="$apollo.loading"
        ></v-skeleton-loader> 
        <v-card 
            v-else
            outlined 
            class="mx-auto"
        >
            <v-row class="pa-5">
                <v-col 
                    cols="12" 
                    sm="4" 
                    lg="4"
                    style="line-height: 40px;"
                    v-for="(inbx, indx) in inboxes" :key="indx"
                >
                    <div>
                        <div class="d-flex justify-center">
                                <v-avatar :color="mode ? 'indigo' : 'error'">
                                    <v-icon dark>mdi-account-circle</v-icon>
                                </v-avatar>
                            </div>
                            <div class="d-flex justify-center mt-2">
                                <h2>{{ capitalize(inbx.name) }}</h2>
                            </div>
                        <div>
                            <div class="text-lowercase d-flex"><v-icon class="mr-2">mdi-email-outline</v-icon> {{ inbx.email }}</div>
                            <div class="d-flex"><v-icon class="mr-2">mdi-cellphone</v-icon> {{ inbx.contact }}</div>
                            <div class="d-flex"><v-icon class="mr-2">mdi-calendar-blank</v-icon> <date-format :created_at="inbx.created_at.split('T')[0]"></date-format></div>
                            <div>
                                <v-btn 
                                    :loading="emailLoading" 
                                    :color="mode ? 'deep-purple darken-4' : 'error'" 
                                    width="100%" 
                                    outlined 
                                    text
                                    @click="markAsReadMessage(id)"
                                    :disabled="inbx.status === 'read'"
                                >
                                    <v-icon left>{{ inbx.status === 'unread' ? 'mdi-email' : 'mdi-email-open' }}</v-icon> {{ inbx.status === 'unread' ? 'Mark as Read' : 'Marked' }}
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col 
                    cols="12" 
                    sm="8" 
                    lg="8"
                    v-for="(inbox, index) in inboxes" :key="`k-${index}`"
                >
                    <div class="d-flex justify-space-between">
                        <div class="caption">
                            {{ capitalize(inbox.name) }}
                        </div>
                        <div class="caption mb-2">
                            Date on 
                            <date-format :created_at="inbox.created_at.split('T')[0]"></date-format> 
                            <timeago :datetime="inbox.created_at" :auto-update="60" class="font-weight-medium" :style="mode ? 'color: indigo;' : 'color: #bbb;'"></timeago>
                        </div>
                    </div>
                    <v-card v-show="!$apollo.loading" flat style="overflow-y: scroll; height: 53vh; text-align: justify;">
                        <p class="pt-4 content-style mr-3" style="line-height: 30px;">
                            {{ inbox.message }}
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>

import { mapState } from 'vuex'

import Swal from 'sweetalert2'

import { toastAlertStatus } from '@/utils'

// GRAPHQL MUTATIONS
import { INBOX_DELETE_MUTATION, INBOX_UPDATE_MUTATION } from '@/graphql/mutations/inboxes'
// INBOXES QUERY 
import { INBOX_SINGLE_QUERY } from '@/graphql/queries/inboxes'
// INBOXES SUBSCRIPTION
import { INBOX_SINGLE_SUBSCRIPTION } from '@/graphql/subscriptions/inboxes'

export default {
    name: 'InboxMessage',

    components: {
        DateFormat: () => import('@/components/mixins/DateFormat')
    },

    data () {
        return {
            id: this.$route.params.id,
            emailLoading: false
        }
    },

    computed: {
        ...mapState(['mode'])
    },

    methods: {
        capitalize(s) {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },

        markAsReadMessage(id) {
            this.emailLoading = true
            this.$apollo
                .mutate({
                    mutation: INBOX_UPDATE_MUTATION,
                    variables: {
                       id: id
                    }
                })
                .then(() => {
                    this.emailLoading = false
                    toastAlertStatus('success', 'Marked as Read')
                    this.$router.push('/admin/inbox/messages')
                })
                .catch(error => {
                    this.emailLoading = false
                    toastAlertStatus('error', error)
                })
        },
        removedMessage(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.$apollo
                    .mutate({
                        mutation: INBOX_DELETE_MUTATION,
                        variables: {
                            id: id
                        }
                    })
                    .then(() => {
                        toastAlertStatus('success', 'Successfully Deleted')
                        this.$router.push('/admin/inbox/messages')
                    })
                    .catch(error => {
                        toastAlertStatus('error', error)
                    })
                }
            })
        },
    },

    apollo: {
        inboxes: {
            query: INBOX_SINGLE_QUERY,
            error (error) {
                toastAlertStatus('error', error)
            },
            variables() {
                return {
                    id: this.id ? this.$route.params.id : this.id
                }
            },
            subscribeToMore: {
                document: INBOX_SINGLE_SUBSCRIPTION,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            inboxes: [
                                ...subscriptionData.data.inboxes
                            ]
                        }
                    }
                },
                variables() {
                    return {
                        id: this.id ? this.$route.params.id : this.id
                    }
                }
            },
        }
    }
}
</script>

<style scoped lang="scss">
.content-style {
    white-space: pre-wrap; 
    word-wrap: break-word;
    font-family: inherit;
}
.v-card {
    border: none !important;
    -webkit-border: none;
    -moz-border: none;
}
</style>