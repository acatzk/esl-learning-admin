<template>
    <div class="students">
       <header class="d-flex justify-space-between">
            <v-toolbar-title>
                <v-icon right>mdi-account-box</v-icon> Students List
            </v-toolbar-title>
            <v-btn small depressed color="primary" @click.stop="dialog = true">
               <v-icon left>mdi-plus</v-icon> Add
            </v-btn>   
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
                style="position: relative; top: 10px; border-radius: 50px;"
            ></v-text-field>

            <teachers-table 
                
            />
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'Students',

    components: {
        TeachersTable: () => import('@/components/pages/students/StudentsTable')
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