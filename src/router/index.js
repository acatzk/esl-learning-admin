import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from '@/firebase.js'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '*',
  //   name: '404',
  //   component: () => import('@/components/pages/404')
  // },
  {
    path: "/admin",
    name: "admin",
    component: () => import('@/views/Home'),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (!requiresAuth && currentUser) {
    next('/')
  } else {
    next()
  }
})


router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  NProgress.configure({ easing: 'ease', speed: 2000, showSpinner: false })
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router;
