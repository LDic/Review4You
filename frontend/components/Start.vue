<template>
  <div class="container-start">
    <div class="main-txt">
      <h2>Review4You</h2>
      <div>
        <div class="sub-txt">
          If you have review lists in csv file, we analyze your reviews<br>
          based on 4 aspects: Sentiment, Intent, Emotion, Keyword.<br>
          Please login, and enjoy our premier service.<br>
        </div>
        <p><button class="btn-login" v-on:click="login()">Get Started</button></p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {

      methods: {
        login() {
          this.$router.replace('/login')
        }
      }

    }
</script>
