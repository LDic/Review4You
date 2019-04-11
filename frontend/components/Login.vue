<template>

  <div class="container-start">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" id="a_home" v-on:click="gotoStart()">Review4You</a>
    </nav>

    <div class="container">

     <div class="row">
       <div class="col-12">
         <div class="page-header">
           <h2 id="theme">Default</h2><br><br>
           <p id="description" class="lead"><h2>Login</h2></p>

           <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" aria-describedby="emailHelp" placeholder="Enter email" required>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Password" required>
          </div>

           <button type="button" class="btn btn-primary" v-on:click="login">Enter</button><br><br>
           <p><router-link to="/auth/signup">
             New Here? Create a new account
           </router-link></p>

         </div>
       </div>
     </div>

   </div>

  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.axios.post('/auth/login-firebase', {
          email: this.email
        })
        .then((res) => {
          //this.$router.replace('/userboard')
          window.location.pathname = '/userboard'
        })
      }).catch((err) => {
        alert(err.message)
      })
      },

      gotoStart() {
        //this.$router.replace('/')
        window.location.pathname = '/'
      }
    }
  }
</script>

<style>
@import 'bootstrap.css';

#a_home{
  color: white;
}

</style>
