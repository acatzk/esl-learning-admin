<template>
    <div class="teachers">
        <header class="d-flex justify-space-between">
            <v-toolbar-title>
                <v-icon right>supervisor_account</v-icon> Teachers List
            </v-toolbar-title>
            <v-btn small depressed color="primary" @click.stop="dialog = true">
               <v-icon left>mdi-account-plus</v-icon> Add
            </v-btn>

            <teacher-add-dialog 
                :visible="dialog" @close="dialog = false"
            />
        </header>

        <v-card flat>
            <v-text-field
                label="Search"
                v-model="search"
                filled
                class="mx-3"
                append-icon="search"
                dense
                rounded
                style="position: relative; top: 10px; border-radius: 50px;"
            ></v-text-field>
            <teachers-table 
                :items="teachers"
                :headers="headers"
                :search="search"
            />
        </v-card>
        
    </div>
</template>

<script>

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
        TeachersTable: () => import('@/components/pages/TeachersTable'),
        TeacherAddDialog: () => import('@/components/pages/TeacherAddDialog')
    },  

    apollo: {
        teachers: {
            query: TEACHERS_QUERY,
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
    .v-btn-toggle {
        .v-btn {
            text-transform: capitalize;
        }
    }
}
</style>