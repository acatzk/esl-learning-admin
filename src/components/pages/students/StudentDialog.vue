<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="600px">
            <v-card :dark="mode ? false : true">
                <v-card-title>
                    <span class="headline" v-if="modalType === 'add'">
                        <v-icon left size="35">mdi-plus</v-icon> New Student
                    </span>
                     <span class="headline" v-else>
                        <v-icon left size="35">mdi-pencil</v-icon> Edit Student
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
                                        prepend-inner-icon="mdi-account-outline"
                                        v-model="item.firstname"
                                        :rules="[required('Firstname'), minLength('Firstname', 3), maxLength('Firstname', 20)]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field 
                                        label="Lastname" 
                                        prepend-inner-icon="mdi-account-outline"
                                        v-model="item.lastname"
                                        :rules="[required('Lastname'), minLength('Lastname', 3), maxLength('Lastname', 20)]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        label="Email" 
                                        prepend-inner-icon="mdi-email-outline"
                                        v-model="item.email"
                                        :rules="[required('Email'), emailRules('Email')]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        label="Contact"
                                        prepend-inner-icon="mdi-cellphone"
                                        v-model="item.contact"
                                        :rules="[required('Contact'), minLength('Contact number', 11), maxLength('Contact number', 11)]"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="genderList"
                                        label="Gender"
                                        prepend-inner-icon="mdi-gender-male-female"
                                        v-model="item.gender"
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
                    <v-btn 
                        text 
                        small
                        @click="$refs.form.reset()" 
                        color="grey" 
                        v-show="modalType === 'add'"
                    >
                        <v-icon left>mdi-reload</v-icon> Reset
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn :color="mode ? 'indigo darken-1 white' : ''" text  @click="show = !show" small>
                        <v-icon left>mdi-close-circle-outline</v-icon> Close
                    </v-btn>
                    <v-btn 
                        :color="mode ? 'indigo darken-1 white--text' : 'error'" 
                        small
                        depressed
                        :loading="loading"  
                        @click="saveStudent"
                    >
                      <v-icon left>mdi-content-save</v-icon>  Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-row>
</template>

<script>

import { mapState } from 'vuex'

import { toastAlertStatus } from '@/utils'

import { UPDATE_STUDENT_MUTATION,  ADD_STUDENT_MUTATION } from '@/graphql/mutations/students'

export default {
    
    props: ['visible', 'modalType', 'item'],

    data () {
        return {
            genderList: ['Male', 'Female'],
            menu: false,
            loading: false,
            date: null,
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
        },
        ...mapState(['mode'])
    },

    methods: {
        save (date) {
          this.$refs.menu.save(date)
        },
        saveStudent () {

            const { 
                id, 
                firstname, 
                lastname, 
                email, 
                contact, 
                gender, 
                birth_date 
            } = this.item

            // ADD STUDENT DATA
            if (this.modalType === 'add') {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    this.$apollo
                        .mutate({
                            mutation: ADD_STUDENT_MUTATION,
                            variables: { firstname, lastname, email, contact, gender, birth_date }
                        })
                        .then(() => {
                            this.loading = false
                            this.show = !this.show
                            toastAlertStatus('success', 'Successfully Added')
                            this.$refs.form.reset()
                        })
                        .catch(error => {
                            toastAlertStatus('error', error)
                        })
                }
            }

            // EDIT STUDENT DATA
            if (this.modalType === 'edit') {
                if (this.$refs.form.validate()) {
                    this.loading = true
                    this.$apollo
                        .mutate({
                            mutation: UPDATE_STUDENT_MUTATION,
                            variables: { id, firstname, lastname, email, contact, gender, birth_date }
                        })
                        .then(() => {
                            this.loading = false
                            this.show = !this.show
                            toastAlertStatus('success', 'Successfully Updated')
                        })
                        .catch(error => {
                            toastAlertStatus('error', error)
                        })
                }
            }
        }
    }

}
</script>

<style scoped>
.v-btn {
  text-transform: capitalize;
}
</style>