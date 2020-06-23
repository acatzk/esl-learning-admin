import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from '@/firebase'

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/components/404')
  },
  {
    path: '/',
    name: 'welcome',
    component: () => import('@/views/Welcome')
  },
  {
    path: "/admin",
    name: "home",
    component: () => import('@/views/admin/Home'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/admin/Dashboard')
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/admin/Profile')
      },
      {
        path: 'inbox',
        name: 'inbox',
        component: () => import('@/views/admin/Inbox')
      },
      {
        path: 'inbox/:id',
        name: 'inbox-message',
        component: () => import('@/views/admin/InboxMessage'),
        meta: { transition: 'fade-in-up' }
      },
      {
        path: 'teachers',
        name: 'teachers',
        component: () => import('@/views/admin/Teachers')
      },
      {
        path: 'students',
        name: 'students',
        component: () => import('@/views/admin/Students')
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
    next('/')
  } else if (!requiresAuth && currentUser) {
    next('/admin/dashboard')
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
