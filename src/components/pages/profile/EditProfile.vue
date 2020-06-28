<template>
    <v-form 
        :disabled="!show" 
        ref="form"
        v-model="valid"
        lazy-validation
    >
        <v-row class="ma-3">
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Firstname" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-account-outline"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Middlename" 
                    autocomplete="off" 
                    prepend-inner-icon="mdi-account-outline"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field 
                    label="Lastname" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-account-outline"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Company" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-hospital-building"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Location" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-map-marker-circle"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-text-field 
                    label="Website" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-link"
                ></v-text-field>
            </v-col>
                <v-col cols="12" sm="6">
                <v-text-field 
                    label="Twitter/username" 
                    autocomplete="off"
                    prepend-inner-icon="mdi-twitter"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-textarea
                    clearable
                    clear-icon="mdi-close"
                    label="Bio"
                    autocomplete="off"
                    prepend-inner-icon="mdi-paper-cut-vertical"
                    rows="1"
                ></v-textarea>
            </v-col>
            <v-col cols="12">
                <v-btn  
                    color="success"
                    class="float-right"
                    depressed
                    v-show="show"
                >
                <v-icon left>mdi-content-save</v-icon> Save
                </v-btn>
                <v-btn  
                    class="float-right mr-2"
                    text
                    v-show="show"
                    @click="show = !show"
                >
                <v-icon left>mdi-close-circle-outline</v-icon> Cancel
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
export default {
    name: 'EditProfile',

    props: ['visible'],

    data () {
        return {
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