<template>
   <div > 
       <b-navbar toggleable="lg" type="dark" variant="info">
          <b-navbar-brand href="/"> <b> Rent a Car </b> </b-navbar-brand>
         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-navbar-toggle target="nav-collapse1"></b-navbar-toggle>

          <b-collapse id="nav-collapse1" is-nav>
            <b-navbar-nav class="ml-auto">
              <b-nav-item href="/homePage" link-classes="text-light"><b>Search Cars</b></b-nav-item>
              <b-nav-item href="/postAd" link-classes="text-light"><b>Post Ad</b></b-nav-item>
            </b-navbar-nav>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <!--<b-nav-item href="#"><b-icon style="width: 1.7em; height: 1.7em;" icon="bell-fill" class="rounded-circle bg-info p-2" variant="light"></b-icon><span class="badge badge-notify">3</span></b-nav-item> -->
              <b-nav-item href="/login" link-classes="text-light"><b>Login</b></b-nav-item>
              <b-nav-item href="/registration" link-classes="text-light"><b>Register</b></b-nav-item>
            </b-navbar-nav>
          </b-collapse>  
          </b-collapse>
        </b-navbar>  

  <div class="div-search">
    <b-nav vertical >
      <b-card id="card" no-body  bg-variant="info" text-variant="light" header-text-variant="dark" align="center" header-bg-variant="light" header="Find a car for you" >
       <b-card-text class="div-filter-card">
          <b-form @submit.prevent="search1">
          <b-form-group  align="left" id="input-group-1" label="Location:" label-for="location">
           <b-form-input id="location" v-model="location" type="text" required placeholder="Enter location"></b-form-input>
         </b-form-group>
         <b-form-group  align="left" id="input-group-2" label="Start date: (it has to be 48h from now)" label-for="startDate">
              <b-form-datepicker :min="minDate" v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>
         </b-form-group>   
         <b-form-group  align="left" id="input-group-3" label="End date:" label-for="endDate" > 
            <b-form-datepicker :min="minDate" :max="maxDate" v-model="endDate" locale="en" placeholder="End date"></b-form-datepicker>
         </b-form-group>
         <b-button type="submit" variant="light">Search</b-button>
         
         <p v-if="showError" class="p-error">Error</p>
        </b-form>
        </b-card-text>
      </b-card>
    </b-nav>
  </div>

  <div class="div-filter">
    <div >
     <b-card id="card" no-body  bg-variant="info" header-bg-variant="light" header-text-variant="dark" text-variant="light" header="Filter cars">
    <b-card-text class="div-filter-card">
      <div class="containter mx-2 row">
        <div class="col">
          <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car brand:" label-for="carBrand">
            <b-form-select id="carBrand" v-model="brand" :options="brands">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select brand</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Car class:" label-for="carClass">
            <b-form-select id="carClass" v-model="cclass" :options="classes">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select class</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="6" label-size="sm" label="Mileage:" label-for="mileage">
            <b-form-input id="mileage" :min="0" type="number" placeholder="Choose number" size="sm" v-model="mileage"></b-form-input>
           </b-form-group>
        </div>
    </div>
    <div class="containter mx-2 row">
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Type of fuel:" label-for="carFuelType">
            <b-form-select id="carFuelType" v-model="fuelType" :options="fuelTypes">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select fuel type</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Child Seats:" label-for="childSeats">
              <b-form-input :min="0" :max="4" id="childSeats" size="sm" type="number" placeholder="Choose number" v-model="childSeats" ></b-form-input>
           </b-form-group>
        </div>
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="6" label-size="sm" label="Planned mileage:" label-for="plannedMileage">
            <b-form-input id="plannedMileage" :min="0" type="number" placeholder="Choose number" size="sm" v-model="plannedMileage"></b-form-input>
           </b-form-group>
        </div>
    </div> 
    <div class="containter mx-2 row">
        <div class="col">
            <b-form-group label-cols="1" label-cols-lg="4" label-size="sm" label="Gearshift type:" label-for="gearshiftType">
            <b-form-select id="gearshiftType" v-model="gearshift" :options="gearshifts">
                <template v-slot:first>
                  <b-form-select-option :value="null">Select gearshift type</b-form-select-option>
                </template>
              </b-form-select>  
          </b-form-group>
        </div>
        <div class="col">
          <div class="containter mx-2 row">
            <div class="col"> 
                <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label="Price:" label-for="minPrice">
                  <b-form-input :min="0"  type="number" id="minPrice" size="sm" placeholder="Min" v-model="minPrice"></b-form-input>
                </b-form-group>
            </div>
            <div class="col"> 
              <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label="Price:" label-for="maxPrice">
                  <b-form-input :min="0" type="number" id="maxPrice" size="sm" placeholder="Max" v-model="maxPrice"></b-form-input>
                </b-form-group>
            </div>
          </div>
        </div>
        <div class="col">
            <b-form-group label-cols="6" label-cols-lg="8" label-size="sm" label="Collision Damage Waiver Protection:" label-for="checkbox-1">
              <b-form-checkbox plain size="lg" id="checkbox-1" v-model="CDWProtection" name="checkbox-1" value="true" unchecked-value="false"></b-form-checkbox>
           </b-form-group>
        </div>
    </div> 
    </b-card-text>
  </b-card>
  </div>

  <div class="div-resault" v-if="showCars"> 
     <div v-for="item in items" :key="item"> 
       <b-card img-src="https://www.strongcar.rs/pub/catalog/crop/skoda-superb-rent-a-car.jpg" 
       alt="Card image" img-height="150px" img-width="150px" img-left class="mb-3" style="background-color:azure">
      <b-card-text>
        Information about the car.
      </b-card-text>
    </b-card>
     </div>
  </div>

  </div>
  
</div>

</template>


<script>
export default {
    name: "HomePage",
    components: {
       
    },
    data() {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()+2);
      const minD = new Date(today);
      

      return {
            minDate: minD,
            maxDate: null,
            location: "",
            startDate: null,
            endDate: null,
            showError: false,
            items: [{},{},{}],
            showCars: false,
            brand: null,
            brands:[
                { value: 1, text: "BMW"},
                { value: 1, text: "Audi"},
                { value: 3, text: "Mercedes"},
                { value: 4, text: "Tesla"},
                { value: 5, text: "Opel"}
            ],
            fuelType: null,
            fuelTypes:[
                { value: 1, text: "Petrol"},
                { value: 1, text: "Gas"},
                { value: 3, text: "Diesel"},
            ],
            gearshift: null,
           gearshifts:[
                { value: 1, text: "Manuel"},
                { value: 1, text: "Automatic"},
                { value: 3, text: "Semi-Automatic"},
            ],
            cclass: null,
            classes: [
              { value: 1, text: "SUV"},
              { value: 2, text: "Old Timer"},
              { value: 3, text: "City Car"},
              { value: 4, text: "Sports Car"},     
              { value: 5, text: "Station Vagon"},
              { value: 5, text: "Van"}         
            ],
            minPrice: null,
            maxPrice: null,
            childSeats: null,
            mileage: null,
            plannedMileage: null,
            CDWProtection: "false"
        }
    },
    methods: {
      search1: function(){
        this.showCars = true;
      }
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
/*#base-div{
  background-image: url('../assets/img3.jpg');
  background-attachment: scroll;
  background-size: cover;
  height:100vh;
}*/

  .div-search{
    width:20%;
    float:left;
    
  }
  .div-filter{
    float: left;
    width: 80%;
  }

  .div-resault{
    padding: 1em;
  }
  
  .div-filter-card{
    padding-top: 1em;
  }

  #card{
    padding: 1em;
  }
    
</style>