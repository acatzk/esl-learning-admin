<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
        show-expand
        @click:row="gotoMessage"
    >   
        <!-- DISPLAY NAME -->
        <template #item.name="{ item }">
            <span v-if="item.status === 'unread'" class="font-weight-bold">
                <v-icon left :class="!mode ? 'unread' : ''">mdi-account-box</v-icon>
                <span :class="!mode ? 'unread' : ''">{{ item.name }}</span>
            </span>
            <span v-else>
                <v-icon left>mdi-account-box</v-icon>
                {{ item.name }}
            </span>
        </template>

        <!-- DISPLAY EMAIL -->
        <template #item.email="{ item }">
            <span v-if="item.status === 'unread'" class="font-weight-bold">
                <v-icon left :class="!mode ? 'unread' : ''">mdi-email</v-icon>
                <span :class="!mode ? 'unread' : ''">{{ item.email }}</span>
            </span>
            <span v-else>
                <v-icon left>mdi-email</v-icon>
                {{ item.email }}
            </span>
        </template>

        <!-- DISPLAY  FORMAT DATE -->
        <template #item.created_at="{ item }">
            <span v-if="item.status === 'unread'" class="font-weight-bold">
                <v-icon left :class="!mode ? 'unread' : ''">mdi-calendar</v-icon>
                <date-format
                    :created_at="item.created_at.split('T')[0]"
                    :class="!mode ? 'unread' : ''"
                />
            </span>
            <span v-else>
                <v-icon left>mdi-calendar</v-icon>
                <date-format
                    :created_at="item.created_at.split('T')[0]"
                />
            </span>
        </template>
        <!-- END FORMAT DATE -->

        <!-- DISPLAY ITEM CONTACT OF NON CLICKABLE -->
        <template #item.contact="{ item }">
            <td 
                v-if="item.status === 'unread'" 
                class="font-weight-bold non-clickable"
                @click.stop
            >
                <v-icon left :class="!mode ? 'unread' : ''">mdi-phone</v-icon>
                <span :class="!mode ? 'unread' : ''">{{ item.contact }}</span>
            </td>
            <td 
                v-else 
                class="non-clickable"
            >
                <v-icon left>mdi-phone</v-icon>
                {{ item.contact }}
            </td>
        </template>
        <!-- END DISPLAY ITEM CONTACT OF NON CLICKABLE -->


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
                        color="pink"
                        small
                        text
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
                        text
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

import { mapState } from 'vuex'

// Toast Alert Status file
import { toastAlertStatus } from '@/utils'

import Swal from 'sweetalert2'

// GRAPHQL MUTATIONS
import { INBOX_DELETE_MUTATION, INBOX_UPDATE_MUTATION } from '@/graphql/mutations/inboxes'

export default {
    name: 'InboxTable',

    data: () => ({
        markLoading: false
    }),

    components: {
        DateFormat: () => import('@/components/mixins/DateFormat')
    },

    computed: {
        ...mapState(['mode'])
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
                            id: item.id
                        }
                    })
                    .then(() => {
                        toastAlertStatus('success', 'Successfully Deleted')
                    })
                    .catch(error => {
                        toastAlertStatus('error', error)
                    })
                }
            })
        },
        markAsReadMessage(item) {
            this.markLoading = true
            this.$apollo
                .mutate({
                    mutation: INBOX_UPDATE_MUTATION,
                    variables: {
                       id: item.id
                    }
                })
                .then(() => {
                    this.markLoading = false
                    toastAlertStatus('success', 'Marked as Read')
                })
                .catch(error => {
                    this.markLoading = false
                    toastAlertStatus('error', error)
                })
        },
        gotoMessage(item) {
            this.$router.push(`/admin/inbox/${item.id}`)
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
::v-deep .v-data-table-header{
  text-transform: uppercase;
}
.v-icon {
    font-size: 16px;
}

.unread {
    background: #f09433; 
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    background-clip: text;
    -moz-text-fill-color: transparent;
}

</style>