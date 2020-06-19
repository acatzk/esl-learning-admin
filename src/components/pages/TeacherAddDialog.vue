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
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>
              Add New Teacher <v-icon>mdi-account-circle</v-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="show = !show"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          
          <v-container fluid style="height: 100vh; background: #F6F7FB;">
            <v-row>
              <v-col cols=12 lg="4" md="4" sm="12">
                <v-card class="text-center pa-3" outlined>

                    <add-avatar-editor 
                      ref="editor"
                      @select-file="onSelectFile($event, this.eventFile)"
                    />

                </v-card>
              </v-col>
              <v-col cols="12" lg="8" md="8" sm="12">
                <v-card style="height: 70vh;" outlined>

                  <v-form>
                    <v-row class="ma-3">
                      <v-col cols="12" sm="6">
                        <v-text-field
                          prepend-inner-icon="mdi-account-circle"
                          outlined
                          placeholder="Firstname"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          prepend-inner-icon="mdi-account-circle"
                          outlined
                          placeholder="Lastname"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          prepend-inner-icon="mdi-email"
                          outlined
                          placeholder="Email"
                          autocomplete="off"
                        >
                        </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            prepend-inner-icon="mdi-phone"
                            outlined
                            placeholder="Contact"
                            autocomplete="off"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                            :items="genderList"
                            label="Gender"
                            outlined
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
                                outlined
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
export default {
    name: 'TeacherAddDialog',

    props: ['visible'],

    data: () => ({
      date: null,
      menu: false,
      genderList: ['Male', 'Female']
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
        },
        save (date) {
          this.$refs.menu.save(date)
        },
    }
}
</script>