<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->

    <v-content>

      <v-container fluid>

        <dashboard-page 
          v-if="$route.path === '/'"
        />

        <router-view 
          v-else
        ></router-view>

      </v-container>

    </v-content>

    <foot-bar /> <!-- ** FOOTER BAR COMPONENT ** -->

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
