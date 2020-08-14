<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->

    <main-bar>

      <v-container 
        fluid
        :class="mode ? 'light-style' : 'dark-style'"
      >
        <!-- <vue-page-transition name="fade-in-right" class="content"> -->

          <router-view 
            class="elevation-1"
          ></router-view> <!-- ** DYNAMIC CONTENT ROUTE ** -->

        <!-- </vue-page-transition> -->

      </v-container>

      <foot-bar /> <!-- ** FOOTER BAR COMPONENT ** -->

    </main-bar> <!-- ** MAIN BAR COMPONENT ** -->

  </div>

</template>

<script>

import { mapState } from 'vuex'

export default {
  
  name: "Home",

  components: {

    NavBar: () => import('@/components/layouts/NavBar'),

    MainBar: () => import('@/components/layouts/MainBar'),

    FootBar: () => import('@/components/layouts/FootBar')

  },

  computed: {
    ...mapState(['mode'])
  }

};

</script>


<style scoped>
.light-style {
  background-color: #F6F7FB;
}
.dark-style {
  background-color: rgb(53, 53, 53);
}
.content {
  margin-top: 5px;
}
</style>
