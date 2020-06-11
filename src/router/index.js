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
    name: "admin",
    component: () => import('@/views/Home'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard')
      },
      {
        path: 'inbox',
        name: 'inbox',
        component: () => import('@/views/Inbox')
      },
      {
        path: 'lessons',
        name: 'lessons',
        component: () => import('@/views/Lessons')
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
