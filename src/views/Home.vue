<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->

    <main-bar>

      <v-container 
        fluid
        class="home-style"
      >
        <vue-page-transition name="fade-in-right" class="content">

          <dashboard-page 
            class="elevation-5"
            v-if="$route.path === '/'"
          /> <!-- ** DASHBOARD PAGE COMPONENT ** -->

          <router-view 
            v-else
            class="elevation-5"
          ></router-view> <!-- ** DYNAMIC CONTENT ROUTE ** -->

        </vue-page-transition>

      </v-container>

      <foot-bar /> <!-- ** FOOTER BAR COMPONENT ** -->

    </main-bar>

  </div>

</template>

<script>

export default {
  
  name: "Home",

  components: {

    NavBar: () => import('@/components/layouts/NavBar'),

    MainBar: () => import('@/components/layouts/MainBar'),

    DashboardPage: () => import('@/components/pages/DashboardPage'),

    FootBar: () => import('@/components/layouts/FootBar')

  }

};

</script>


<style scoped>
.home-style {
  background-color: #F6F7FB;
}
</style>
