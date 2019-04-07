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

           <h5>Total number of reviews
             <small class="text-success">1980 reviews</small>
           </h5>

           <h5>Average rating
            <small class="text-success">3.46</small>
           </h5>

           <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" colspan="2">Emotion</th>
                <th scope="col" colspan="2">Intent</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-active">
                <td>Happy</td>
                <td>10%</td>
                <td>Compliment</td>
                <td>20%</td>
              </tr>
              <tr class="table-active">
                <td>Angry</td>
                <td>13%</td>
                <td>Suggestion</td>
                <td>20%</td>
              </tr>
              <tr class="table-active">
                <td>Interested</td>
                <td>12%</td>
                <td>Question</td>
                <td>20%</td>
              </tr>
              <tr class="table-active">
                <td>Sad</td>
                <td>20%</td>
                <td>Spam</td>
                <td>20%</td>
              </tr>
              <tr class="table-active">
                <td>Disappointed</td>
                <td>11%</td>
                <td>Complaint</td>
                <td>20%</td>
              </tr>
              <tr class="table-active">
                <td>Unsatisfied</td>
                <td>20%</td>
              </tr>
              <tr class="table-active">
                <td>Satisfied</td>
                <td>14%</td>
              </tr>
            </tbody>
          </table>

          <br><br>

          <div class="card border-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header">The most frequent keywords</div>
            <div class="card-body">
              <p class="card-text">
                <table class="table table-hover">
                  <tbody>
                    <tr class="table-dark">
                      <th scope="row">1st</th>
                      <td>Good design</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">2nd</th>
                      <td>small size</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">3rd</th>
                      <td>portable</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">4th</th>
                      <td>difficult instructions</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">5th</th>
                      <td>hard to open</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">6th</th>
                      <td>great</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">7th</th>
                      <td>expensive</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">8th</th>
                      <td>unique color</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">9th</th>
                      <td>not worth</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">10th</th>
                      <td>useless</td>
                    </tr>
                  </tbody>
                </table>
              </p>
            </div>
          </div>

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
