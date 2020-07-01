<template>
    <div class="action-button">
        <v-btn-toggle>

            <v-tooltip top color="primary">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small
                        icon
                    >
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                </template>
                <span>Copy UID</span>
            </v-tooltip>

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

         <!-- ADMIN-DIALOG ADD AND EDIT -->
        <admin-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`edit`" 
            :item="item"
        />


    </div>
</template>


<script>

export default {
    name: 'AdminActionButton',

    data () {
        return {
            dialog: false
        }
    },

    components: {
        AdminDialog: () => import('./AdminDialog')
    },

    props: ['item'],


    methods: {
        
    }

}
</script>