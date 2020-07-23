<template>
    <div class="teachers">

        <v-toolbar :dark="mode ? false : true" flat>

            <v-toolbar-title class="d-flex">
                <v-icon left>supervisor_account</v-icon> Teacher List
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn 
                small 
                depressed 
                text
                outlined
                @click.stop="dialog = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>

        </v-toolbar>

        <v-divider></v-divider>

        <teacher-add-dialog 
            :visible="dialog" @close="dialog = false"
        />
        

        <v-card flat :dark="mode ? false : true">

            <!-- ** SEARCH TEXT FIELD ** -->
            <v-text-field
                placeholder="Search"
                v-model="search"
                prepend-inner-icon="search"
                filled
            ></v-text-field>

            <!-- ** SKELETON LOADING FOR DATA ** -->
            <v-skeleton-loader
                type="table-tbody"
                class="mx-auto"
                tile
                v-if="$apollo.loading"
            ></v-skeleton-loader> 

            <!-- ** TEACHERS VUETIFY TABLE ** -->
            <teachers-table 
                v-else
                :items="teachers"
                :headers="headers"
                :search="search"
            />
        </v-card>
        
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { toastAlertStatus } from '@/utils'
import { TEACHERS_QUERY } from '@/graphql/queries/teachers'
import { TEACHERS_SUBSCRIPTION } from '@/graphql/subscriptions/teachers'

export default {
    name: 'App',

    data() {
        return {
            teachers: [],
            search: '',
            dialog: false
        }
    },

    computed: {
        headers() {
            return [
                { text: 'Identity', value: 'firstname' },
                { text: 'Email', value: 'email' },
                { text: 'Contact', value: 'phone', sortable: false },
                { text: 'Gender', value: 'gender', sortable: false },
                { text: 'Status', value: 'is_active', sortable: false },
                { text: 'Options', value: 'id', sortable: false },
            ]
        },
        ...mapState(['mode'])
    },

    components: {
        TeachersTable: () => import('@/components/pages/teachers/TeachersTable'),
        TeacherAddDialog: () => import('@/components/pages/teachers/TeacherAddDialog')
    },  

    apollo: {
        teachers: {
            query: TEACHERS_QUERY,
            error (error) {
                toastAlertStatus('error', error)
            },
            subscribeToMore: {
                document: TEACHERS_SUBSCRIPTION,
                updateQuery (previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            teachers: [
                                ...subscriptionData.data.teachers
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.teachers = data.teachers
            }
        }
    }
}
</script>