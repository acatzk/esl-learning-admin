<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->

    <v-main>

      <v-container 
        fluid
        class="home-style"
      >
        <vue-page-transition name="fade-in-right" class="content">

          <dashboard-page 
            v-if="$route.path === '/'"
          /> <!-- ** DASHBOARD PAGE COMPONENT ** -->

          <router-view 
            v-else
          ></router-view> <!-- ** DYNAMIC CONTENT ROUTE ** -->

        </vue-page-transition>

      </v-container>

      <foot-bar /> <!-- ** FOOTER BAR COMPONENT ** -->

    </v-main>

  </div>

</template>

<script>

export default {
  
  name: "Home",

  components: {

    NavBar: () => import('@/components/layouts/NavBar'),

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
