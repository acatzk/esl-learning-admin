<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">
                        <v-icon left size="35">mdi-pencil</v-icon>Edit Teacher
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
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field 
                                        label="Firstname"
                                        v-model="item.firstname"
                                        prepend-inner-icon="mdi-account-circle"
                                        :rules="[required('Firstname'), minLength('Firstname', 3), maxLength('Firstname', 20)]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field 
                                        label="Lastname" 
                                        v-model="item.lastname"
                                        prepend-inner-icon="mdi-account-circle"
                                        :rules="[required('Lastname'), minLength('Lastname', 3), maxLength('Lastname', 20)]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        label="Email" 
                                        v-model="item.email"
                                        prepend-inner-icon="mdi-email-outline"
                                        :rules="[required('Email'), emailRules('Email')]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        label="Contact" 
                                        v-model="item.phone"
                                        prepend-inner-icon="mdi-phone"
                                        :rules="[required('Contact'), minLength('Contact number', 11), maxLength('Contact number', 11)]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="genderList"
                                        label="Gender"
                                        v-model="item.gender"
                                        prepend-inner-icon="mdi-gender-male-female"
                                        :rules="[required('Gender')]"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="item.birth_date"
                                            label="Birthday date"
                                            prepend-inner-icon="event"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            :rules="[required('Birthday date')]"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            ref="picker"
                                            v-model="item.birth_date"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            @change="save"
                                        ></v-date-picker>
                                    </v-menu>
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
                        @click="saveUpdateInfo"
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

import { UPDATE_TEACHER_MUTATION } from '@/graphql/mutations/teachers'

export default {
    
    props: ['visible', 'item'],

    data () {
        return {
            genderList: ['Male', 'Female'],
            menu: false,
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

    methods: {
        save (date) {
          this.$refs.menu.save(date)
        },
        saveUpdateInfo () {
            if (this.$refs.form.validate()) {
                this.loading = true
                const {
                    id, firstname, lastname, email,
                    phone, gender, birth_date
                } = this.item

                this.$apollo
                    .mutate({
                        mutation: UPDATE_TEACHER_MUTATION,
                        variables: { id, firstname, lastname, email, phone, gender, birth_date }
                    })
                    .then(() => {
                        this.loading = false
                        this.show = !this.show
                        toastAlertStatus('success', 'Successfully Updated')
                    })
                    .catch(error => {
                        this.loading = false
                        this.show = !this.show
                        toastAlertStatus('error', error)
                    })
            }
        }
    }

}
</script>