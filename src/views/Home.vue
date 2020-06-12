<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->

    <v-content>

      <v-container fluid>

        <dashboard-page 
          v-if="$route.path === '/'"
        /> <!-- ** DASHBOARD PAGE COMPONENT ** -->

        <router-view 
          v-else
        ></router-view> <!-- ** DYNAMIC CONTENT ROUTE ** -->

      </v-container>

      <foot-bar /> <!-- ** FOOTER BAR COMPONENT ** -->

    </v-content>

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
