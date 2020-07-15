<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito:100,300,400,500,700,900");
@import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap');

.v-application {
  font-family: "Poppins", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, html {
  font-family: "Poppins", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nprogress .bar {
  background: rgb(198, 186, 255) !important;
}
</style>
