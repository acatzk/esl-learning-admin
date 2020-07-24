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
                <v-icon left>{{ getDynamicFileIcon(item) }}</v-icon>
                <a 
                    :href="item.url_files" 
                    target="_blank" 
                    :class="!mode ? 'unread' : ''"
                    style="text-decoration: none; text-transform: lowercase;"
                >
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
                {{ getConvertedByteSize(item) }}
            </span>
        </template>


        <!-- ACTION BUTTONS -->
        <template #item.id="{ item }">  
            <lesson-action-button 
                :item="item"
                :items="items"
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

import { mapState } from 'vuex'

import { splitUrlFilename, convertByteSize, fileExtentionIcon } from '@/utils'

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

    computed: {
        ...mapState(['mode'])
    },

    methods: {
        getUrlFilename (item) {
            return splitUrlFilename(item)
        },
        getConvertedByteSize (item) {
            return convertByteSize(item)
        },
        getDynamicFileIcon (item) {
            return fileExtentionIcon(item)
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
.unread {
    background: #f09433; 
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); 
    background: -webkit-linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%); 
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888',GradientType=1 );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; 
    background-clip: text;
    -moz-text-fill-color: transparent;
}
</style>