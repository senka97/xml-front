<template>
   <div> 
       <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="/homePage">Rent A Car</b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="#"><b-icon style="width: 1.7em; height: 1.7em;" icon="bell-fill" class="rounded-circle bg-info p-2" variant="light"></b-icon><span class="badge badge-notify">3</span></b-nav-item> 
              <b-nav-item href="/login" link-classes="text-light"><b>Login</b></b-nav-item>
              <b-nav-item href="/registration" link-classes="text-light"><b>Register</b></b-nav-item>
            </b-navbar-nav>
          </b-collapse>  
        </b-navbar>  
   </div>

</template>

<script>


export default {
    name: "HomePage",
    components: {
       
    },
    data() {
      
      
    },
    methods: {
      
    }
  
};
</script>

<style scoped>
.badge-notify{
   background:red;
   position:relative;
   top: -15px;
   left: -15px;
}
    
</style>