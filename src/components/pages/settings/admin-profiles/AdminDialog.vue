<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="modalType !== 'about'">
                        <v-icon left size="35">mdi-information</v-icon> About Authentication
                    </span>
                     <span class="headline" v-else>
                        <v-icon left size="35">mdi-eye</v-icon> View Admin
                    </span>
                </v-card-title>

                 <alert 
                    v-show="error"
                    :text="`${error}`"
                    :textStyle="true"
                /> <!-- SHOW ALERT ERROR MESSAGE -->

                <v-card-text>
                    <v-container v-if="modalType !== 'about'">
                        <v-card-text class="text-justify">
                            You don't have authorized to add new administrator due to the complex of authentication. Our team uses <b>Firebase Authentication</b> to authenticate user but during the process when we add new administrator while you are logged in the jsonwebtoken changes your stored information due to it's requested add new admin. To add new administrator please contact backend developer in you software. Please go to <b>Developers Info</b> tab.
                        </v-card-text>
                    </v-container>

                    <v-container v-else>
                         <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field 
                                        label="Admin UID" 
                                        prepend-inner-icon="mdi-lock-outline"
                                        v-model="item.id"
                                    >
                                    </v-text-field>
                                    <v-text-field 
                                        label="Email" 
                                        prepend-inner-icon="mdi-email-outline"
                                        v-model="item.email"
                                        :rules="[required('Email'), emailRules('Email')]"
                                        @keyup.enter="saveAdmin(item)"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>


export default {
    
    props: ['visible', 'modalType', 'item'],

    components: {
        Alert: () => import('@/components/mixins/Alert')
    },

    data () {
        return {
            loading: false,
            valid: true,
            required(propertyType) { 
                return v => v && v.length > 0 || `${propertyType} is required.`
            },
            minLength(propertyType, minLength) {
                return v => v && v.length >= minLength || `${propertyType} must be at least ${minLength} characters.`
            },
            maxLength(propertyType, maxLength) {
                return v => v && v.length <= maxLength || `${propertyType} must be less than ${maxLength} characters.`
            },
            emailRules(propertyType) {
                return v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || `${propertyType} address must be valid.`
            },
            showPassword: true,
            error: ''
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