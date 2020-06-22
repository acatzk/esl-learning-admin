<template>
    <v-btn-toggle>
        <v-tooltip top color="warning">
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    v-bind="attrs"
                    v-on="on"
                    small 
                    text
                    color="warning"
                    @click="dialog = !dialog"
                >
                    <v-icon>colorize</v-icon>
                </v-btn>

                <!-- Edit Dialog -->
                <teacher-edit-dialog 
                    :visible="dialog" 
                    @close="dialog=false"
                    :item="item"
                />

            </template>
            <span>Edit</span>
        </v-tooltip>

        <v-tooltip top color="error">
            <template v-slot:activator="{ on, attrs }">
                <v-btn 
                    v-bind="attrs"
                    v-on="on"
                    small
                    text
                    color="error"
                >
                    <v-icon>delete_outline</v-icon>
                </v-btn>
            </template>
            <span>Delete</span>
        </v-tooltip>
    </v-btn-toggle>
</template>


<script>
export default {
    name: 'TeachersActionButton',

    data () {
        return {
            dialog: false
        }
    },

    props: ['item'],

    components: {
        TeacherEditDialog: () => import('./TeacherEditDialog')
    },

}
</script>