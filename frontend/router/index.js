import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import UserBoard from '../components/UserBoard'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Summary from '../components/Summary'
import Start from '../components/Start'
import Search from '../components/Search'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/auth/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/auth/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/userboard',
      name: 'UserBoard',
      component: UserBoard
      //meta: {
      //  requiresAuth: true
      //}
    },
    {
      path: '/summary',
      name: 'Summary',
      component: Summary
      //meta: {
      //  requiresAuth: true
      //}
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
      //meta: {
      //  requiresAuth: true
      //}
    },
  ]
})

/*
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('userboard')
  else next()
})
*/

export default router
