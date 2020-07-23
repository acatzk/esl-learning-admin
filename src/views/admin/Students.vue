<template>
    <div class="students">

        <v-toolbar :dark="mode ? false : true" flat>

            <v-toolbar-title class="d-flex">
                <v-icon left>mdi-account-box</v-icon> Student List
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

        <!-- STUDENT-DIALOG ADD AND EDIT -->
        <student-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`add`"
            :item="item"
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

            <teachers-table 
                v-else
                :items="students"
                :headers="headers"
                :search="search"
            />
        </v-card>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import { toastAlertStatus } from '@/utils'
import { STUDENT_QUERY } from '@/graphql/queries/students'
import { STUDENT_SUBSCRIPTION } from '@/graphql/subscriptions/students'

export default {
    name: 'Students',

    components: {
        TeachersTable: () => import('@/components/pages/students/StudentsTable'),
        StudentDialog: () => import('@/components/pages/students/StudentDialog')
    },

    data() {
        return {
            students: [],
            search: '',
            dialog: false,
            item: [
                { firstname: null },
                { lastname: null },
                { email: null },
                { contact: null },
                { gender: null },
                { birth_date: null }
            ]
        }
    },

    computed: {
        headers() {
            return [
                { text: 'Identity', value: 'firstname' },
                { text: 'Email', value: 'email' },
                { text: 'Contact', value: 'contact', sortable: false },
                { text: 'Gender', value: 'gender', sortable: false },
                { text: 'Birthdate', value: 'birth_date' },
                { text: 'Age', value: 'age', sortable: false },
                { text: 'Options', value: 'id', sortable: false },
            ]
        },
        ...mapState(['mode'])
    },

    apollo: {
        students: {
            query: STUDENT_QUERY,
            error (error) {
                toastAlertStatus('error', error)
            },
            subscribeToMore: {
                document: STUDENT_SUBSCRIPTION,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            students: [
                                ...subscriptionData.data.students
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.students = data.students
            }
        }
    }

}
</script>