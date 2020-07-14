<template>
    <div class="teachers">
        <header class="d-flex justify-space-between align-center">
            <v-toolbar-title>
                <v-icon right>supervisor_account</v-icon> Teacher List
            </v-toolbar-title>
            <v-btn small depressed color="primary" @click.stop="dialog = true">
               <v-icon>mdi-plus</v-icon>
            </v-btn>

            <teacher-add-dialog 
                :visible="dialog" @close="dialog = false"
            />
        </header>

        <v-card flat>

            <!-- ** SEARCH TEXT FIELD ** -->
            <v-text-field
                placeholder="Search"
                v-model="search"
                filled
                class="mx-3"
                prepend-inner-icon="search"
                rounded
                style="position: relative; top: 17px; border-radius: 50px;"
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

// Toast Alert Status
import { toastAlertStatus } from '@/assets/js/toastAlert'
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
        }
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

<style scoped lang="scss">
.teachers {
    header {
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
}
</style>