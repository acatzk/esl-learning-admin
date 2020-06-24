<template>
    <div class="students">
       <header class="d-flex justify-space-between">
            <v-toolbar-title>
                <v-icon right>mdi-account-box</v-icon> Students List
            </v-toolbar-title>
            <v-btn small depressed color="primary" @click.stop="dialog = true">
               <v-icon left>mdi-plus</v-icon> Add
            </v-btn>   

            <student-dialog 
                :visible="dialog" @close="dialog = false"
            />
        </header>

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

            <teachers-table 
                :items="students"
                :headers="headers"
                :search="search"
            />
        </v-card>
    </div>
</template>

<script>
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
                { text: 'Birthdate', value: 'birth_date' },
                { text: 'Age', value: 'age' },
                { text: 'Options', value: 'id', sortable: false },
            ]
        }
    },
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