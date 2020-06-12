<template>

  <div class="home">
    
    <nav-bar /> <!-- ** NAVIGATION BAR COMPONENT ** -->

  </div>

</template>

<script>

export default {
  
  name: "Home",

  components: {

    NavBar: () => import('@/components/layouts/NavBar')

  }

};

</script>
