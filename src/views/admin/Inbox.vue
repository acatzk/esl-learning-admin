<template>
  <div class="inbox elevation-0">
    <header>
      <v-toolbar-title style="color: #a82c49;">
        <v-icon right color="error">markunread</v-icon> Inbox
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

<style scoped lang="scss">

header {
  padding: 15px;
  border: 1px solid #fdd8df;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #fff0f3;
}
.v-card {
  border-bottom: 1px solid #ffe2e9;
  border-right: 1px solid #ffe2e9;
  border-left: 1px solid #ffe2e9;
  box-shadow: none;
}

</style>