<template>
    <div class="action-button">
        <v-btn-toggle>
            <v-tooltip top color="warning">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small 
                        icon
                        @click.stop="dialog = true"
                    >
                        <v-icon>mdi-pencil-box-outline</v-icon>
                    </v-btn>
                </template>
                <span>Edit</span>
            </v-tooltip>

            <v-tooltip top color="error">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small
                        icon
                    >
                        <v-icon>delete_outline</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
        </v-btn-toggle>


        <!-- STUDENT-DIALOG ADD AND EDIT -->
        <student-dialog 
            :visible="dialog" @close="dialog = false"
            modalType="edit" 
        />

    </div>
</template>


<script>
export default {
    name: 'StudentActionButton',

    components: {
        StudentDialog: () => import('@/components/pages/students/StudentDialog')
    },

    data () {
        return {
            dialog: false
        }
    },

    props: ['item'],


    methods: {
        
    }

}
</script>