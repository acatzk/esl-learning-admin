<template>
  <div class="inbox">
    <header>
      <v-toolbar-title>
        <v-icon right>markunread</v-icon> Inbox
      </v-toolbar-title>
    </header>
    <v-card 
      class="mx-auto" 
      flat 
    >

     <router-view></router-view> <!-- Dynamic route data -->
      
    </v-card>
  </div>
</template>

<script>



export default {
  name: 'Inbox'
}
</script>

<style scoped>
header {
  padding: 15px;
  border-bottom: 1px solid #eee;
}
</style>