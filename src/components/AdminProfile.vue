<template>
  <div id="div-main">
      <b-navbar style="height:3.3em;" toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="/">Rent A Car</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <!--<b-nav-item href="#"><b-icon style="width: 1.7em; height: 1.7em;" icon="bell-fill" class="rounded-circle bg-info p-2" variant="light"></b-icon><span class="badge badge-notify">3</span></b-nav-item>--> 
              <b-nav-item href="/homePage" link-classes="text-light"><b>Homepage</b></b-nav-item>
              <b-nav-item v-on:click="logout()" link-classes="text-light"><b>Log out</b></b-nav-item>
            </b-navbar-nav>
          </b-collapse>  
        </b-navbar> 
        <div class="sidebar-div">
          <h4 class="h4-sidebar">Options:</h4>
          <b-nav vertical class="options-sidebar">
            <b-nav-item class="b-item" link-classes="text-light" @click="showRequestsF()">Registration requests</b-nav-item>
            <b-nav-item class="b-item" link-classes="text-light" @click="showRegFormF()">Register agent/company</b-nav-item>
            <b-nav-item class="b-item" link-classes="text-light" @click="showUsersF()">Users management</b-nav-item>
            <b-nav-item class="b-item" link-classes="text-light" @click="showCodeBookF()">Codebook management</b-nav-item>
            <b-nav-item class="b-item" link-classes="text-light" @click="showCommentsF()">Comments management</b-nav-item>
            <b-nav-item class="b-item-last" link-classes="text-light" @click="showPermissionsF()">Permissions management</b-nav-item>
          </b-nav>
        </div>
        <div class="vertical-line"></div>
        <div class="work-div">
          <h4 class="h4-work">{{currentOption}}</h4>
          <div class="sub-work-div" v-if="showRequests">
              <b-table striped hover bordered borderless :items="items" :fields="fields">
                <template v-slot:cell(approve)="row">
                  <b-button size="sm" variant="outline-success" @click="approveRequest(row.item.id)" >Approve</b-button>
                </template>
                <template v-slot:cell(reject)="row">
                  <b-button size="sm" variant="outline-danger" @click="rejectRequest(row.item.id)">Reject</b-button>
                </template>
              </b-table>
          </div>
          <div class="sub-work-div" v-if="showRegForm">
            <b-form class="reg-form" @submit.prevent="registerAgent()">
           <b-form-group id="input-group-1" label="First name:" label-for="firstNameAID">
              <b-form-input id="firstNameAID" v-model="firstNameAgent" type="text" required placeholder="Enter first name"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-2" label="Last name:" label-for="lastNameAID">
              <b-form-input id="lastNameAID" v-model="lastNameAgent" type="text" required placeholder="Enter last name"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-3" label="Name of the company:" label-for="companyID">
             <b-form-input id="companyID" v-model="companyName" type="text" required placeholder="Enter a company's name"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-3" label="Address:" label-for="addressID">
             <b-form-input id="addressID" v-model="addressAgent" type="text" required placeholder="Enter a company's name"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-3" label="Company number:" label-for="companyNumID">
             <b-form-input id="companyNumID" v-model="companyNumber" type="number" required placeholder="Enter a company's number"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-3" label="Email address:" label-for="emailAID">
             <b-form-input id="emailIDA" v-model="emailAgent" type="email" required placeholder="Enter email"></b-form-input>
           </b-form-group>
           <b-form-group id="input-group-4" label="Password:" label-for="passwordID"
           :invalid-feedback="invalidFeedbackPassword" :valid-feedback="validFeedbackPassword" :state="statePassword">
             <b-form-input id="passwordID" v-model="passwordAgent" type="password" required placeholder="Enter password"></b-form-input>
           </b-form-group>
           
         <b-button class="btn-submit" type="submit" variant="primary">Register</b-button>
         <b-button class="btn-reset" type="reset" v-on:click="reset()" variant="danger">Reset</b-button>
    </b-form>

          </div>
          <div class="sub-work-div" v-if="showUsers">

          </div>
          <div class="sub-work-div" v-if="showCodeBook">

          </div>
          <div class="sub-work-div" v-if="showComments">

          </div>
          <div class="sub-work-div" v-if="showPermissions">

          </div>
        </div>
  </div>
</template>

