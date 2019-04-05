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

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<script>
    export default {

      methods: {
        login() {
          this.$router.replace('/login')
        }
      }

    }
</script>
