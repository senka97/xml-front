<template>
   <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
    <b-navbar-brand class="title font-weight-bold">Rent A Car</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">

            <!--Za ulogovane korisnike-->
           <!--  <b-nav-item href="/cart">Cart</b-nav-item> -->

            <!--Za neregistrovane korisnike-->
            <b-button  v-if="!loggedIn" class="mr-3"><a href="/login" class="removeDecoration">Login</a></b-button>
            <b-button  v-if="!loggedIn" ><a href="/registration" class="removeDecoration">Register</a></b-button>
            <b-button v-if="loggedIn" @click="logout()"><a class="removeDecoration">Log Out</a></b-button>

            <!--Za sve ulogovane korisnike-->
         <!--   <b-button @click="logout">Log out</b-button>  -->
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
           
        }
    },
    methods: {
       logout: function() {
          this.$store.dispatch('destroyToken');
          this.$router.push({'name': 'Login'});
        }
    },
    computed: {
      loggedIn(){
        return this.$store.getters.loggedIn;
      }
    }

}
</script>

<style scoped>
.removeDecoration {
    text-decoration: none;
    color: #fff;
}
</style>