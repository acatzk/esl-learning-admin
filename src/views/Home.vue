<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->



    <foot-bar /> <!-- ** FOOTER BAR COMPONENT ** -->

  </div>

</template>

<script>

export default {
  
  name: "Home",

  components: {

    NavBar: () => import('@/components/layouts/NavBar'),

    FootBar: () => import('@/components/layouts/FootBar')

  }

};

</script>
