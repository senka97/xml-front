<template>
  <div>
    <NavBar />
    <div class="container d-flex justify-content-center">
      <b-carousel
        id="carousel-1"
        ref="myCarousel"
        class="mt-3 carousel-custom"
        controls
        indicators
        no-wrap
        fade
      >
        <b-carousel-slide img-src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg" class="custom-height"></b-carousel-slide>
        <b-carousel-slide img-src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg" class="custom-height"></b-carousel-slide>
        <b-carousel-slide img-src="https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg" class="custom-height"></b-carousel-slide>
      </b-carousel>
    </div>
    <div class="overflow-hidden container m-auto custom-width">
      <b-card class="mt-3 mb-3 text-center" :title="vehicle.brand + ' ' + vehicle.model">
        <b-card-text>
          <b-row>
            <b-col col-3>
              <b-icon icon="star-fill"></b-icon>
              {{vehicle.rate}}
            </b-col>
            <b-col col-3>
              <b>Price:</b>
              {{vehicle.price}}
              <b>€</b>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Fuel type:</b>
              {{vehicle.fuelType}}
            </b-col>
            <b-col>
              <b>Vehicle type:</b>
              {{vehicle.vehicletype}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Transmission:</b>
              {{vehicle.transmission}}
            </b-col>
            <b-col>
              <b>Children seats:</b>
              {{vehicle.childrenSeats}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Mileage:</b>
              {{vehicle.mileage}}
              <b>km</b>
            </b-col>
            <b-col>
              <b>Km limit:</b>
              {{vehicle.kilometerLimit}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Collision Damage Waiver:</b> Yes
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "VehicleDetails",
  components: {
    NavBar
  },
  data() {
    return {
      vehicle: {
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
    };
  },
  methods: {
    prev() {
      this.$refs.myCarousel.prev();
    },
    next() {
      this.$refs.myCarousel.next();
    }
  }
};
</script>

<style scoped>
.carousel-custom {
  width: 75%;
  height: 480px;
}

.custom-height {
  max-height: 480px;
  display: flex;
  justify-content: center;
}

.custom-width {
  width: 57%;
}
</style>