<template>

  <div class="container-start">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Review4You</a>
    </nav>

    <div class="container">

     <div class="row">
       <div class="col-12">
         <div class="page-header">
           <h1 id="theme">Default</h1><br><br>
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
           <p><router-link to="/signup">
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
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.replace('/userboard')
        }).catch((err) => {
          alert(err.message)
        })
      }
    }
  }
</script>

<style>
@import '../assets/bootstrap.css';
</style>
