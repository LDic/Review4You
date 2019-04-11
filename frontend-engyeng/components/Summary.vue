<template>
  <div class="container-start">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" id="a_home" v-on:click="gotoHome()">Review4You</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>

     <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <button type="button" class="btn btn-outline-success" v-on:click="logout()">Logout</button>
            <button type="button" class="btn btn-outline-warning" v-on:click="bringResults()">Show results</button>
            <button type="button" class="btn btn-outline-warning" v-on:click="gotoSearch()">Search</button>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">

     <div class="row">
       <div class="col-12">
         <div class="page-header" v-if="summaryResult.length!=0">
           <h2 id="theme">Default</h2><br><br>
           <p id="description" class="lead"><h2 id="black-title">Summary of your review</h2></p>

           <h5 id="black-title">Total number of reviews
             <small class="text-success">{{ summaryResult.totalreviews }} reviews</small>
           </h5>

           <h5 id="black-title">Average rating
            <small class="text-success">{{ summaryResult.ratings }}</small>
           </h5>

           <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" colspan="2">Sentiment</th>
                <th scope="col" colspan="2">Emotion</th>
                <th scope="col" colspan="2">Intent</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-active">
                <td>Positive</td>
                <td>{{ ratio_sentiment('positive') }}%</td>
                <td>Happy</td>
                <td>{{ ratio_emotion('happy') }}%</td>
                <td>Compliment</td>
                <td>{{ ratio_intent('compliment') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Neutral</td>
                <td>{{ ratio_sentiment('neutral') }}%</td>
                <td>Angry</td>
                <td>{{ ratio_emotion('angry') }}%</td>
                <td>Suggestion</td>
                <td>{{ ratio_intent('suggestion') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Negative</td>
                <td>{{ ratio_sentiment('negative') }}%</td>
                <td>Interested</td>
                <td>{{ ratio_emotion('interested') }}%</td>
                <td>Question</td>
                <td>{{ ratio_intent('question') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Sad</td>
                <td>{{ ratio_emotion('sad') }}%</td>
                <td>Spam</td>
                <td>{{ ratio_intent('spam') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Disappointed</td>
                <td>{{ ratio_emotion('disappointed') }}%</td>
                <td>Complaint</td>
                <td>{{ ratio_intent('complaint') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Unsatisfied</td>
                <td>{{ ratio_emotion('unsatisfied') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Satisfied</td>
                <td>{{ ratio_emotion('satisfied') }}%</td>
              </tr>
            </tbody>
          </table>

          <br><br>

          <div class="card border-secondary mb-3" style="max-width: 20rem;">
            <div class="card-header" id="black-title">The most frequent keywords</div>
            <div class="card-body">
              <p class="card-text">
                <table class="table table-hover">
                  <tbody>
                    <tr class="table-active">
                      <th scope="row">1st</th>
                      <td>{{ summaryResult.keywordCloud[0] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">2nd</th>
                      <td>{{ summaryResult.keywordCloud[1] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">3rd</th>
                      <td>{{ summaryResult.keywordCloud[2] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">4th</th>
                      <td>{{ summaryResult.keywordCloud[3] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">5th</th>
                      <td>{{ summaryResult.keywordCloud[4] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">6th</th>
                      <td>{{ summaryResult.keywordCloud[5] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">7th</th>
                      <td>{{ summaryResult.keywordCloud[6] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">8th</th>
                      <td>{{ summaryResult.keywordCloud[7] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">9th</th>
                      <td>{{ summaryResult.keywordCloud[8] }}</td>
                    </tr>
                    <tr class="table-dark">
                      <th scope="row">10th</th>
                      <td>{{ summaryResult.keywordCloud[9] }}</td>
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
import firebase from 'firebase'
export default{
  name: 'app',
  data() {
    return {
      summaryResult: [], //get summary result from backend
    }
  },
  methods: {
    logout() {
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
@import 'bootstrap.css';
#a_home{
  color: white;
}

#black-title{
  color: black;
}
</style>
