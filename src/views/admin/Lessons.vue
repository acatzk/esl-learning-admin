<template>
    <div class="lessons">
        <header class="d-flex justify-space-between">
            <v-toolbar-title>
                <v-icon right>mdi-folder-multiple-outline</v-icon> Lessons
            </v-toolbar-title>
            <v-btn small depressed color="primary">
                <v-icon left>mdi-plus</v-icon> New
            </v-btn>

            <!-- <teacher-add-dialog 
                :visible="dialog" @close="dialog = false"
            /> -->
        </header>
    </div>
</template>


<style scoped lang="scss">
.lessons {
    header {
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
}
</style>