<template>
    <v-data-table
        :items="items"
        :headers="headers"
        :search="search"
        show-expand
    >
        <!-- TITLE DISPLAY -->
        <template #item.title="{ item }">
            <span class="d-flex align-center">
                <v-icon left>mdi-file-document</v-icon>
                {{ item.title }}
            </span>
        </template>

        <!-- FILENAME DISPLAY -->
        <template #item.filename="{ item }">
            <span class="d-flex align-center">
                <v-icon left>mdi-file-pdf-box</v-icon>
                <a :href="item.url_files" target="_blank" style="text-decoration: none; text-transform: lowercase;">
                    {{ getUrlFilename(item) }}
                </a>
            </span>
        </template>

        <!-- PRICE DISPLAY -->
        <template #item.price="{ item }">
            <span class="d-flex align-center">
                <v-icon left small>mdi-currency-php</v-icon>
                {{ item.price }}
            </span>
        </template>

        <!-- SIZE DISPLAY -->
        <template #item.size="{ item }">
            <span class="d-flex align-center">
                <v-icon left small>mdi-memory</v-icon>
                {{ item.size }}
            </span>
        </template>


        <!-- ACTION BUTTONS -->
        <template #item.id="{ item }">  
            <lesson-action-button 
                :item="item"
            />
        </template>

        <!-- ** EXPANDED MESSAGE AND ACTION BUTTONS ** -->
        <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <v-row>
                    <v-col cols="12" md="2">
                        <b>{{ item.title }}</b>
                    </v-col>
                    <v-col cols="12" md="10">
                        <embed
                            :src="item.url_files"
                            type="application/pdf"
                            class="pdf-embeded"
                        />
                    </v-col>
                </v-row>
            </td>
        </template>
        <!-- ** END EXPANDED MESSAGE AND ACTION BUTTONS ** -->
    </v-data-table>
</template>

<script>
export default {
    name: 'LessonsTable',

    props: {
        items: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            requried: true
        },
        search: {
            type: String,
            required: true
        }
    },

    components: {
        LessonActionButton: () => import('./LessonActionButton')
    },

    methods: {
        getUrlFilename (item) {
            let newItem = item.url_files.split('/lessons-files%2F').pop().split('#')[0].split('?')[0]
            return newItem.length >= 30 ? newItem.slice(0, 30) + "..." : newItem
        }
    }

}
</script>

<style lang="scss" scoped>
::v-deep .v-data-table-header{
  text-transform: uppercase;
}
.pdf-embeded {
    height: 50vh;
    width: 100%;
}
</style>