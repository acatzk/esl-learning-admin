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
          
          <v-container style="height: 100vh;">
            <v-row>
              <v-col cols=4>
                <v-list-item class="pa-3">
                 <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/81.jpg">
                  </v-list-item-avatar>
                </v-list-item>
              </v-col>
              <v-col cols="8">

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