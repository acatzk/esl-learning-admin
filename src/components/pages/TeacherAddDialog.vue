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
        }
    }
}
</script>