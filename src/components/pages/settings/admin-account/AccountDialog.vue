<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="modalType === 'email'">
                        <v-icon left size="35">mdi-email-outline</v-icon> Update Email
                    </span>
                     <span class="headline" v-else>
                        <v-icon left size="35">mdi-lock-outline</v-icon> Update Password
                    </span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                         <v-form 
                            :disabled="loading" 
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row v-for="(account, index) in accounts" :key="index">
                                <v-col cols="12" v-if="modalType === 'email'">
                                    <v-text-field 
                                        label="Email" 
                                        prepend-inner-icon="mdi-email-outline"
                                        v-model="account.email"
                                        :rules="[required('Email'), emailRules('Email')]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" v-else>
                                    <v-text-field 
                                        label="Password" 
                                        prepend-inner-icon="mdi-lock-outline"
                                        v-model="account.password"
                                        @keyup.enter="saveAdmin(item)"
                                        :rules="[required('Password'), minLength('Password', 5), maxLength('Password', 20)]"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="indigo darken-1" text  @click="show = !show">
                        <v-icon left>mdi-close</v-icon> Close
                    </v-btn>
                    <v-btn 
                        color="indigo darken-1 white--text" 
                        depressed
                        :loading="loading"  
                    >
                      <v-icon left>mdi-content-save</v-icon>  Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>

// Toast Alert Status file
import { toastAlertStatus } from '@/assets/js/toastAlert'

import { fb } from '@/firebase'

export default {
    name: 'AccountDialog',

    props: ['visible', 'modalType', 'accounts'],

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
            }
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
    },


}
</script>