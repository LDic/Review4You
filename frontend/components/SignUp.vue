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
           <p id="description" class="lead"><h2 id="black-title">Create a new account</h2></p>

           <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="user@example.com" required>
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter password" required>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input v-model="password_confirmation" type="password" class="form-control" id="exampleInputPassword2" placeholder="Confirm your password" required>
            <small id="emailHelp" class="form-text text-muted">Check your password again!</small>
          </div>

           <button type="button" class="btn btn-primary" v-on:click="signUp">Sign up</button>
           <button type="button" class="btn btn-success">
             <router-link to="/login" class="link-back" id="white-title">
             Back
            </router-link>
          </button>

         </div>
       </div>
     </div>

   </div>

  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'signup',
    data () {
      return {
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
    methods: {
      signUp () {

        if(this.password === this.password_confirmation && this.password.length >0){
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
            window.confirm("Congratulations!")
            this.$router.replace('/login')
          }).catch((err) => {
            alert(err.message)
          });
        } else{
          this.password = ""
          this.password_confirmation=""
          return alert("Password do not match")
        }
      },
      gotoStart() {
        this.$router.replace('/')
      },

    }
  }
</script>

<style>
@import 'bootstrap.css';
#a_home{
  color: white;
}

#white-title{
  color: white;
}

#black-title{
  color: black;
}
</style>
