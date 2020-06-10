<template>
  <div class="home">
    <div class="wrapper">
            
           <nav-bar /> <!--** NAVIGATION BAR COMPONENT **-->

            <page-wrap>
                
                <side-bar />  <!--** SIDE NAVIGATION BAR COMPONENT **-->

                <main-content>

                   <router-view></router-view> <!-- ** DYNAMIC CONTENT ** -->

                </main-content> <!--** MAIN CONTENT COMPONENT **-->

                <aside-bar /> <!--** ASIDE  BAR COMPONENT **-->

                <foot-bar /> <!--** FOOTER BAR COMPONENT **-->
                
            </page-wrap>

      </div>  <!--** PAGE WRAP COMPONENT **-->
        
  </div>
</template>

<script>

export default {
  name: "Home",

  components: {
    NavBar: () => import('@/components/layouts/NavBar'),
    PageWrap: () => import('@/components/layouts/PageWrap'),
    SideBar: () => import('@/components/layouts/SideBar'),
    MainContent: () => import('@/components/layouts/MainContent'),
    AsideBar: () => import('@/components/layouts/AsideBar'),
    FootBar: () => import('@/components/layouts/FootBar')
  }
};
</script>
