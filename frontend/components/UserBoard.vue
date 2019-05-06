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
          <button type="button" class="btn btn-outline-danger" v-on:click="logout">Logout</button>
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

          <button type="button" class="btn btn-success" v-on:click="submitFile()">Upload</button>
          <button type="button" class="btn btn-primary" v-on:click="gotoSummary()">Start</button><br>
          <small id="fileHelp" class="form-text text-muted">If you have review data file, its form must be csv file. After choose file, upload and then check summary result.</small>

          <br>

          <div class="option">
            <span class="opt-title">Option 2</span>
            <span class="opt-content">Product URL</span>
          </div>

          <label for="exampleInputFile" style="font-weight: lighter">Input product url in Amazon website</label><br>
          <input type="text" class="form-control" placeholder="product url" id="inputDefault" style="width: 50%" v-model="post_url">
          <button type="button" class="btn btn-success" id="url-btn" v-on:click="submitURL()">Submit</button>
          <button type="button" class="btn btn-primary" v-on:click="gotoSummary2()">Start</button>
          <small id="fileHelp" class="form-text text-muted">You can simply do review analysis. Just copy and paste url in Amazon.</small>
          <small id="fileHelp" class="text-danger" style="color: black">Warning! Getting data from url may take time!</small>
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

export default {
  name: 'app',
  data() {
    return {
      file: '',
      post_url: '',
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
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
        this.$router.replace('/summary')
      }
    },
    gotoSummary2() {
      // go to progress hompage, finally SummaryPage

    },

    gotoHome() {
      this.$router.replace('userboard')
    },

    submitURL() {
      axios.post('/upload_url', {
        body: this.post_url
      })
      .then(response => {})
    },
  }
}
</script>

<style>
@import 'bootstrap.css';
@import url('https://fonts.googleapis.com/css?family=Bree+Serif');

#a_home{
  color: white;
}
#file {
  border-style: solid;
  color: gray;
}

#black-title{
  margin-top: 30px;
  color: black;
}

#url-btn{
  margin-top: 4px;
}

.option{
  margin-top: 40px;
  margin-bottom: 15px;
}

.opt-title{
  font-weight: bold;
  color: #6CC5DC;
  margin-right: 10px;
  font-size: 1.25em;
  font-family: 'Bree Serif', serif;
}

.opt-content{
  font-family: 'Bree Serif', serif;
}
</style>
