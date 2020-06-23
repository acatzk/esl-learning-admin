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
    </div>
</template>

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