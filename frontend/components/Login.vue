<template>
  <div class="login">
    <div class="top-bar">Review for You</div>
    <img src="../assets/logo.png" width="250px">
    <h2>Login</h2>
    <input
      type="text"
      v-model="email"
      placeholder="Email address"
      class="input"
      required>
    <br/>
    <input
      type="password"
      v-model="password"
      placeholder="Password"
      class="input"
      required>
    <br/><br/>
    <button v-on:click="login" class="button">Enter</button>
    <p><router-link to="/signup">
      New Here? Create a new account
    </router-link></p>
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

<style scoped>
.top-bar{
  background-color: #566DC8;
  color: white;
  text-align: left;
  font-size: 20px;
  
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 10px;
  margin-bottom: 30px;
}

.button{
  background-color: #1E90FF; /* Blue */
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 3px;
}

</style>
