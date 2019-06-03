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
          <button type="button" class="btn btn-success" v-on:click="gotoSearch()">Search</button>
        </li>
      </ul>
    </div>

  </nav>

  <div class="container">

    <div class="row">
      <div class="col-12">
        <div class="page-header">
          <h2 id="theme">Default</h2>
          <p id="description" class="lead">
            <h2 id="black-title">Start analyzing</h2>
          </p>

          <div class="option">
            <span class="opt-title">Option 1</span>
            <span class="opt-content">Review data file in csv form</span>
          </div>

          <label for="exampleInputFile" style="font-weight: lighter">Choose your file (.csv)</label><br>
          <label class="bglabel-file"><span class="label-file"></span>
            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
          </label>

          <button type="button" class="btn btn-success" v-on:click="submitFile()">Submit</button>
          <button type="button" class="btn btn-primary" v-on:click="gotoSummary()">Start</button><br>
          <small id="fileHelp" class="form-text text-muted">If you have review data file, its form must be csv file. After choose file, upload and then check summary result.</small>

          <br>

          <div class="option">
            <span class="opt-title">Option 2</span>
            <span class="opt-content">Product URL</span>
          </div>

          <label for="exampleInputFile" style="font-weight: lighter">Amazon website URL started as 'https://www.amazon.com/'</label><br>
          <input type="text" class="form-control" placeholder="https://www.amazon.com/~" id="inputDefault" style="width: 50%" v-model="post_url">
          <button type="button" class="btn btn-success" id="url-btn" v-on:click="submitURL()" v-if="is_spinner() == 0">Submit</button>
          <b-button variant="primary" disabled style="margin-top:4px;" v-if="is_spinner() == 1">
             <b-spinner small></b-spinner>
             Loading...
          </b-button>


          <button type="button" class="btn btn-primary" v-on:click="gotoSummary2()" v-if="is_start() == 1">Start</button>
          <small id="fileHelp" class="form-text text-muted">You can simply do review analysis. Just copy and paste url in Amazon.</small>
          <small id="fileHelp" class="text-danger" style="color: black">Warning! Getting data from url may take time!</small>
          <small id="fileHelp" class="text-danger" style="color: black; padding-left: 10px;">Notice: Only url in Amazon.com is available</small><br>
          <br><br>
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

export default {
  name: 'app',
  data() {
    return {
      file: '',
      post_url: '',
      ready_start: 0,
      start_spinner: 0, //initial value must be '0',
      polling: null,
      is_progress_end: 0,
    }
  },
  methods: {
    pollData() {
      this.polling = setInterval( () => {
        axios.post('/upload_status')
        .then((upload_status) => {
          this.is_progress_end = upload_status.data;
          if(this.is_progress_end == '0'){
            this.ready_start = 0;
          }
          if(this.is_progress_end == '1'){
            this.start_spinner = 1;
            this.ready_start = 0;
          }
          if(this.is_progress_end == '2'){
            this.start_spinner = 0;
            this.ready_start = 1;
          }
        })
      }, 1500)
    },
    logout() {
      if(confirm('Do you want to Logout?')){
        firebase.auth().signOut()
        .then(() => {
          this.$http.post('/auth/logout')
        }).then((res) => {
          this.$router.replace('/')
        })
      }
    },
    submitFile() {
      if (document.getElementById("file").value == "") {
        /* if not file uploaded */
        alert("WARNING: Choose File to upload!");
      } else {
        let formData = new FormData();
        /* add the form data we need to submit */
        formData.append('file', this.file);
        /* make the request to the POST , single-file URL */
        axios.post('/fileupload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function() {
          console.log('File submitted');
          alert("File Submitted!");
        }).catch(function() {
          console.log('File submit Failed');
        });
      }
    },
    /* handles a change on the file upload */
    handleFileUpload() {
      /* set a local variable to the value of the uploaded file */
      this.file = this.$refs.file.files[0];
    },
    /* handles exception when file not uploaded */
    gotoSummary() {
      if (document.getElementById("file").value == "") {
        /* if not file uploaded */
        alert("WARNING: file not uploaded!");
      } else {
        /* go to SummaryPage */
        //this.$router.replace('/summary')
        axios.post('/before_summary', {
          bIsURLSummary: false
        }).then(res => {
          window.location.pathname = '/summary'
        })
      }
    },
    gotoSummary2() {
      // go to progress hompage, finally SummaryPage
      axios.post('/before_summary', {
        bIsURLSummary: true
      }).then(res => {
        window.location.pathname = '/summary'
      })
    },
    gotoHome() {
      //this.$router.replace('/userboard')
      window.location.pathname = '/userboard'
    },
    gotoSearch() {
      // go to search Page
      window.location.pathname = '/search'
    },
    submitURL() {
      /*
      axios.get(this.post_url)
      .then(res => {
        console.log(res)
        console.log(res.req.document.getElementsByClassName('a-size-medium totalReviewCount').value)
      })
      */
      if(this.post_url.includes('https://www.amazon.com/')){
        var strArray = this.post_url.split('/')
        var temp = "";
        var temp2= "";
  
        for(var i=0; i<strArray.length; i++){
          temp = strArray[i]
          if(temp.indexOf('?') == -1){
            // there's no '?' in this string
            if(temp.length == 10){
              // find product
              this.post_url = temp
              break
            }else{
              continue
            }
          }else{
            //there is '?' in this string
            var temp_arr = temp.split('?',1)
            if(temp_arr[0].length == 10){
              // find product
              this.post_url = temp_arr[0]
              break
            }
          }
        }

        axios.post('/upload_url', {
          body: this.post_url
        })
        .then(response => {
          this.start_spinner = 1
        })

        this.ready_start = 0
      }else{
        alert('Warning: this url is not Amazon url')
      }
    },

    is_start() {
      return (this.ready_start)
    },
    is_spinner() {
      return(this.start_spinner)
    },
  },

  beforeDestroy() {
    clearInterval(this.polling)
  },
  created() {
    this.pollData()
    axios.post('/upload_status')
    .then((upload_status) => {
      this.is_progress_end = upload_status.data;
      if(this.is_progress_end == '0'){
        this.ready_start = 0;
      }
      if(this.is_progress_end == '1'){
        this.start_spinner = 1;
        this.ready_start = 0;
      }
      if(this.is_progress_end == '2'){
        this.start_spinner = 0;
        this.ready_start = 1;
      }
    })
  }
}
</script>

<style>
@import 'bootstrap.css';
@import url('https://fonts.googleapis.com/css?family=Bree+Serif');

#a_home {
  color: white;
}

#file {
  border-style: solid;
  color: gray;
}

#black-title {
  margin-top: 30px;
  color: black;
}

#url-btn {
  margin-top: 4px;
}

.option {
  margin-top: 40px;
  margin-bottom: 15px;
}

.opt-title {
  font-weight: bold;
  color: #6CC5DC;
  margin-right: 10px;
  font-size: 1.25em;
  font-family: 'Bree Serif', serif;
}

.opt-content {
  font-family: 'Bree Serif', serif;
}
</style>

<style lang="scss" scoped>
.md-progress-bar{
  margin: 24px;
}
</style>