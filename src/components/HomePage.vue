<template>
  <div>
    <NavBar />
    <div class="image"></div>
    <div class="container col-11 card-container">
      <b-card class="shadow">
        <b-form>
          <b-form-group>
            <b-row>
              <b-col>
                <b-label>Pick-Up Location</b-label>
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="geo-alt"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input class="col-12" type="text" required></b-form-input>
                </b-input-group>
              </b-col>
              <b-col>
                <b-label>Pick-Up Date</b-label>
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="calendar"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input class="col-12" type="datetime-local" required></b-form-input>
                </b-input-group>
              </b-col>
              <b-col>
                <b-label>Return Date</b-label>
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="calendar"></b-icon>
                  </b-input-group-prepend>
                  <b-form-input class="col-12" type="datetime-local" required></b-form-input>
                </b-input-group>
              </b-col>
              <b-col>
                <b-input-group>
                  <b-button v-b-toggle.collapse-2 type="button" class="col-12 mt-4 m-1">Expanded Search</b-button>
                </b-input-group>
              </b-col>
              <b-col>
                <b-input-group>
                  <b-button  type="button" class="col-12 mt-4" @click="search">Search</b-button>
                </b-input-group>
              </b-col>
            </b-row>
            <b-row>
                <b-collapse id="collapse-2" class="mb-5 container-fluid margin-custom">
                   <div class="extended-search mt-3 pt-2">
                     <b-row class="mt-2">
                       <b-col>
                         <b-form-select v-model="selectedBrand" :options="brands"></b-form-select>
                       </b-col>
                        <b-col>
                          <b-form-select v-model="selectedModel" :options="models"></b-form-select>
                        </b-col>
                        <b-col>
                          <b-form-input type="number" min="0" placeholder="Price from"></b-form-input>
                        </b-col>
                        <b-col>
                          <b-form-input type="number" min="0" placeholder="Price to"></b-form-input>
                        </b-col>
                     </b-row>
                     <b-row class="mt-2">
                       <b-col>
                         <b-form-group label="Fuel type:">
                        <b-form-checkbox-group
                          id="checkbox-group-1"
                          v-model="fueltypeSelected"
                          :options="fuelType"
                          name="flavour-1"
                        ></b-form-checkbox-group>
                        </b-form-group>
                       </b-col>
                       <b-col>
                         <b-form-group label="Vehicle type:">
                        <b-form-checkbox-group
                          id="checkbox-group-1"
                          v-model="vehicletypeSelected"
                          :options="vehicletype"
                          name="flavour-1"
                        ></b-form-checkbox-group>
                        </b-form-group>
                       </b-col>
                       <b-col>
                         <b-form-group label="Transmission:">
                        <b-form-checkbox-group
                          id="checkbox-group-1"
                          v-model="transmissionSelected"
                          :options="transmission"
                          name="flavour-1"
                        ></b-form-checkbox-group>
                        </b-form-group>
                       </b-col>
                     </b-row>
                     <b-row class="mt-2">
                       <b-col>
                         <b-form-group label="Mileage:">
                          <b-form-input type="number" min="0"></b-form-input>
                        </b-form-group>
                       </b-col>
                       <b-col>
                        <b-form-group label="Kilometers limit:">
                          <b-form-input type="number" min="0" placeholder="Unlimited"></b-form-input>
                        </b-form-group>
                       </b-col>
                       <b-col>
                          <b-form-group label="Number of children seats:">
                          <b-form-input type="number" min="0"></b-form-input>
                        </b-form-group>
                       </b-col>
                       <b-col>
                         <b-form-group class="mt-custom">
                          <b-form-checkbox
                            id="checkbox-1"
                            v-model="cdw"
                            name="checkbox-1"
                            :value="true"
                          >
                            Collision Damage Waiver
                          </b-form-checkbox>
                        </b-form-group>
                       </b-col>
                     </b-row>
                   </div>
                </b-collapse>
            </b-row>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
    <div class="container d-flex mt-5">
      <b-form-select v-model="sortSelected" :options="sortingOptions" class="col-2 ml-auto mr-custom" v-if="show"></b-form-select>  
    </div>
    <div class="container mt-4 d-flex justify-content-center" v-for="v in vehicles" :key="v.id">
      <VehicleCard v-if="show" :showDiffButtons="true" :vehicle="v"/>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import VehicleCard from "../components/VehicleCard.vue";

