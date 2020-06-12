import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
