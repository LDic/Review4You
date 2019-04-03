import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import HelloWorld from '@/components/HelloWorld'
import UserBoard from '../components/UserBoard'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Summary from '../components/Summary'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/userboard',
      name: 'UserBoard',
      component: UserBoard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('userboard')
  else next()
})

export default router
