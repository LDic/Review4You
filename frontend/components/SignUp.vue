<template>
  <div class="sign-up">
    <div class="top-bar">Review for You</div>
    <img src="../assets/logo.png" width="250px">
    <h3>Create a new account</h3>
    <input
      v-model="email"
      type="text"
      class="input"
      placeholder="Email"
      required>
    <br>
    <input
      v-model="password"
      type="password"
      class="input"
      placeholder="Password"
      required>
    <br><br>
    <button v-on:click="signUp" class="button-signUp">Sign Up</button>
    <button class="button-back">
      <router-link to="/login" class="link-back">
        Back
      </router-link>
    </button>
  </div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'signup',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.replace('/login')
        }).catch((err) => {
          alert(err.message)
        });
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

.button-signUp, .button-back{
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

.button-back{
  background-color: red;
}

.link-back{
  text-decoration: none;
  color: white;
}

</style>
