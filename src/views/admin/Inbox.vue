<template>
  <div class="inbox">

    <v-toolbar :dark="mode ? false : true" flat>

      <v-toolbar-title class="d-flex">
          <v-icon left>markunread</v-icon> Inbox
      </v-toolbar-title>

    </v-toolbar>

    <v-divider></v-divider>

    <v-card 
      class="mx-auto" 
      flat 
      :dark="mode ? false : true"
    >

      <router-view></router-view> <!-- Dynamic route data -->
      
    </v-card>

  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'Inbox',

  computed: {
    ...mapState(['mode'])
  }

}
</script>