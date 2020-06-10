import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import '@/assets/plugins/popper.js/dist/umd/popper.min.js'
import '@/assets/plugins/bootstrap/dist/js/bootstrap.min.js'
import '@/assets/plugins/perfect-scrollbar/dist/perfect-scrollbar.min.js'
import '@/assets/plugins/screenfull/dist/screenfull.js'
import '@/assets/plugins/datatables.net/js/jquery.dataTables.min.js'
import '@/assets/plugins/datatables.net-bs4/js/dataTables.bootstrap4.min.js'
import '@/assets/plugins/datatables.net-responsive/js/dataTables.responsive.min.js'
import '@/assets/plugins/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js'
import '@/assets/plugins/jvectormap/jquery-jvectormap.min.js'
import '@/assets/plugins/jvectormap/tests/assets/jquery-jvectormap-world-mill-en.js'
import '@/assets/plugins/moment/moment.js'
import '@/assets/plugins/tempusdominus-bootstrap-4/build/js/tempusdominus-bootstrap-4.min.js'
import '@/assets/plugins/d3/dist/d3.min.js'
import '@/assets/plugins/c3/c3.min.js'
import '@/assets/js/tables.js'
import '@/assets/js/widgets.js'
import '@/assets/js/charts.js'
import '@/assets/dist/js/theme.min.js'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
