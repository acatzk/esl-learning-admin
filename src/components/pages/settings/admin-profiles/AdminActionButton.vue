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

            <v-tooltip top color="primary">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn 
                        v-bind="attrs"
                        v-on="on"
                        small 
                        icon
                        @click="dialog = true"
                    >
                        <v-icon>mdi-eye-outline</v-icon>
                    </v-btn>
                </template>
                <span>View</span>
            </v-tooltip>

        </v-btn-toggle>

         <!-- ADMIN-DIALOG VIEW -->
        <admin-dialog 
            :visible="dialog" @close="dialog = false"
            :modalType="`about`" 
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