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
          <button type="button" class="btn btn-danger" v-on:click="logout">Logout</button>
          <button type="button" class="btn btn-success" v-if="is_summarydone() == 1" v-on:click="gotoSummary()">Summary</button>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">

    <div class="row">
      <div class="col-12">
        <div class="page-header" v-if="user_name.length!=0">
          <h2 id="theme">Default</h2><br><br>

          <div>
            <reactive-base app="entity" url="https://search-marketingai-r3lttgjomhivagmtod5fxknibm.ap-northeast-2.es.amazonaws.com">

              <div class="filters-container">
                <data-search componentId="SearchKeyword" dataField="keyword" title="Search Keyword" class="filter" />
                <multi-list componentId="Sentiment" dataField="summary.sentiment" class="filter" title="Select Sentiment" selectAllLabel="All sentiments" :defaultQuery="this.defaultQuery" />
                <multi-list componentId="Emotion" dataField="summary.emotion" class="filter" title="Select Emotion" selectAllLabel="All emotions" :defaultQuery="this.defaultQuery" />
                <multi-list componentId="Intent" dataField="summary.intent" class="filter" title="Select Intent" selectAllLabel="All intents" :defaultQuery="this.defaultQuery" />
              </div>

              <reactive-list componentId="SearchResult" dataField="productID" className="result-list-container" :pagination="true" :from="0" :size="5" :react="{ and: ['Sentiment', 'Emotion', 'Intent','SearchKeyword']}" :defaultQuery="this.defaultQuery">
                <div slot="renderData" slot-scope="{ item }" class="border-review">
                  <div class="review-header">
                    <div class="product-title">{{item.title}}</div>
                  </div>
                  <div class="bar-summary">
                    <span class="sub-title">Sentiment:</span>
                    <span class="member">{{item.summary.sentiment}}</span>
                    <span class="sub-title">Emotion:</span>
                    <span class="member">{{item.summary.emotion}}</span>
                    <span class="sub-title">Intent:</span>
                    <span class="member">{{item.summary.intent}}</span>
                  </div>
                  <div class="review-content">{{item.content}}</div>
                  <div class="review-url"><a :href="item.url">Click here! product URL</a></div><br>
                </div>
              </reactive-list>
            </reactive-base>
          </div>

        </div>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import firebase from 'firebase'
//import "./style.css";

export default {
  name: 'app',
  data() {
    return {
      user_name: '',
      bissummarydone: 0
    }
  },

  created() {
    this.axios.post('/search')
      .then((res) => {
        this.user_name = res.data[0]
        if(res.data[1] != null) {this.bissummarydone = 1}
      })
  },

  methods: {
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

    gotoHome() {
      //this.$router.replace('/userboard')
      window.location.pathname = '/userboard'
    },

    defaultQuery: function(value, props) {
      //console.log('default query')
      return {
        query: {
          match: {
            userID: this.user_name
          }
        }
      }
    },

    gotoSummary(){
      window.location.pathname = '/summary'
    },
    is_summarydone() {
      return (this.bissummarydone)
    }

  },
}
</script>

<style scoped>
@import 'bootstrap.css';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#a_home {
  color: white;
}
.result-list-container {
  width: 70%;
  position: absolute;
  right: 0;
  padding: 10px 40px;
  overflow-y: scroll;
  height: 100vh;
  display: inline-flex;
  flex-direction: column;
  scroll-behavior: smooth;
  transition: all ease 0.2s;
}
.filters-container {
  width: 30%;
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  margin-top: 100px;
  top: 0;
  scroll-behavior: smooth;
  justify-content: center;
  transition: all ease 0.2s;
}
.filter {
  padding: 10px;
  background: #eee;
  margin: 10px auto;
  width: 90%;
  border-style: solid;
  border-color: #58C68F;
  border-radius: 5px;
  border-width: thick;
}
.product-title {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  padding-top: 10px;
  color: black;
}
.border-review {
  border-bottom-style: outset;
}
.sub-title {
  color: black;
}
.member {
  margin-right: 4px;
  color: green;
}
.review-url {
  color: #40A3D5;
}
.review-content {
  color: #95AAB4;
}
</style>