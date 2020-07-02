<template>
  <div class="settings">
    <header>
      <v-toolbar-title>
        <v-icon right>settings</v-icon> General Settings
      </v-toolbar-title>
    </header>
    <v-card 
      class="mx-auto" 
      flat 
    >

     <tab-settings />
      
    </v-card>
  </div>
</template>

<script>



export default {
    name: 'SEttings',

    components: {
        TabSettings: () => import('@/components/pages/settings/TabSettings')
    }
}
</script>

<style scoped>
header {
  padding: 15px;
  border-bottom: 1px solid #eee;
}
</style>