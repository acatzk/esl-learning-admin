<template>
  <div class="inbox">

    <v-toolbar :dark="mode ? true : false" flat>

      <v-toolbar-title class="d-flex">
          <v-icon left>markunread</v-icon> Inbox
      </v-toolbar-title>

    </v-toolbar>

    <v-divider></v-divider>

    <v-card 
      class="mx-auto" 
      flat 
      :dark="mode ? true : false"
    >

      <router-view></router-view> <!-- Dynamic route data -->
      
    </v-card>

  </div>
</template>

<script>
export default {
  name: 'Inbox',

  data () {
    return {
      mode: false
    }
  }
}
</script>