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
                            <v-icon>email</v-icon>
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
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>
                    <span>Delete Message</span>
                </v-tooltip>
            </div>
            <h4 style="position: relative; top: 15px; right: 10px;">Inbox message</h4>
        </div>
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
                                <v-avatar color="indigo">
                                    <v-icon dark>mdi-account-circle</v-icon>
                                </v-avatar>
                            </div>
                            <div class="d-flex justify-center mt-2">
                                <h2>{{ capitalize(inbx.name) }}</h2>
                            </div>
                        <div>
                                <div class="text-lowercase"><v-icon>email</v-icon>: {{ inbx.email }}</div>
                                <div><v-icon>phone</v-icon>: {{ inbx.contact }}</div>
                                <div><v-icon>date_range</v-icon>: <date-display :created_at="inbx.created_at.split('T')[0]"></date-display></div>
                                <div>
                                    <v-btn 
                                        :loading="emailLoading" 
                                        color="deep-purple darken-4" 
                                        width="100%" 
                                        outlined 
                                        text
                                        @click="markAsReadMessage(id)"
                                    >
                                        <v-icon left>email</v-icon> Mark as Read
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
                        <div class="caption">
                            Date on 
                            <date-display :created_at="inbox.created_at.split('T')[0]"></date-display> 
                            <timeago :datetime="inbox.created_at" :auto-update="60"></timeago>
                        </div>
                    </div>
                    <v-card v-show="!$apollo.loading" flat style="overflow-y: scroll; height: 63vh; text-align: justify;">
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

import Swal from 'sweetalert2'

// GRAPHQL MUTATIONS
import { INBOX_DELETE_MUTATION, INBOX_UPDATE_MUTATION } from '@/graphql/mutations/inboxes'
// INBOXES QUERY 
import { INBOX_SINGLE_QUERY } from '@/graphql/queries/inboxes'
// INBOXES SUBSCRIPTION
import { INBOX_SINGLE_SUBSCRIPTION } from '@/graphql/subscriptions/inboxes'

export default {
    name: 'InboxMessage',

    components: {
        DateDisplay: () => import('@/components/pages/DateDisplay')
    },

    data () {
        return {
            id: this.$route.params.id,
            emailLoading: false
        }
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
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Marked as Read'
                    })
                    this.$router.push('/admin/inbox')
                })
                .catch(error => {
                    this.emailLoading = false
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: error
                    })
                })
        },
        removedMessage(id) {
            if(confirm('Are you sure you want to delete message?')) {
                this.$apollo
                    .mutate({
                        mutation: INBOX_DELETE_MUTATION,
                        variables: {
                            id: id
                        }
                    })
                    .then(() => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            onOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Successfully Deleted.'
                        })
                        this.$router.push('/admin/inbox')
                    })
                    .catch(error => {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            onOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'error',
                            title: error
                        })
                    })
            } 
        },
    },

    apollo: {
        inboxes: {
            query: INBOX_SINGLE_QUERY,
            variables() {
                return {
                    id: this.id
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
                        id: this.id
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
</style>