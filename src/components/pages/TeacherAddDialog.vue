<template>
    <v-dialog
        v-model="show"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar
            flat
            dark
            color="indigo lighten-1"
          >
            <v-btn
              icon
              dark
              @click="show = !show"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title>
              Add New Teacher <v-icon>mdi-account-circle</v-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                large
                :loading="loading"
                @click="saveTeacherInfo"
              >
               <v-icon left>mdi-account-plus</v-icon> Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          
          <v-container fluid style="height: 100vh; background: #F6F7FB;">
            <v-row>
              <v-col cols=12 lg="4" md="4" sm="12">
                <v-card class="text-center pa-3" outlined>

                    <add-avatar-editor 
                      ref="editor"
                    />

                </v-card>
              </v-col>
              <v-col cols="12" lg="8" md="8" sm="12">
                <v-card outlined>
                  <div class="text-muted text-center mt-3 font-weight-medium">
                    Teachers Information
                  </div>
                  <v-form 
                    :disabled="loading" 
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-row class="ma-3">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          prepend-inner-icon="mdi-account-circle"
                          outlined
                          label="Firstname"
                          v-model="firstname"
                          :rules="[required('Firstname'), minLength('Firstname', 3), maxLength('Firstname', 20)]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          prepend-inner-icon="mdi-account-circle"
                          outlined
                          label="Lastname"
                          v-model="lastname"
                          :rules="[required('Lastname'), minLength('Lastname', 3), maxLength('Lastname', 20)]"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          prepend-inner-icon="mdi-email"
                          outlined
                          label="Email"
                          autocomplete="off"
                          v-model="email"
                          :rules="[required('Email'), emailRules('Email')]"
                        >
                        </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            prepend-inner-icon="mdi-phone"
                            outlined
                            label="Contact"
                            autocomplete="off"
                            v-model="contact"
                            :rules="[required('Contact'), minLength('Contact number', 11), maxLength('Contact number', 11)]"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                            :items="genderList"
                            label="Gender"
                            outlined
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
                                outlined
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

                </v-card>
              </v-col>
            </v-row>
          </v-container>

        </v-card>
    </v-dialog>
</template>

<script>

import { ADD_TEACHER_MUTATION } from '@/graphql/mutations/teachers'
import Swal from 'sweetalert2'

export default {
    name: 'TeacherAddDialog',

    props: ['visible'],

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

    components: {
      AddAvatarEditor: () => import('./AddAvatarEditor')
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

        saveClickedFromEditor (img) {
            this.$refs.imageFromEditor.src = img.toDataURL();
            console.log(img)
        },

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

            this.$apollo
                .mutate({
                  mutation: ADD_TEACHER_MUTATION,
                  variables: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: contact,
                    gender: gender,
                    birth_date: date
                  }
                })
                .then(() => {
                   this.loading = false
                   this.show = !this.show
                   const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Successfully Added.'
                    })

                    this.$refs.form.reset()

                })
                .catch(error => console.log(error))
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