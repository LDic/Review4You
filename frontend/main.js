// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(axios)

// initialize firebase
var config = {
    apiKey: "AIzaSyA5c7yIZcCzLYRZ7uZipIgnayWUNNKhrjg",
    authDomain: "vue-login-f3c62.firebaseapp.com",
    databaseURL: "https://vue-login-f3c62.firebaseio.com",
    projectId: "vue-login-f3c62",
    storageBucket: "vue-login-f3c62.appspot.com",
    messagingSenderId: "480067445894"
  };
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
