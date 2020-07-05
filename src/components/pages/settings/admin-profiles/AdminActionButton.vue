<template>
    <div class="action-button">
        <v-btn-toggle>

            <v-tooltip top color="primary">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small
                        @click="copyUID"
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
                        @click.stop="copyUID"
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
                        @click="snackbar = true"
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


         <v-snackbar
            v-model="snackbar"
            :timeout="timeout"
            right
            top
        >
            <v-icon right>mdi-content-copy</v-icon> {{ text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="blue"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>


    </div>
</template>


<script>

export default {
    name: 'AdminActionButton',

    data () {
        return {
            dialog: false,
            snackbar: false,
            text: '',
            timeout: 2000,
        }
    },

    components: {
        AdminDialog: () => import('./AdminDialog')
    },

    props: ['item'],


    methods: {
        copyUID () {
            this.snackbar = true
            this.text = `Copied ${this.item.id}`
        }
    }

}
</script>