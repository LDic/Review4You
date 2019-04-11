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
          <button type="button" class="btn btn-outline-success" v-on:click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">

    <div class="row">
      <div class="col-12">
        <div class="page-header">
          <h2 id="theme">Default</h2><br><br>

          <div>
            <reactive-base app="entity" url="https://search-marketingai-r3lttgjomhivagmtod5fxknibm.ap-northeast-2.es.amazonaws.com">

              <div class="filters-container">
                <single-list componentId="UserInfo" dataField="userID" title="Choose your ID" class="filter" />
                <data-search componentId="SearchKeyword" dataField="keyword" title="Search Keyword" class="filter" :customQuery="this.customQuery" />
                <multi-list componentId="Sentiment" dataField="summary.sentiment" class="filter" title="Select Sentiment" selectAllLabel="All sentiments" />
                <multi-list componentId="Emotion" dataField="summary.emotion" class="filter" title="Select Emotion" selectAllLabel="All emotions" />
                <multi-list componentId="Intent" dataField="summary.intent" class="filter" title="Select Intent" selectAllLabel="All intents" />
              </div>

              <reactive-list componentId="SearchResult" dataField="productID" className="result-list-container" :pagination="true" :from="0" :size="5" :react="{ and: ['Sentiment', 'Emotion', 'Intent','SearchKeyword','UserInfo']}">
                <div slot="renderData" slot-scope="{ item }" class="border-review">
                  <div class="review-header">
                    <div class="product-title">{{item.productID}}</div>
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
                  <div class="review-url">{{item.url}}</div><br>
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
      user_name: ''
    }
  },
  created() {
    this.axios.post('/summary')
      .then((res) => {
        this.user_name = res.data
      })
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    gotoHome() {
      this.$router.replace('userboard')
    },
    customQuery: function() {
      return {
        query: {
          match: {
            userID: this.user_name,
          }
        }
      }
    },
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
