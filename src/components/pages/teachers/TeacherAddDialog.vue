<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card :dark="mode ? false : true">
            <v-card-title>
                <span class="headline">
                    <v-icon left size="35">mdi-plus</v-icon> New Teacher
                </span>
            </v-card-title>

            <!-- Error occured -->
            <alert 
                v-show="error"
                :text="`${error}`"
                :textStyle="false"
            />

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
                                    v-model="firstname"
                                    prepend-inner-icon="mdi-account-circle"
                                    :rules="[required('Firstname'), minLength('Firstname', 3), maxLength('Firstname', 20)]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field 
                                    label="Lastname" 
                                    v-model="lastname"
                                    prepend-inner-icon="mdi-account-circle"
                                    :rules="[required('Lastname'), minLength('Lastname', 3), maxLength('Lastname', 20)]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    label="Email" 
                                    v-model="email"
                                    prepend-inner-icon="mdi-email-outline"
                                    :rules="[required('Email'), emailRules('Email')]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field 
                                    label="Contact" 
                                    v-model="contact"
                                    prepend-inner-icon="mdi-phone"
                                    :rules="[required('Contact'), minLength('Contact number', 11), maxLength('Contact number', 11)]"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-select
                                    :items="genderList"
                                    label="Gender"
                                    v-model="gender"
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
                                        v-model="date"
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
                                        v-model="date"
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
                    @click="saveTeacherInfo"
                    :loading="loading"
                >
                  <v-icon left>mdi-content-save</v-icon>  Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapState } from 'vuex'

import { fb } from '@/services'

import { toastAlertStatus } from '@/utils'

import { ADD_TEACHER_MUTATION } from '@/graphql/mutations/teachers'

export default {
    name: 'TeacherAddDialog',

    props: ['visible'],

    components: {
        Alert: () => import('@/components/mixins/Alert')
    },

    data: () => ({
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      gender: '',
      date: null,
      menu: false,
      genderList: ['Male', 'Female'],
      loading: false,
      valid: true,
      error: '',
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
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
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

        saveTeacherInfo () {
          if (this.$refs.form.validate()) {
            this.loading = true

            const { 
              firstname, 
              lastname, 
              email, 
              contact, 
              gender, 
              date 
            } = this.$data

            fb
            .auth()
            .createUserWithEmailAndPassword(email, '12345678')
            .then(fbData => {
                toastAlertStatus('success', 'Successfully Added in Firebase Auth') 
                this.saveTeacherInHasura(firstname, lastname, email, contact, gender, date, fbData)
            })
            .catch(error => {
                this.loading = false  
                this.error = error
                toastAlertStatus('error', error) 
            })
            
          }
        },

        saveTeacherInHasura (firstname, lastname, email, contact, gender, date, fbData) {
            this.$apollo
            .mutate({
                mutation: ADD_TEACHER_MUTATION,
                variables: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: contact,
                    gender: gender,
                    birth_date: date,
                    firebase_id: fbData.uid
                }
            })
            .then(() => {
                this.loading = false
                this.show = !this.show
                toastAlertStatus('success', 'Successfully Added in Hasura') 
                this.$refs.form.reset()
            })
            .catch((error) => {
                this.loading = false    
                toastAlertStatus('error', error)
            })
        }
    }
}
</script>


<style scoped>
.v-btn {
  text-transform: capitalize;
}
</style>