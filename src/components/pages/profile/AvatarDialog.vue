<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="600px">
            <v-card>
                <v-card-title>
                    <v-icon left size="35">mdi-camera-outline</v-icon> Upload Avatar
                </v-card-title>
                <v-card-text>
                    <v-container>
                         <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    Avatar
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="indigo darken-1 white--text" 
                        depressed
                        :loading="loading"  
                        small
                    >
                      <v-icon left>mdi-content-save</v-icon>  Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>
export default {
    
    props: ['visible', 'admins'],

    data () {
        return {
            menu: false,
            loading: false,
            valid: true
        }
    },

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