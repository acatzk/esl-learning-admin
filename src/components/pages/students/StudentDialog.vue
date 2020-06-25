<template>
    <v-row justify="center">
        <v-dialog v-model="show" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="modalType === 'add'">
                        <v-icon left size="35">mdi-plus</v-icon> Add Student
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
                                        prepend-inner-icon="mdi-account-circle"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field 
                                        label="Lastname" 
                                        prepend-inner-icon="mdi-account-circle"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        label="Email" 
                                        prepend-inner-icon="mdi-email-outline"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field 
                                        label="Contact"
                                        prepend-inner-icon="mdi-phone"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        :items="genderList"
                                        label="Gender"
                                        prepend-inner-icon="mdi-gender-male-female"
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

import { UPDATE_TEACHER_MUTATION } from '@/graphql/mutations/teachers'
import Swal from 'sweetalert2'

export default {
    
    props: ['visible', 'modalType'],

    data () {
        return {
            genderList: ['Male', 'Female'],
            menu: false,
            loading: false,
            date: null,
            valid: true,
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
    }

}
</script>