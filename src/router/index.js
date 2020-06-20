import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from '@/firebase'

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
      },
      {
        path: 'inbox',
        name: 'inbox',
        component: () => import('@/views/Inbox')
      },
      {
        path: 'inbox/:id',
        name: 'inbox-message',
        component: () => import('@/views/InboxMessage'),
        meta: { transition: 'fade-in-up' }
      },
      {
        path: 'teachers',
        name: 'teachers',
        component: () => import('@/views/Teachers')
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
  window.scrollTo(0, 0)
})

export default router;
