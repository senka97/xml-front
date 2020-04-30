<template>
  <div id="div-main">
      <b-navbar style="height:3.3em;" toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="/">Rent A Car</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
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
          <!--Registration requests-->
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
          <!--Agent/Companies registration-->
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
          <!--Users management-->
          <div class="sub-work-div" v-if="showUsers">
            <b-form @submit.prevent="showUsersStatusType()">
                <b-form-group label="User type:">
                  <b-form-radio-group id="userTypeID" v-model="userType" name="user-type">
                    <b-form-radio value="clients">Clients</b-form-radio>
                    <b-form-radio value="agents">Agents/Companies</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-form-group label="Status:">
                  <b-form-radio-group id="userStatusID" v-model="userStatus" name="user-status">
                    <b-form-radio value="all">All</b-form-radio>
                    <b-form-radio value="active">Active</b-form-radio>
                    <b-form-radio value="blocked">Blocked</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
                <b-button variant="info" type="submit">Show</b-button>
            </b-form>
            <hr>
            <!--Clients table-->
            <b-table v-if="show_table_clients" id="table-clients" striped hover bordered borderless :items="itemsClients" :fields="fields_clients">
                <template v-slot:cell(remove)="row">
                  <b-button size="sm" variant="outline-danger" @click="removeUser(row.item.id, 'client')">Remove</b-button>
                </template>
                <template v-slot:cell(change)="row">
                  <b-button v-if="row.item.active" size="sm" variant="outline-warning" @click="blockUser(row.item.id, 'client')">Block</b-button>
                  <b-button v-else size="sm" variant="outline-success" @click="activateUser(row.item.id, 'client')">Activate</b-button>
                </template>
            </b-table>
            <!--Agents table-->
            <b-table v-if="show_table_agents" id="table-agents" striped hover bordered borderless :items="itemsAgents" :fields="fields_agents">
                <template v-slot:cell(details)="row">
                  <b-button size="sm" variant="outline-primary" @click="showAgentDetails(row.item)">Details</b-button>
                </template>
                <template v-slot:cell(remove)="row">
                  <b-button size="sm" variant="outline-danger" @click="removeUser(row.item.id, 'agent')">Remove</b-button>
                </template>
                <template v-slot:cell(change)="row">
                  <b-button v-if="row.item.active" size="sm" variant="outline-warning" @click="blockUser(row.item.id, 'agent')">Block</b-button>
                  <b-button v-else size="sm" variant="outline-success" @click="activateUser(row.item.id, 'agent')">Activate</b-button>
                </template>
            </b-table>
          </div>
          <b-modal id="modal-agent-details" ref="modal-agent-details" ok-only centered title="Agent details">
            <p class="my-4">First name: {{modal_firstName}}</p>
            <p class="my-4">Last name: {{modal_lastName}}</p> 
            <p class="my-4">Company name: {{modal_companyName}}</p>
            <p class="my-4">Company number: {{modal_companyNumber}}</p>
            <p class="my-4">Address: {{modal_address}}</p>
            <p class="my-4">Email: {{modal_email}}</p>
          </b-modal>
           <!--Codebook management-->
          <div class="sub-work-div" v-if="showCodeBook">
               <b-container style="margin-top:2em;width:90%;">
                 <b-row>
                   <b-col style="padding-bottom:1em;">
                     <b-form @submit.prevent="addCarBrand()">
                     <b-form-group label="Car brand:" label-for="carBrandID">
                       <b-input id="carBrandID" v-model="carBrand" type="text" required placeholder="Enter car brand"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                   </b-col>
                   <b-col>
                     <b-form @submit.prevent="addCarModel()">
                     <b-form-group label="Car model:" label-for="carModelID">
                       <b-input id="carModelID" v-model="carModel" type="text" required placeholder="Enter car model"></b-input>
                     </b-form-group>
                     <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                   </b-col>
                 </b-row>
                 <b-row>
                   <b-col style="padding-bottom:1em;">
                     <b-form @submit.prevent="addCarClass()">
                     <b-form-group label="Car class:" label-for="carClassID">
                       <b-input id="carClassID" v-model="carClass" type="text" required placeholder="Enter car class"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                   </b-col>
                   <b-col>
                     <b-form @submit.prevent="addFuelType()">
                     <b-form-group label="Fuel type:" label-for="fuelTypeID">
                       <b-input id="fuelTypeID" v-model="fuelType" type="text" required placeholder="Enter fuel type"></b-input>
                     </b-form-group>
                     <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                   </b-col>
                 </b-row>
                 <b-row>
                   <b-col>
                     <b-form @submit.prevent="addGearType()">
                     <b-form-group label="Gear type:" label-for="gearTypeID">
                       <b-input id="gearTypeID" v-model="gearType" type="text" required placeholder="Enter gear type"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                   </b-col>
                   <b-col>
                   </b-col>
                 </b-row>
               </b-container>
          </div>
           <!--Comments management-->
          <div class="sub-work-div" v-if="showComments">
            <b-table id="table-comments" striped hover bordered borderless :items="itemsComments" :fields="fields_comments">
                <template v-slot:cell(approve)="row">
                  <b-button size="sm" variant="outline-success" @click="approveComment(row.item.id)">Approve</b-button>
                </template>
                <template v-slot:cell(reject)="row">
                  <b-button size="sm" variant="outline-danger" @click="rejectComment(row.item.id)">Reject</b-button>
                </template>
            </b-table>

          </div>
           <!--Permissions management-->
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
          passwordAgent: "",
          userType: "clients",
          userStatus: "all",
          itemsClients: [
            {'id': "1", 'firstName': "Petar", 'lastName': "Petrovic", 'email': "petar@gmail.com", 'status': 'Active', 'active':true},
            {'id': "2", 'firstName': "Marko", 'lastName': "Markovic", 'email': "marko@gmail.com", 'status': 'Blocked', 'active':false}],
          itemsAgents: [
            {'id': "1", 'firstName': "Petar", 'lastName': "Petrovic", 'companyName': 'My company', 'companyNumber':'11223', 'address': 'Kralja Petra 43, Novi Sad', 'email': "petar@gmail.com",'status': 'Active', 'active':true},
            {'id': "2", 'firstName': "Marko", 'lastName': "Markovic", 'companyName': 'My company', 'companyNumber':'11223', 'address': 'Gogoljeva 32, Novi Sad', 'email': "marko@gmail.com", 'status': 'Blocked', 'active':false},
          ],
          fields_clients: [
              "firstName",
              "lastName",
              "email",
              "status",
              "change",
              "remove",
          ], 
          fields_agents: [
              "firstName",
              "lastName",
              "companyName",
              "companyNumber",
              "details",
              "status",
              "change",
              "remove"
          ],
          show_table_clients: false,
          show_table_agents: false,
          modal_firstName: "",
          modal_lastName: "",
          modal_companyName: "",
          modal_companyNumber: "",
          modal_address: "",
          modal_email: "",
          carModel: "",
          carBrand: "",
          carClass: "",
          fuelType: "",
          gearType: "",
          itemsComments: [{"id":"1", "carAdDetails":"Details about car ad", "commenter": "Petar Petrovic", "text":"Bla bla bla asdasd asd asd as dasd  sdaaasd asdasd asdasd asda sd asd adasd sad asd"},
                          {"id":"2", "carAdDetails":"Details about car ad bla bla", "commenter": "Pera Peric", "text":"Bla bla bla asasd asd asdasd dasd"}],
          fields_comments: [
            "carAdDetails",
            "commenter",
            "text",
            "approve",
            "reject"
          ]
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
          //posalje se zahtev koji odbija 
          //ucitaju se ponovo zahtevi sa servera da se osvezi lista
        },
        registerAgent(){

          let agentDTO = {"firstName": this.firstNameAgent, "lastName": this.lastNameAgent, "companyName": this.companyName,
          "address":this.addressAgent, "companyNumber": this.companyNumber, "email": this.emailAgent, "password":this.passwordAgent};
          console.log(agentDTO);
        },
        showUsersStatusType(){
          if(this.userType == "clients" && this.userStatus == "active"){
            //poslati zahtev
            this.show_table_clients = true;
            this.show_table_agents = false;
          }
          if(this.userType == "clients" && this.userStatus == "blocked"){
            //poslati zahtev
            this.show_table_clients = true;
            this.show_table_agents = false;
          }
          if(this.userType == "clients" && this.userStatus == "all"){
            //poslati zahtev
            this.show_table_clients = true;
            this.show_table_agents = false;
          }
          if(this.userType == "agents" && this.userStatus == "active"){
            //poslati zahtev

            this.show_table_clients = false;
            this.show_table_agents = true;
          }
          if(this.userType == "agents" && this.userStatus == "blocked"){
            //poslati zahtev

            this.show_table_clients = false;
            this.show_table_agents = true;
          }
          if(this.userType == "agents" && this.userStatus == "all"){
            //poslati zahtev

            this.show_table_clients = false;
            this.show_table_agents = true;
          }
        },
        removeUser(id, userType){
              if(userType == "client"){
                //poslati zahtev za brisanje klijenta
                this.showUsersStatusType(); // da se osvezi prikaz
                alert("Brise se client: " + id);
              }else{
                //poslati zahtev za brisanje agenta
                this.showUsersStatusType(); // da se osvezi prikaz
                alert("Brise se agent: " + id);
              }
        },
        blockUser(id, userType){
              if(userType == "client"){
                //poslati zahtev za blokiranje klijenta
                this.showUsersStatusType(); // da se osvezi prikaz
                alert("Blokira se client: " + id);
              }else{
                //poslati zahtev za blokiranje agenta
                this.showUsersStatusType(); // da se osvezi prikaz
                alert("Blokira se agent: " + id);
              }
        },
        activateUser(id, userType){
              if(userType == "client"){
                //poslati zahtev za aktiviranje klijenta
                this.showUsersStatusType(); // da se osvezi prikaz
                alert("Aktivira se client: " + id);
              }else{
                //poslati zahtev za aktiviranje agenta
                this.showUsersStatusType(); // da se osvezi prikaz
                alert("Aktivira se agent: " + id);
              }
        },
        showAgentDetails(agent){
          this.modal_firstName = agent.firstName;
          this.modal_lastName = agent.lastName;
          this.modal_companyName = agent.companyName;
          this.modal_companyNumber = agent.companyNumber;
          this.modal_address = agent.address;
          this.modal_email = agent.email;
          this.$refs["modal-agent-details"].show();
        },
        addCarBrand(){
             //posalje se zahtev
             this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New car brand successfully added!',
                type: 'success'
            });
            this.carBrand = "";
        },
        addCarModel(){
          //posalje se zahtev
           this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New car model successfully added!',
                type: 'success'
            });
            this.carModel = "";
        },
        addCarClass(){
          //posalje se zahtev
          this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New car class successfully added!',
                type: 'success'
            });
            this.carClass = "";
        },
        addFuelType(){
          //posalje se zahtev
          this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New fuel type successfully added!',
                type: 'success'
            });
            this.fuelType = "";
        },
        addGearType(){
          //posalje se zahtev
          this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New gear type successfully added!',
                type: 'success'
            });
            this.gearType = "";
        },
        approveComment(id){
          alert("Zahtev prihvacen");
          //poslati zahtev
          console.log(id);
        },
        rejectComment(id){
          //poslati zahtev
          alert("Zahtev odbijen");
          console.log(id);
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
    background-color: #343a40;
    border-radius: 15px;
    
 }

 .b-item:hover, .b-item-last:hover{
     background-color: #485058;
 }

 .b-item{
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