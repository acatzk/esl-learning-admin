<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->

    <main-bar>

      <v-container 
        fluid
        class="home-style"
      >
        <vue-page-transition name="fade-in-right" class="content">

          <router-view 
            class="elevation-1"
          ></router-view> <!-- ** DYNAMIC CONTENT ROUTE ** -->

        </vue-page-transition>

      </v-container>

      <foot-bar /> <!-- ** FOOTER BAR COMPONENT ** -->

    </main-bar> <!-- ** MAIN BAR COMPONENT ** -->

  </div>

</template>

<script>

export default {
  
  name: "Home",

  components: {

    NavBar: () => import('@/components/layouts/NavBar'),

    MainBar: () => import('@/components/layouts/MainBar'),

    FootBar: () => import('@/components/layouts/FootBar')

  }

};

</script>


<style scoped>
.home {
  margin-top: 5px;
}
</style>
