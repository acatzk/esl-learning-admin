import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: "/admin",
    name: "Home",
    component: () => import('@/views/Home')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
