<template>
    <div class="lessons">
        <header class="d-flex justify-space-between align-center">
            <v-toolbar-title>
                <v-icon right>mdi-folder-multiple-outline</v-icon> Lessons
            </v-toolbar-title>
            <v-btn small depressed color="primary" @click.stop="dialog = true">
                <v-icon left>mdi-plus</v-icon> New
            </v-btn>
        </header>
        
        <lesson-dialog 
            :visible="dialog" @close="dialog = false"
        />

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

        </v-card>

    </div>
</template>

<script>
export default {
    name: 'Lessons',

    components: {
        LessonDialog: () => import('@/components/pages/lessons/LessonDialog')
    },

    data () {
        return {
            dialog: false,
            search: ''
        }
    }
}
</script>


<style scoped lang="scss">
.lessons {
    header {
        padding: 15px;
        border-bottom: 1px solid #eee;
    }
}
</style>