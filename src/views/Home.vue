<template>
  <div class="home">
    <div class="wrapper">
            
           <nav-bar /> <!--** NAVIGATION BAR COMPONENT **-->

            <div class="page-wrap">
                
                <side-bar />  <!--** SIDE NAVIGATION BAR COMPONENT **-->

                <main-content>

                   <router-view></router-view> <!-- ** DYNAMIC CONTENT ** -->
                   
                </main-content> <!--** MAIN CONTENT COMPONENT **-->

                <aside-bar /> <!--** ASIDE  BAR COMPONENT **-->

                <foot-bar /> <!--** FOOTER BAR COMPONENT **-->
                
            </div>
      </div>
        
  </div>
</template>

<script>

export default {
  name: "Home",

  components: {
    NavBar: () => import('@/components/NavBar'),
    SideBar: () => import('@/components/SideBar'),
    MainContent: () => import('@/components/MainContent'),
    AsideBar: () => import('@/components/AsideBar'),
    FootBar: () => import('@/components/FootBar')
  }
};
</script>
