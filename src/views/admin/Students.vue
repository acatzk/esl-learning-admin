<template>
    <div class="students">
       <header class="d-flex justify-space-between">
            <v-toolbar-title>
                <v-icon right>mdi-account-box</v-icon> Student List
            </v-toolbar-title>
            <v-btn small depressed color="primary" @click.stop="dialog = true">
               <v-icon left>mdi-plus</v-icon> Add
            </v-btn>   
        </header>

        <!-- STUDENT-DIALOG ADD AND EDIT -->
        <student-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`add`"
            :item="item"
        />

        <v-card flat>
            <!-- ** SEARCH TEXT FIELD ** -->
            <v-text-field
                label="Search"
                filled
                class="mx-3"
                append-icon="search"
                dense
                rounded
                v-model="search"
                style="position: relative; top: 10px; border-radius: 50px;"
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
        }
    },

    apollo: {
        students: {
            query: STUDENT_QUERY,
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

<style scoped lang="scss">
.students {
    header {
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>