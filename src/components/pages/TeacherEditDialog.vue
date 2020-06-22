<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">
                    <v-icon right size="35">mdi-account-box</v-icon> Teacher Information
                </span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Firstname" v-model="item.firstname"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field label="Lastname" v-model="item.lastname"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Email">
                        
                        </v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="show = !show">Close</v-btn>
                <v-btn color="blue darken-1" text>Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>
export default {
    
    props: ['visible', 'item'],

    computed: {
        show: {
            get () {
                return this.visible
            },
            set (value) {
                if (!value) {
                    this.$emit('close')
                }
            }
        }
    }

}
</script>