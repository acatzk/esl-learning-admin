import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuePageTransition from 'vue-page-transition'

Vue.config.productionTip = false;

/**  VUETIFY ICONS **/
import 'material-design-icons-iconfont/dist/material-design-icons.css'

/** VUE-PAGE-TRANSITION **/
Vue.use(VuePageTransition)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
