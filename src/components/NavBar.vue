<template>
   <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
    <b-navbar-brand href="/" class="title font-weight-bold">Rent A Car</b-navbar-brand>
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/home" link-classes="text-light"><b>Search Cars</b></b-nav-item>
            <b-nav-item  v-if="clientAgentLoggedIn" href="/post/ad" link-classes="text-light"><b>Post Ad</b></b-nav-item>
            <b-nav-item  v-if="clientAgentLoggedIn" href="/newRequests" link-classes="text-light"><b>New Requests</b> <b-badge v-if="showNewRequests" pills variant="danger">{{numberOfNewRequests}}</b-badge> </b-nav-item>
          </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="showClientProfile" href="/cart" link-classes="text-light"><b>Cart</b></b-nav-item>
            <b-nav-item v-if="showAdminProfile" href="/adminProfile" link-classes="text-light"><b>Admin profile</b></b-nav-item>
            <b-nav-item v-if="loggedIn" @click="logout()" link-classes="text-light"><b>Logout</b></b-nav-item>
            <b-nav-item v-if="!loggedIn" href="/login" link-classes="text-light"><b>Login</b></b-nav-item>
            <b-nav-item v-if="!loggedIn" href="/registration" link-classes="text-light"><b>Register</b></b-nav-item>           
        
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
           numberOfNewRequests: 2,
        }
    },
    methods: {
       logout: function() {
          this.$store.dispatch('destroyToken');
          this.$store.dispatch('destroyCurrentUser');
          this.$router.push({'name': 'Login'});
        }
    },
    created() {
        /*axios.get("https://localhost:8083/....." + this.$store.getters.currentUserId).then(
              response => {
                this.numberOfNewRequests = response.data
              }
            ).catch(error => {
                alert(error.data);
            })*/

    },
    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn;
      },
      showAdminProfile(){
        return this.$store.getters.userRole == "ROLE_ADMIN" && this.$store.getters.loggedIn;
      },
      showAgentProfile(){
        return this.$store.getters.userRole == "ROLE_AGENT" && this.$store.getters.loggedIn;
      },
      showClientProfile(){
        return this.$store.getters.userRole == "ROLE_CLIENT" && this.$store.getters.loggedIn;
      },
     clientAgentLoggedIn(){
        return (this.$store.getters.userRole == "ROLE_CLIENT" || this.$store.getters.userRole == "ROLE_AGENT") && this.$store.getters.loggedIn;
      },
      showNewRequests()
      {
        if(this.numberOfNewRequests == 0)
        {
          return false;
        }
        else return true;
      }
    }

}
</script>

<style scoped>

</style>