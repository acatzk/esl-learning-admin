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
    name: "Dashboard",
    component: () => import('@/views/Dashboard'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/Profile')
      }
    ]
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
