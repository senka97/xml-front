<template>
  <div>
    <NavBar />
    <div class="container col-8">
      <b-card style="max-width: 80rem; " class="mt-3 shadow mb-3">
        <template v-slot:header>
          <h3 class="mb-0 text-center">Post an Ad</h3>
        </template>
        <b-form>
          <b-form-group>
            <b-container fluid class="p-4 bg-light">
              <input @change="getImage" type="file" ref="file" style="display: none">
              <b-row>
                <b-col class="d-flex justify-content-center" v-if="images.length === 0">
                  <b-img v-if="images" thumbnail fluid src="https://via.placeholder.com/350x250" alt="Image 1"></b-img>
                </b-col>
                <b-col v-for="img in images" :key="img">
                  <b-img v-if="images" width="300" height="250" thumbnail :src="img"></b-img>
                </b-col>
              </b-row>
            </b-container>
            <b-container class="mt-2">
              <b-row>
                <b-button class="buttons" @click="$refs.file.click()" >Add an image</b-button>
                <b-button variant="outline-secondary" class="buttons ml-2" @click="removeImage()" >Remove an image</b-button>
              </b-row>
            </b-container>
            <hr>
            <b-row class="mt-2">
              <b-col class="col-4">
                <b-form-group label="Brand:">
                  <b-form-select v-model="selectedBrand" :options="brands"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="col-4">
                <b-form-group label="Model:">
                  <b-form-select v-model="selectedModel" :options="models"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col class="col-4">
                <b-form-group label="Vehicle type:">
                  <b-form-checkbox-group
                    id="checkboxVehicleType"
                    v-model="vehicletypeSelected"
                    :options="vehicletype"
                    name="checkboxVehicleType"
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-form-group label="Fuel type:">
                  <b-form-checkbox-group
                    id="checkboxFuelType"
                    v-model="fueltypeSelected"
                    :options="fuelType"
                    name="checkboxFuelType"
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Transmission:">
                  <b-form-checkbox-group
                    id="checkboxTransmission"
                    v-model="transmissionSelected"
                    :options="transmission"
                    name="checkboxTransmission"
                  ></b-form-checkbox-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Number of children seats:">
                  <b-form-input type="number" min="0"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
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
                <b-form-group class="mt-custom">
                  <b-form-checkbox
                    id="checkboxCDW"
                    v-model="cdw"
                    name="checkboxCDW"
                    :value="true"
                  >Collision Damage Waiver</b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-form-group label="Rentable from:">
                  <b-input-group>
                    <b-form-datepicker :min="minDate" locale="en" placeholder="Start date"></b-form-datepicker>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Rentable to:">
                  <b-input-group>
                    <b-form-datepicker :min="minDate" locale="en" placeholder="End date"></b-form-datepicker>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Price:">
                  <b-input-group append="€">
                    <b-form-input type="number" min="0"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Location:">
                  <b-input-group>
                    <b-form-input type="text"></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col>
                <b-form-group>
                  <b-form-checkbox
                    id="checkboxAndroid"
                    v-model="android"
                    name="checkboxAndroid"
                    :value="true"
                  >Android app present in the vehicle</b-form-checkbox>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-button class="buttons ml-auto mr-3" >Post ad</b-button>
            </b-row>           
          </b-form-group>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "PostAd",
  components: {
    NavBar
  },
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const min_date = new Date(today);
    return {
      minDate: min_date,
      selectedBrand: null,
      vehicletypeSelected: [],
      fueltypeSelected: [],
      transmissionSelected: [],
      cdw: false,
      android: false,
      brands: [
        { value: null, text: "Select brand", disabled: true },
        { value: "a", text: "Alfa Romeo" },
        { value: "b", text: "Audi" },
        { value: "c", text: "BMW" },
        { value: "d", text: "Chevrolet" },
        { value: "e", text: "Ferrari" },
        { value: "f", text: "Fiat" },
        { value: "g", text: "Ford" },
        { value: "h", text: "Hyundai" },
        { value: "i", text: "Mercedes Benz" },
        { value: "j", text: "Peugeot" },
        { value: "k", text: "Toyota" }
      ],
      selectedModel: null,
      models: [
        { value: null, text: "Select model", disabled: true },
        { value: "a", text: "Alfa Romeo" },
        { value: "b", text: "A8" },
        { value: "c", text: "BMW" },
        { value: "d", text: "Chevrolet" },
        { value: "e", text: "Ferrari" },
        { value: "f", text: "Fiat" },
        { value: "g", text: "Ford" },
        { value: "h", text: "Hyundai" },
        { value: "i", text: "Mercedes Benz" },
        { value: "j", text: "Peugeot" },
        { value: "k", text: "Toyota" }
      ],
      fuelType: [
        { text: "Petrol", value: "petrol" },
        { text: "Diesel", value: "diesel" },
        { text: "Hybrid", value: "hybrid" },
        { text: "Gas", value: "gas" },
        { text: "Electric", value: "electric" }
      ],
      vehicletype: [
        { text: "SUV", value: "suv" },
        { text: "Saloon", value: "saloon" },
        { text: "Coupe", value: "coupe" },
        { text: "Cabriolet", value: "cabriolet" }
      ],
      transmission: [
        { text: "Manual gearbox", value: "manual" },
        { text: "Semi-automatic", value: "semi-automatic" },
        { text: "Automatic", value: "automatic" }
      ],
      images: [],
      currentImage: 0
    };
  },
  methods: {
    getImage(e) {
      let image = e.target.files[0];
      let reader = new FileReader();
      image.width = "350px";
      image.height = "250px";
      reader.readAsDataURL(image);
      reader.onload = e => {
        this.image = e.target.result;
        this.images.push(this.image);
      };
    },
    removeImage() {
      this.images.pop()
    }
  }
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px;
}

.mt-custom {
  margin-top: 12%;
}

.buttons {
  width: 170px;
}

</style>