import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VuePageTransition from "vue-page-transition";
import { fb } from '@/firebase.js'

Vue.config.productionTip = false;
Vue.use(VuePageTransition);

let app = ''

fb.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})
