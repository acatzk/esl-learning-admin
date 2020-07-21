<template>
    <div class="lessons">
        <header class="d-flex justify-space-between align-center">
            <v-toolbar-title>
                <v-icon right>mdi-folder-multiple-outline</v-icon> Lessons
            </v-toolbar-title>
            <v-btn 
                small 
                depressed 
                text
                outlined
                @click.stop="dialog = true"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </header>
        
        <lesson-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`add`" 
            :item="item"
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

            <!-- ** SKELETON LOADING FOR DATA ** -->
            <v-skeleton-loader
                type="table-tbody"
                class="mx-auto"
                tile
                v-if="$apollo.loading"
            ></v-skeleton-loader> 

            <lessons-table 
                v-else
                :items="lessons"
                :headers="headers"
                :search="search"
            />

        </v-card>

    </div>
</template>

<script>

import { toastAlertStatus } from '@/utils'

import { LESSONS_QUERY } from '@/graphql/queries/lessons'

import { LESSONS_SUBSCRIPTION } from '@/graphql/subscriptions/lessons'

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
            lessons: [],
            item: [
                {
                    title: null,
                    description: null,
                    price: null,
                    url_files: null,
                    size: null,
                    type: null
                }
            ]
        }
    },

    computed: {
        headers() {
            return [
                { text: 'Title', value: 'title' },
                { text: 'Filename', value: 'filename' },
                { text: 'Size', value: 'size' },
                { text: 'Price', value: 'price' },
                { text: 'Options', value: 'id', sortable: false },
            ]
        }
    },


    apollo: {
        lessons: {
            query: LESSONS_QUERY,
            error (error) {
                toastAlertStatus('error', error)
            },
            subscribeToMore: {
                document: LESSONS_SUBSCRIPTION,
                updateQuery(previousResult, { subscriptionData }) {
                    if (previousResult) {
                        return {
                            lessons: [
                                ...subscriptionData.data.lessons
                            ]
                        }
                    }
                }
            },
            result ({ data }) {
                this.lessons = data.lessons
            }
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