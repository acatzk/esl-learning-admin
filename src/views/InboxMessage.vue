<template>
    <div class="inbox-message">
        <div class="d-flex justify-space-between">
            <div class="mb-1">
                <v-btn 
                    to="/inbox" 
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
            <h4 style="position: relative; top: 5px; right: 10px;">Inbox message</h4>
        </div>
        <v-skeleton-loader
            type="table-thead, table-tbody"
            class="mx-auto"
            v-if="$apollo.loading"
        ></v-skeleton-loader> 
        <v-card 
            style="height: 72vh;"
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
                        <p class="pt-4 content-style mr-3" >
                            {{ inbox.message }}
                        </p>
                    </v-card>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>

import gql from 'graphql-tag'
import Swal from 'sweetalert2'

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
                    mutation: gql`
                        mutation InboxUpdateMutation($id: uuid!) {
                            update_inboxes(where: {id: {_eq: $id}}, _set: {status: "read"}) {
                                affected_rows
                                returning {
                                    id
                                }
                            }
                        }
                    `,
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
                    this.$router.push('/inbox')
                })
                .catch(error => console.error(error))
        },
        removedMessage(id) {
            if(confirm('Are you sure you want to delete message?')) {
                this.$apollo
                    .mutate({
                        mutation: gql`
                            mutation InboxDeleteMutation($id: uuid!) {
                                delete_inboxes(where: {id: {_eq: $id}}) {
                                    affected_rows
                                    returning {
                                        id
                                    }
                                }
                            }
                        `,
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
                        this.$router.push('/inbox')
                    })
                    .catch(error => console.error(error))
            } 
        },
    },

    apollo: {
        inboxes: {
            query: gql`
                query InboxesSingleQuery($id: uuid!) {
                    inboxes(order_by: {created_at: desc}, where: {id: {_eq: $id}}) {
                        id
                        name
                        email
                        status
                        contact
                        created_at
                        message
                    }
                }
            `,
            variables() {
                return {
                    id: this.id
                }
            },
            subscribeToMore: {
                document: gql`
                    subscription InboxesSingleSubscription($id: uuid!) {
                        inboxes(order_by: {created_at: desc}, where: {id: {_eq: $id}}) {
                            id
                            name
                            email
                            status
                            contact
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