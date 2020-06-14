import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuePageTransition from 'vue-page-transition'
import apolloProvider from './apollo'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false;

/**  VUETIFY ICONS **/
import 'material-design-icons-iconfont/dist/material-design-icons.css'

/** SWEETALERT2 CSS **/
import 'sweetalert2/dist/sweetalert2.min.css';

/** VUE-PAGE-TRANSITION **/
Vue.use(VuePageTransition)
/** VUE SWEET ALERT 2 **/
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
