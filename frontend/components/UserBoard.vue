<template>
  <div class="userboard">
    <div class="top-bar">
      Review for You
      <button class="button" v-on:click="logout">Logout</button>
    </div>
    <img src="../assets/logo.png" width="250px">

    <div class = "cell">
        <label class="bglabel-file"><span class="label-file"></span>
          <input type = "file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        </label>
        <button class="btn-submit" v-on:click="submitFile()">Submit</button>
        <button class="btn-start" v-on:click="gotoSummary()">Start</button>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'app',

  data(){
    return{
      file: ''
    }
  },

  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },

    submitFile(){
      if(document.getElementById("file").value == ""){
      /* if not file uploaded */
        alert("WARNING: Choose File to upload!");
      }
      else{
        let formData = new FormData();
        /* add the form data we need to submit */
        formData.append('file', this.file);

        /* make the request to the POST , single-file URL */
        axios.post('/fileupload', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function(){
          console.log('File submitted');
          alert("File Submitted!");
        }).catch(function(){
          console.log('File submit Failed');
        });
      }
    },

    /* handles a change on the file upload */
    handleFileUpload(){
      /* set a local variable to the value of the uploaded file */
      this.file = this.$refs.file.files[0];
    },

    /* handles exception when file not uploaded */
    gotoSummary(){
      if(document.getElementById("file").value == ""){
        /* if not file uploaded */
        alert("WARNING: file not uploaded!");
      }
      else{
        /* go to SummaryPage */
        this.$router.replace('/summary')
      }
    },
  }

}
</script>

<style scoped>
#file{
  border-style: solid;
  color: black;
}

.top-bar{
  background-color: #566DC8;
  color: white;
  text-align: left;
  font-size: 20px;

  padding-bottom: 10px;
  padding-top: 5px;
  padding-left: 10px;
  padding-right: 5px;
  margin-bottom: 30px;
}

.button{
  background-color: Transparent;
  border-color: white;
  border-style: solid;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border-radius: 3px;
  float: right;
}

.cell{
  margin-top: 40px;
  margin-bottom: 40px;
}

.btn-submit{
  background-color: #008CBA; /* Blue */
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
}

.btn-start{
  background-color: #f44336; /* Red */
  border: none;
  color: white;
  padding: 5px 14px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 3px;
}

</style>