<script>
export default {

    data() {
        return {
          fields: [
              "firstName",
              "lastName",
              "email",
              "Approve",
              "Reject",
          ],
          items: [
            {'id': "1", 'firstName': "Petar", 'lastName': "Petrovic", 'email': "petar@gmail.com"},
            {'id': "2", 'firstName': "Marko", 'lastName': "Markovic", 'email': "marko@gmail.com"}
          ],
          currentOption: "Choose an option...",
          showRequests: false,
          showRegForm: false,
          showUsers: false,
          showCodeBook: false,
          showComments: false,
          showPermissions: false,
          firstNameAgent: "",
          lastNameAgent: "",
          companyName: "",
          addressAgent: "",
          companyNumber: "",
          emailAgent: "",
          passwordAgent: "" 
        }
    },
    methods:{
        logout(){
            //logout
            this.$router.push({ path: '/homePage'});
        },
        showRequestsF(){
          //posalje se zahtev za svim request-ovima
          this.currentOption = "Registration requests";
          this.showRequests = true;
          this.showRegForm = false;
          this.showUsers = false;
          this.showCodeBook = false;
          this.showComments = false;
          this.showPermissions = false;
        },
        showRegFormF(){
          this.currentOption = "Register agent/company";
           this.showRegForm = true;
           this.showRequests = false;
           this.showUsers = false;
           this.showCodeBook = false;
           this.showComments = false;
           this.showPermissions = false;
        },
        showUsersF(){
          this.currentOption = "Users management";
          this.showUsers = true;
          this.showRegForm = false;
          this.showRequests = false;
          this.showCodeBook = false;
          this.showComments = false;
          this.showPermissions = false;
        },
        showCodeBookF(){
          this.currentOption = "Codebook management";
          this.showCodeBook = true;
          this.showUsers = false;
          this.showRegForm = false;
          this.showRequests = false;
          this.showComments = false;
          this.showPermissions = false;
        },
        showCommentsF(){
          this.currentOption = "Comments management";
          this.showComments = true;
          this.showCodeBook = false;
          this.showUsers = false;
          this.showRegForm = false;
          this.showRequests = false;
          this.showPermissions = false;
        },
        showPermissionsF(){
          this.currentOption = "Permissions management";
          this.showPermissions = true;
          this.showCodeBook = false;
          this.showUsers = false;
          this.showRegForm = false;
          this.showRequests = false;
          this.showComments = false;
        },
        approveRequest(id){
          console.log("Accepted:" + id);
          //posalje se zahtev koji menja status zahteva
          //ucitavaju se ponovo zahtevi sa servera da se osvezi lista
        },
        rejectRequest(id){
          console.log("Rejected:" + id);
        },
        registerAgent(){

          //let agentDTO = {"firstName": this.firstNameAgent, "lastName": this.lastNameAgent, "companyName": this.companyName,
          //"address":this, }
        }

    },
    computed: {
        statePassword: function(){
            if(this.passwordAgent.length < 6){
                return false;
            }else{
                return true;
            }
        },
        invalidFeedbackPassword: function(){
            if(this.statePassword == false && this.passwordAgent.length > 0){
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
                
        }
    }

}
</script>
<style>
    
    .sidebar-div{
    width:18%;
    float:left;   
    text-align:center;
    margin-left: 1em;
   }

   .work-div {
    float:left;
    width: 73%;
    margin-left:7%;
    margin-top:2em;
    margin-bottom: 3em;
}

  .sub-work-div{
    width: 100%;
  }

 .h4-sidebar, .h4-work{
    text-align: center;
    margin-bottom: 0.5em;
    margin-top: 0.5em;
 }

 .options-sidebar{
    width: 100%;
    /*background-color: #17a2b8;*/
    background-color: #343a40;
    border-radius: 15px;
    
 }

 .b-item:hover, .b-item-last:hover{
   /*background-color: #128192;*/
     background-color: #485058;
 }

 .b-item{
   /*border-bottom: solid 1px #128192;*/
   border-bottom: solid 1px #485058;
 }

 .reg-form{
   width:60%;
   border: 1px solid black;
   border-radius: 10px;
   padding-left:2em;
   padding-right:2em;
   padding-top:0.5em;
   padding-bottom: 0.5em;
   margin-left:auto;
   margin-right:auto;
 }



</style>