export default {
  name: "HomePage",
  components: {
    NavBar,
    VehicleCard,
  },
  data() {
      return {
        selectedBrand: null,
        vehicletypeSelected: [],
        fueltypeSelected: [],
        transmissionSelected: [],
        cdw: false,
        brands: [
          { value: null, text: 'Brand', disabled: true},
          { value: 'a', text: 'Alfa Romeo' },
          { value: 'b', text: 'Audi' },
          { value: 'c', text: 'BMW' },
          { value: 'd', text: 'Chevrolet'},
          { value: 'e', text: 'Ferrari'},
          { value: 'f', text: 'Fiat'},
          { value: 'g', text: 'Ford'},
          { value: 'h', text: 'Hyundai'},
          { value: 'i', text: 'Mercedes Benz'},
          { value: 'j', text: 'Peugeot'},
          { value: 'k', text: 'Toyota'},
        ],
        selectedModel: null,
        models: [
          { value: null, text: 'Model', disabled: true},
          { value: 'a', text: 'Alfa Romeo' },
          { value: 'b', text: 'A8' },
          { value: 'c', text: 'BMW' },
          { value: 'd', text: 'Chevrolet'},
          { value: 'e', text: 'Ferrari'},
          { value: 'f', text: 'Fiat'},
          { value: 'g', text: 'Ford'},
          { value: 'h', text: 'Hyundai'},
          { value: 'i', text: 'Mercedes Benz'},
          { value: 'j', text: 'Peugeot'},
          { value: 'k', text: 'Toyota'},
        ],
        fuelType: [
          {text: 'Petrol', value: 'petrol'},
          {text: 'Disel', value: 'disel'},
          {text: 'Hybrid', value: 'hybrid'},
          {text: 'Gas', value: 'gas'},
          {text: 'Electric', value: 'electric'},
        ],
        vehicletype: [
          {text: 'SUV', value: 'suv'},
          {text: 'Saloon', value: 'saloon'},
          {text: 'Coupe', value: 'coupe'},
          {text: 'Cabriolet', value: 'cabriolet'},
        ],
        transmission: [
          {text: 'Manual gearbox', value: 'manual'},
          {text: 'Semi-automatic', value: 'semi-automatic'},
          {text: 'Automatic', value: 'automatic'},
        ],
        vehicles: [
          {
            id: 1,
            image: 'https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914',
            brand: 'Audi',
            model: 'A8',
            price: 75,
            fuelType: 'Disel',
            vehicletype: 'Saloon',
            transmission: 'Manual',
            mileage: 15000,
            kilometerLimit: 'Unlimited',
            childrenSeats: 0,
            cdw: true,
            rate: 4.5,
          }
        ],
        show: false,
        sortSelected: null,
        sortingOptions: [
          { value: null, text: 'Sort by', disabled: true},
          { value: 'priceAsc', text: 'Price ascending' },
          { value: 'priceDesc', text: 'Price descendig' },
          { value: 'mileageAsc', text: 'Mileage ascending' },
          { value: 'mileageDesc', text: 'Mileage descending'},
          { value: 'rateAsc', text: 'Rate ascending'},
          { value: 'rateDesc', text: 'Rate descending'},
        ],
      }
  },
  methods: {
    search: function() {
      this.show = true;
    }
  }
};
</script>

<style scoped>

.image {
  overflow: hidden;
  background-image: url("../assets/car_lake1.jpg");
  height: 500px;
  width: 100%;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
}

.card-container {
    margin-top: 28%;
    position: relative;
}

.extended-search {
    width: 100%;
    border-top: 1px solid rgb(168, 168, 168);
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
    box-shadow: 5px 5px 5px 5px;
}

.mt-custom {
  margin-top: 12%;
}

.mr-custom {
  margin-right: 12.5%;
}

</style>