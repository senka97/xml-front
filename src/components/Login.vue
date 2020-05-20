<template>
  <div id="base-div-login">
      <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="/">Rent A Car</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="/homePage" link-classes="text-light"><b>Homepage</b></b-nav-item>
            </b-navbar-nav>
          </b-collapse>  
        </b-navbar>  
    <div id="div-login"> 
        <h2>Login to your account</h2>
        <b-form @submit.prevent="login">
          <b-form-group id="input-group-1" label="Email address:" label-for="emailID" description="We'll never share your email with anyone else.">
           <b-form-input id="emailID" v-model="email" type="email" required placeholder="Enter email"></b-form-input>
         </b-form-group>
         <b-form-group id="input-group-2" label="Password:" label-for="passwordID">
           <b-form-input id="passwordID" v-model="password" type="password" required placeholder="Enter password"></b-form-input>
         </b-form-group>
         <b-button type="submit" variant="primary">Login</b-button>
         <p>Don't have an account? <a href="/registration">Create a new account.</a></p>
    </b-form>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Login',
    data() {
        return {
            email: "",
            password: "",
            showError: false
        }
    },
    methods: {
        login: function(){
            this.$store.dispatch('retrieveToken',{
              email: this.email,
              password: this.password
            })
            .then(response => {
              console.log(response);
              this.$store.dispatch('retrieveCurrentUser')
              .then(response => {
                console.log(response);
                this.$router.push({ name: 'Welcome'});
              }).catch(error => {
                 if(error.response){
                    this.$store.dispatch('destroyToken');
                   alert("Error occured while retrieving current user.");
                  }
              })
              
            }).catch(error => {
                if (error.response && error.response.status === 404) {
                    this.$bvToast.toast(error.response.data, {
                      title: 'Not Found',
                      variant: 'danger',
                      solid: true
                    });
                }
                else if(error.response && error.response.status === 400)
                {
                   this.$bvToast.toast(error.response.data, {
                    title: 'Bad Request',
                    variant: 'danger',
                    solid: true
                });
                }
                else if(error.response && error.response.status === 417)
                {
                   this.$bvToast.toast(error.response.data, {
                    title: 'Expectation Failed',
                    variant: 'danger',
                    solid: true
                });
                }
            });
          } 
          
    }
       
}


</script>

<style>
  h2{
      text-align: center;
      margin-top: 10px;
  }

  #base-div-login{
        background-image: url('../assets/login.jpg');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        height:100vh;
  }

  #div-login {
    margin-left:auto;
    margin-right:auto;
    margin-top:5em;  
    width:40%;
    padding:2em;
    border-width: 0.5px;
    border-style: solid;
  }

  .p-error{
      color:red;
  }

</style>