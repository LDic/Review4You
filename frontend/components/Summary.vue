<template>
  <div class="container-start">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Review4You</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>

     <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <button type="button" class="btn btn-outline-success" v-on:click="logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">

     <div class="row">
       <div class="col-12">
         <div class="page-header">
           <h1 id="theme">Default</h1><br><br>
           <p id="description" class="lead"><h2>Summary of your review</h2></p>


         </div>
       </div>
     </div>

   </div>

  </div>
</template>

<script>
export default{
  name: 'app',
  data() {
    return {
      summaryResult: [], //get summary result from backend
    }
  },

  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    
    gotoSearch(){
      // go to search Page
      this.$router.replace('search')
    },

    bringResults(){
      this.axios.post('http://localhost:3000/summary')
      .then( (res) => {
        this.axios.post('http://localhost:3000/summary/getresult')
        .then((resultRes) => {
          this.summaryResult = resultRes.data
        })
      })
    },

    gotoHome() {
      this.$router.replace('userboard')
    },

    ratio_sentiment: function(sent) {
      return (Math.floor(this.summaryResult.sentiment[sent]*100))
    },

    ratio_emotion: function(emo) {
      return (Math.floor(this.summaryResult.emotion[emo]*100))
    },

    ratio_intent: function(inte) {
      return (Math.floor(this.summaryResult.intent[inte]*100))
    },
  },
}
</script>

<style scoped>
@import '../assets/bootstrap.css';

</style>
