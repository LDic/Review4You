<template>
  <div class="back">
  <div class="container-start" id="start-only">

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" id="a_home" v-on:click="gotoStart()">Review4You</a>
    </nav>

    <div class="container">

     <div class="row">
       <div class="col-12">
         <div class="page-header">
           <h2 id="theme">Default</h2><br><br>
             <p id="description" class="lead"><font color="white">
               <h2>Welcome to Review4You</h2></font>
             </p>

             <div><font color="white">
               We analyze your reviews
               based on 3 aspects: <a href="#"><strong>Intent, Emotion, Keyword.</strong></a><br>
               <p>You can check overview of your reviews in Summary page.<br>
               Also, you can search your reviews based on your preference at Search page.</p>
               <p>Please login, and enjoy our premier service.</p></font>
             </div><br>

             <div class="bs-example">
               <button type="button" class="btn btn-primary" v-on:click="login()">Get Started</button>
             </div>
         </div>
       </div>
     </div>

   </div>

   <div class="bottom-space">
     <h3 id="bottom-title">Developers</h3>
     <h5 id="bottom-title">Team: My melody</h5>
     <li>Model: SeungYup Seon</li>
     <li>Backend & ElasticSearch: MyungSeon Kim</li>
     <li>Frontend: Eungyeong Kim</li>
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
          //this.$router.replace('/auth/login')
          window.location.pathname = '/auth/login'
        },

        gotoStart(){
          //this.$router.replace('/')
          window.location.pathname = '/'
        }
      }

    }
</script>

<style scoped>
@import 'bootstrap.css';

#bottom-title{
  color: #918C8C;
}

#a_home{
  color: white;
}

.container-start{
  background-image: url("https://images.unsplash.com/photo-1549299513-83dceea1f48b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1954&q=80");
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bottom-space{
  margin-left: 80px;
  margin-top: 200px;
  margin-bottom: 50px;
}

</style>
