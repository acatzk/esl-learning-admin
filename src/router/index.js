import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/Home'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/Profile')
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login")
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
