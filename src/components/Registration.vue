<template>
  <div id="base-div">
      <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="/homePage">Rent A Car</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="/homePage" link-classes="text-light"><b>Homepage</b></b-nav-item>
            </b-navbar-nav>
          </b-collapse>  
        </b-navbar>  
    <div id="div-reg"> 
        <h2>Create an account</h2>
        <b-form @submit.prevent="createAccount()">
           <b-form-group id="input-group-1" label="First name:" label-for="firstNameID">
              <b-form-input id="firstNameID" v-model="firstName" type="text" required placeholder="Enter first name"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-2" label="Last name:" label-for="lastNameID">
              <b-form-input id="lastNameID" v-model="lastName" type="text" required placeholder="Enter last name"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-3" label="Email address:" label-for="emailID">
             <b-form-input id="emailID" v-model="email" type="email" required placeholder="Enter email"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-4" label="Password (At least 6 characters):" label-for="passwordID"
           :invalid-feedback="invalidFeedbackPassword" :valid-feedback="validFeedbackPassword" :state="statePassword">
             <b-form-input id="passwordID" v-model="password" type="password" required placeholder="Enter password"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-5" label="Confirm password:" label-for="confirmpassID"
           :invalid-feedback="invalidFeedbackPasswordC" :valid-feedback="validFeedbackPasswordC" :state="statePasswordC">
             <b-form-input id="confirmpassID" v-model="passwordConfirm" type="password" required placeholder="Confirm password"></b-form-input>
           </b-form-group>
         <b-button class="btn-submit" type="submit" variant="primary">Create</b-button>
         <b-button class="btn-reset" type="reset" v-on:click="reset()" variant="danger">Reset</b-button>
    </b-form>
      </div>
  </div>
</template>

<script>
export default {

    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordConfirm: "",
            showError: false
        }
    },
    methods: {
        createAccount: function(){
            console.log(this.firstName);
        },
        reset: function(){
            this.password = "";
            this.passwordConfirm = "";
        }
    },
    computed: {
        statePassword: function(){
            if(this.password.length < 6){
                return false;
            }else{
                return true;
            }
        },
        statePasswordC: function(){
            if(this.passwordConfirm != this.password){
                return false;
            }else{
                return true;
            }
        },
        invalidFeedbackPassword: function(){
            if(this.statePassword == false && this.password.length > 0){
                  return 'Password is too short.';
            }else{
                  return '';
            }    
        },
        validFeedbackPassword: function(){
            
               if(this.statePassword){
                 return "Password is good."
            }else{
                return '';
            }
                
        },
        invalidFeedbackPasswordC: function(){
            if(this.statePasswordC == false && this.passwordConfirm.length > 0){
                  return 'Passwords don\'t match.';
            }else{
                  return '';
            }       
        },
        validFeedbackPasswordC: function(){
            
               if(this.statePasswordC && this.passwordConfirm.length > 0){
                 return 'Passwords match.'
            }else{
                return '';
            }          
        }
    }

}
</script>

<style>
    h2{
      text-align: center;
      margin-top: 10px;
    }

    #base-div{
        background-image: url('../assets/login.jpg');
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
        height:100vh;
    }

    #div-reg {
        margin-left:auto;
        margin-right:auto;
        margin-top:0.1em;  
        width:40%;
        padding:2em;
        padding-top:0;
        padding-bottom:0.5em;
        border-width: 0.5px;
        border-style: solid;
    }

    .btn-reset{
        margin-left:1em;
    }
    .btn-submit, .btn-reset{
        width:5em;
    }
</style>