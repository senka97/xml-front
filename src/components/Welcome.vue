<template>
    <div id="div">
        <b-navbar toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="/"> <b> Rent a Car </b> </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse1"></b-navbar-toggle>

          <b-collapse id="nav-collapse1" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="/home" link-classes="text-light"><b>Search Cars</b></b-nav-item>
              <b-nav-item href="/post/ad" link-classes="text-light"><b>Post Ad</b></b-nav-item>
            </b-navbar-nav>

          <b-navbar-toggle target="nav-collapse2"></b-navbar-toggle>
          <b-collapse id="nav-collapse2" is-nav>
            <b-navbar-nav class="ml-auto">
              <!--<b-nav-item href="#"><b-icon style="width: 1.7em; height: 1.7em;" icon="bell-fill" class="rounded-circle bg-info p-2" variant="light"></b-icon><span class="badge badge-notify">3</span></b-nav-item> -->
              <b-nav-item href="/login" link-classes="text-light"><b>Login</b></b-nav-item>
              <b-nav-item href="/registration" link-classes="text-light"><b>Register</b></b-nav-item>
            </b-navbar-nav>
          </b-collapse>  
          </b-collapse>
        </b-navbar>  
    <div>
    <b-carousel
     id="carousel-1"
      v-model="slide"
      :interval="5000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"    
    >

      <!--img-src="https://i.sozcu.com.tr/wp-content/uploads/2017/10/scrrr.jpg"-->
      <b-carousel-slide
        caption="Welcome to Rent-a-Car Novi Sad"
        :img-src="require('@/assets/welcome1.jpg')"
      ></b-carousel-slide>

       <!--img-src="https://images.pexels.com/photos/170286/pexels-photo-170286.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"-->
      <b-carousel-slide
        caption="Here you can find a car that fits your needs"
        text= "Start your search here"
        :img-src="require('@/assets/welcome2.jpeg')">
       <b-button pill variant="secondary" href="/homePage" style="width: 13em;">Search</b-button>
      
      </b-carousel-slide>

        <!--img-src="https://images.pexels.com/photos/1073031/pexels-photo-1073031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"-->
        <b-carousel-slide
        caption="Or you can make an ad for renting your car"
        text = "If you are new here, register for free, if not, log in to your account"
        :img-src="require('@/assets/welcome3.jpeg')">
        <b-button href="/registration" pill variant="secondary" style="width: 13em; margin: 1em">Register </b-button>
        <b-button href="/login" pill variant="secondary" style="width: 13em; margin: 1em">Log in </b-button>
      </b-carousel-slide>
        
    
    </b-carousel>

    
  </div>
        
    </div>
</template>

<script>


export default {
    name: "StartPage",
    components: {
       
    },
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
    
    
  
};
</script>

<style scoped>
    
</style>