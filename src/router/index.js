import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('@/views/Home')
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
