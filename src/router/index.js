import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import Home from '../views/Home.vue'
import Alerte from '../views/Alerte.vue'
import Traitements from '../views/Traitements.vue'
import Messages from '../views/Messages.vue'
import Auth from '../views/Auth.vue'
import LogoutCallback from '../views/oidc/LogoutCallback.vue'
import LoginCallback from '../views/oidc/LoginCallback.vue'
import Init from '../views/Init.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/traitements',
    name: 'Traitements',
    component: Traitements
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/alerte',
    name: 'Alerte',
    component: Alerte
  },
  {
    path: '/init',
    name: 'Init',
    component: Init,
    props: true
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/login',
    name: 'LoginCallback',
    component: LoginCallback
  },
  {
    path: '/logout',
    name: 'LogoutCallback',
    component: LogoutCallback
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (Store.getters['auth/isAuth']) next()
    else next({ name: 'Init', params: { to } })
  }
  else next()
})

export default router
