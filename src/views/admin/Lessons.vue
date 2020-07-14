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

            <lessons-table 
                :items="lessons"
                :headers="headers"
                :search="search"
            />

        </v-card>

    </div>
</template>

<script>
export default {
    name: 'Lessons',

    components: {
        LessonDialog: () => import('@/components/pages/lessons/LessonDialog'),
        LessonsTable: () => import('@/components/pages/lessons/LessonsTable')
    },

    data () {
        return {
            dialog: false,
            search: '',
            lessons: [
                {
                    id: '1',
                    title: 'PDF file name 1',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, qui at ipsa totam consequatur rem illum, odio adipisci eum laudantium omnis fugit quod, repellat quasi ullam ut molestiae exercitationem sed!',
                    price: 2322,
                    filename: 'asfjasd/123/123/:12312/filename',
                    created_at: '01/30/2020'
                },
                {
                    id: '2',
                    title: 'PDF file name 2',
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, qui at ipsa totam consequatur rem illum, odio adipisci eum laudantium omnis fugit quod, repellat quasi ullam ut molestiae exercitationem sed!',
                    price: 1223,
                    filename: 'asfsd/123/123/:12112/filename',
                    created_at: '02/10/2010'
                }
            ]
        }
    },

    computed: {
        headers() {
            return [
                { text: 'Title', value: 'title' },
                { text: 'PDF Filename', value: 'filename' },
                { text: 'Price', value: 'price' },
                { text: 'Options', value: 'id', sortable: false },
            ]
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