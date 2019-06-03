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
          <button type="button" class="btn btn-danger" v-on:click="logout()">Logout</button>
          <button type="button" class="btn btn-success" v-on:click="bringResults()">Show results</button>
          <button type="button" class="btn btn-success" v-if="is_search() == 1" v-on:click="gotoSearch()">Search</button>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">

    <div class="row">
      <div class="col-12">
        <div class="page-header">
          <h2 id="theme">Default</h2><br><br>
          <p id="description" class="lead">
            <h2 style="color:black">Summary of your review</h2>
          </p>

          <h5 id="black-title">Total number of reviews
            <small class="text-success" v-if="summaryResult.length!=0" style="font-family: 'Bree Serif', serif;">
              {{ summaryResult.totalreviews }} reviews
            </small>
          </h5>

          <h5 id="black-title" style="margin-top:0px; margin-bottom:20px;">Average rating
            <small class="text-success" v-if="summaryResult.length!=0" style="font-family: 'Bree Serif', serif;">
              {{ ratings_clear() }}
            </small>
          </h5>

          <div v-if="is_clicked() == 1">
            <vue-loader direction="middle" image="https://loading.io/spinners/coolors/lg.palette-rotating-ring-loader.gif" text="Analyzing...." text-color="#786fa6" />
          </div>

          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" colspan="2">Emotion</th>
                <th scope="col" colspan="2">Intent</th>
                <th scope="col" colspan="2">Sentiment</th>
              </tr>
            </thead>
            <tbody v-if="summaryResult.length!=0">
              <tr class="table-active">
                <td>Happy</td>
                <td>{{ ratio_emotion('happy') }}%</td>
                <td>Compliment</td>
                <td>{{ ratio_intent('compliment') }}%</td>
                <td>Positive</td>
                <td>{{ ratio_sentiment('positive') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Angry</td>
                <td>{{ ratio_emotion('angry') }}%</td>
                <td>Suggestion</td>
                <td>{{ ratio_intent('suggestion') }}%</td>
                <td>Neutral</td>
                <td>{{ ratio_sentiment('neutral') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Sad</td>
                <td>{{ ratio_emotion('sad') }}%</td>
                <td>Question</td>
                <td>{{ ratio_intent('question') }}%</td>
                <td>Negative</td>
                <td>{{ ratio_sentiment('negative') }}%</td>
              </tr>
              <tr class="table-active">
                <td>Hate</td>
                <td>{{ ratio_emotion('hate') }}%</td>
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
                <td>Satisfied</td>
                <td>{{ ratio_emotion('satisfied') }}%</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

    <div class="row" style="margin-left: 1px;">
      <h4 id="black-title">Keyword cloud</h4>
    </div>
    <div class="row" style="margin-left: 1px;">
      <p class="lead" style="font-size:18px;">Check out the high frequency keywords to get an overview of your reviews.</p>
    </div>

    <div class="row">
      <div class="col" style="margin-bottom:20px;">
        <h5 id="table-title">Review Keyword</h5>
        <h6 class="lead" style="font-size:15px; color:black;">Based on your total reviews, here are the frequent keywords TOP 10</h6>
        <tbody>
          <tr style="font-weight: bold; color: #D64B43;">
            <th scope="row">1st</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[0] }}</td>
          </tr>
          <tr style="font-weight: bold; color: #D64B43;">
            <th scope="row">2nd</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[1] }}</td>
          </tr>
          <tr style="font-weight: bold; color: #D64B43;">
            <th scope="row">3rd</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[2] }}</td>
          </tr>
          <tr>
            <th scope="row">4th</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[3] }}</td>
          </tr>
          <tr>
            <th scope="row">5th</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[4] }}</td>
          </tr>
          <tr>
            <th scope="row">6th</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[5] }}</td>
          </tr>
          <tr>
            <th scope="row">7th</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[6] }}</td>
          </tr>
          <tr>
            <th scope="row">8th</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[7] }}</td>
          </tr>
          <tr>
            <th scope="row">9th</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[8] }}</td>
          </tr>
          <tr>
            <th scope="row">10th</th>
            <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.keywordCloud[9] }}</td>
          </tr>
        </tbody>
      </div>

      <div class="col-sm-8">
        <h5 id="table-title">Sentiment Keyword</h5>
        <h6 class="lead" style="font-size:15px; color:black;">Based on sentiment, here are the frequent keywords TOP 5 in each sentiment</h6>

        <div class="row">
          <div class="col-4 col-sm-4">
            <h6 id="black-title2">Positive</h6>
            <tbody>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">1st</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[0] }}</td>
              </tr>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">2nd</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[1] }}</td>
              </tr>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">3rd</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[2] }}</td>
              </tr>
              <tr>
                <th scope="row">4th</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[3] }}</td>
              </tr>
              <tr>
                <th scope="row">5th</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[4] }}</td>
              </tr>
            </tbody>
          </div>

          <div class="col-4 col-sm-4">
            <h6 id="black-title2">Neutral</h6>
            <tbody>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">1st</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[5] }}</td>
              </tr>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">2nd</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[6] }}</td>
              </tr>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">3rd</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[7] }}</td>
              </tr>
              <tr>
                <th scope="row">4th</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[8] }}</td>
              </tr>
              <tr>
                <th scope="row">5th</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[9] }}</td>
              </tr>
            </tbody>
          </div>

          <div class="col-4 col-sm-4">
            <h6 id="black-title2">Negative</h6>
            <tbody>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">1st</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[10] }}</td>
              </tr>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">2nd</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[11] }}</td>
              </tr>
              <tr style="font-weight: bold; color: #D64B43;">
                <th scope="row">3rd</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[12] }}</td>
              </tr>
              <tr>
                <th scope="row">4th</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[13] }}</td>
              </tr>
              <tr>
                <th scope="row">5th</th>
                <td v-if="summaryResult.length!=0" id="table-margin">{{ summaryResult.sentKeyCloud[14] }}</td>
              </tr>
            </tbody>
          </div>

        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'
