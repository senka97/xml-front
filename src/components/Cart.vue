<template>
  <div>
    <NavBar />
    <div class="container d-flex mt-5">
      <b-form-group class="ml-auto mr-custom">
        <b-row>
          <b-form-checkbox
          id="checkbox-1"
          v-model="separateOrders"
          name="checkbox-1"
          :value="true"
          class="mr-2 mt-1"
        >Create separate orders</b-form-checkbox>
        <b-button>Create request</b-button>
        </b-row>        
      </b-form-group>
      
    </div>
    <div class="container mt-3 d-flex justify-content-center" v-for="v in vehicles" :key="v.id">
      <VehicleCard :showDiffButtons="false" :vehicle="v" />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import VehicleCard from "../components/VehicleCard.vue";

export default {
  name: "Cart",
  components: {
    NavBar,
    VehicleCard
  },
  data() {
    return {
      separateOrders: false,
      vehicles: [
        {
          id: 1,
          image:
            "https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914",
          brand: "Audi",
          model: "A8",
          price: 75,
          fuelType: "Disel",
          vehicletype: "Saloon",
          transmission: "Manual",
          mileage: 15000,
          kilometerLimit: "Unlimited",
          childrenSeats: 0,
          cdw: true,
          rate: 4.5
        }
      ]
    };
  }
};
</script>

<style scoped>

.mr-custom {
  margin-right: 14%;
}

</style>