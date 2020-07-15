<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito:100,300,400,500,700,900");

.v-application {
  font-family: "Nunito", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, html {
  font-family: "Nunito", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nprogress .bar {
  background: rgb(198, 186, 255) !important;
}
</style>