import Vue from 'vue'
import vueLoader from '@nulldreams/vue-loading/src/vue-loading'
import loader from '@nulldreams/vue-loading/src/components/loader'
import loaderDots from '@nulldreams/vue-loading/src/components/dots'

export default {
  name: 'app',
  components: {
    vueLoader,
    loader,
    loaderDots,
  },
  data() {
    return {
      summaryResult: [], //get summary result from backend
      get_results: 0,
      show_clicked: 0,
      polling: null,
      show_search: 0,
    }
  },

  methods: {
    pollData() {
      this.polling = setInterval(() => {
        axios.post('/summary_status')
          .then((summary_status) => {
            this.get_results = summary_status.data;
            if (this.get_results == 1) {
              this.show_clicked = 0
              this.show_search = 1
            }
          })
      }, 3000)
    },
    logout() {
      if(confirm('Do you want to Logout?')){
        firebase.auth().signOut()
        .then(() => {
          this.$http.post('/auth/logout')
        }).then((res) => {
          //this.$router.replace('/')
          window.location.pathname = '/'
        })
      }
    },

    gotoSearch(){
      // go to search Page
      //this.$router.replace('/search')
      window.location.pathname = '/search'
    },

    bringResults(){
      this.show_clicked = 1
      this.show_search = 0
      this.axios.post('/summary')
      .then( (res) => {
        this.axios.post('/summary/getresult')
        .then((resultRes) => {
          this.summaryResult = resultRes.data
        })
      })
    },
    ratings_clear() {
      return (this.summaryResult.ratings.toFixed(2))
    },
    gotoHome() {
      //this.$router.replace('/userboard')
      window.location.pathname = '/userboard'
    },

    ratio_sentiment: function(sent) {
      return ((this.summaryResult.sentiment[sent] * 100).toFixed(1))
    },
    ratio_emotion: function(emo) {
      return ((this.summaryResult.emotion[emo] * 100).toFixed(1))
    },
    ratio_intent: function(inte) {
      return ((this.summaryResult.intent[inte] * 100).toFixed(1))
    },
    ratings_clear() {
      return (this.summaryResult.ratings.toFixed(2))
    },

    is_clicked() {
      return (this.show_clicked)
    },
    is_search() {
      return (this.show_search)
    }
  },

  beforeDestroy() {
    clearInterval(this.polling)
  },
  created() {
    this.pollData()
    axios.post('/summary_bisdone')
    .then((resultRes) => {
      if(resultRes != null) {this.summaryResult = resultRes.data; this.show_search = 1}
    })
  }
}
</script>

<style scoped>
@import 'bootstrap.css';

#a_home {
  color: white;
}

#black-title {
  color: black;
  font-family: 'Bree Serif', serif;
}

#black-title2 {
  color: #477BD5;
  font-family: 'Bree Serif', serif;
  text-align: center;
}

#loading {
  background-color: #63ab97;
  color: white;
  font-size: 32px;
  padding-top: 10vh;
  height: 100vh;
  text-align: center;
}

#table-title {
  font-family: 'Bree Serif', serif;
  color: #4CC090;
}

#table-margin{
  padding-left: 7px;
}

</style>