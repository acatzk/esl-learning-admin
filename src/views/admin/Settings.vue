<template>
  <div class="settings">

    <v-toolbar 
      :dark="mode ? false : true" 
      flat
    >
      <v-toolbar-title class="d-flex">
          <v-icon left>settings</v-icon> General Settings
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-card 
      class="mx-auto" 
      flat 
      :dark="mode ? false : true"
    >

     <tab-settings :mode="mode" />
      
    </v-card>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'SEttings',

    components: {
        TabSettings: () => import('@/components/pages/settings/TabSettings')
    },
    
    computed: {
      ...mapState(['mode'])
    }
}
</script>