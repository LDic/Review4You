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
           <p id="description" class="lead"><h2>Welcome to Review4You</h2></p>

           <div>
             We analyze your reviews
             based on 4 aspects: <a href="#">Sentiment, Intent, Emotion, Keyword.</a><br>
             Please login, and enjoy our premier service.<br>
           </div><br>

           <div class="bs-example">
             <button type="button" class="btn btn-primary" v-on:click="login()">Get Started</button>
           </div>
         </div>
       </div>
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

<style>
@import '../assets/bootstrap.css';
</style>
