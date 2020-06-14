<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
        show-expand
        @click:row="gotoMessage"
    >
        <!-- DISPLAY  FORMAT DATE -->
        <template #item.created_at="{ item }">
            <date-display
                :created_at="item.created_at.split('T')[0]"
             />
        </template>
        <!-- END FORMAT DATE -->

        <!-- DISPLAY ITEM CONTACT OF NON CLICKABLE -->
        <template #item.contact="{ item }">
            <td @click.stop class="non-clickable">
                {{ item.contact }}
            </td>
        </template>
        <!-- END DISPLAY ITEM CONTACT OF NON CLICKABLE -->

        <!-- STATUS OF UNREAD MESSAGES -->
        <template #item.status="{ item }">
            <td @click.stop class="non-clickable">
                <v-chip
                    :color="item.status === 'unread' ? 'red' : 'success'"
                    text-color="white"
                    small
                    label
                >
                    <v-icon left>mail_outline</v-icon>
                    {{ item.status }}
                </v-chip>
            </td>
        </template>
        <!-- END STATUS OF UNREAD MESSAGES -->

        <!-- ** EXPANDED MESSAGE AND ACTION BUTTONS ** -->
        <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <v-row>
                    <v-col cols="12" md="2">
                        <b>{{ item.name }}</b>
                    </v-col>
                    <v-col cols="12" md="10">
                        <p>{{ item.message }}</p>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-btn
                        class="ma-2 white--text"
                        color="error"
                        small
                        outlined
                        @click="removedMessage(item)"
                    >
                        <v-icon left>delete_outline</v-icon> Remove
                    </v-btn>

                    <v-btn
                        small
                        class="ma-2"
                        color="success"
                        outlined
                        @click="markAsReadMessage(item)"
                        :loading="markLoading"
                    >
                        <v-icon left>mail_outline</v-icon> Mark as Read
                    </v-btn>
                </v-row>
            </td>
        </template>
        <!-- ** END EXPANDED MESSAGE AND ACTION BUTTONS ** -->
    </v-data-table>
</template>

<script>

import gql from 'graphql-tag'
import Swal from 'sweetalert2'

export default {
    name: 'InboxTable',

    data: () => ({
        markLoading: false
    }),

    components: {
        DateDisplay: () => import('./DateDisplay')
    },

    props: {
        items: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            required: true
        },
        search: {
            type: String
        }
    },

    methods: {
        removedMessage(item) {
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
                            id: item.id
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
                    })
            } 
        },
        markAsReadMessage(item) {
            this.markLoading = true
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
                       id: item.id
                    }
                })
                .then(() => {
                    this.markLoading = false
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
                })
                .catch(error => console.error(error))
        },
        gotoMessage(item) {
            this.$router.push(`/inbox/${item.id}`)
        }
        
    }
}
</script>


<style lang="scss" scoped>
::v-deep tbody tr {
    cursor: pointer;
}
::v-deep tbody tr td.non-clickable{
    cursor: auto;
}
</style>