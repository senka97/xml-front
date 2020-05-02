<template>
  <div>
    <NavBar />
    <div class="container d-flex justify-content-center">
      <b-carousel
        ref="myCarousel"
        v-model="currentImage"
        controls
        indicators
        interval="4000"
        class="mt-3 carousel-custom shadow"
      >
        <b-carousel-slide class="cutom-height" v-for="img in images" :key="img" :img-src="img"></b-carousel-slide>
      </b-carousel>
    </div>
    <div class="overflow-hidden container m-auto custom-width">
      <b-card class="mt-1 mb-3 text-center shadow">
        <template v-slot:header>
          <h3 class="mb-0 text-center">{{vehicle.brand + ' ' + vehicle.model}}</h3>
        </template>
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
              <b>Vehicle type:</b>
              {{vehicle.vehicletype}}
            </b-col>
            <b-col>
              <b>Fuel type:</b>
              {{vehicle.fuelType}}
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
    <!--Ova kartica ce se prikazivati samo ako je korisnik ulogovan" -->
    <div class="container custom-dim-comment">
      <b-card class="mb-3">
        <template v-slot:header>
          <h5 class="mb-0">Comment</h5>
        </template>
        <b-card-text>
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <b-btn class="mr-5 mt-2">Add comment</b-btn>
        </b-card-text>
      </b-card>
    </div>
    <div class="container mt-3 custom-dim-comment" v-for="c in comments" :key="c.id">    
      <b-card class="mb-3 shadow">
        <b-card-text>
          <p class="font-weight-bold">{{c.name + ' ' + c.surname}}</p>
          <p>{{c.comment}}</p>
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
      },
      images: [
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg",
        "https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914",
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg"
      ],
      currentImage: 0,
      comments: [
        {
          id: 1,
          comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, beatae? Lorem ipsum dolor sit, amet consectetur adipisicing elit.Unde id animi at hic reprehenderit praesentium aliquam vero quae! Sint, officiis!',
          name: 'Pera',
          surname: 'Peric',
        },
        {
          id: 2,
          comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, beatae? Lorem ipsum dolor sit, amet consectetur adipisicing elit.Unde id animi at hic reprehenderit praesentium aliquam vero quae! Sint, officiis!',
          name: 'Djura',
          surname: 'Djuric',
        },
        {
          id: 3,
          comment: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, beatae? Lorem ipsum dolor sit, amet consectetur adipisicing elit.Unde id animi at hic reprehenderit praesentium aliquam vero quae! Sint, officiis!',
          name: 'Marko',
          surname: 'Markovic',
        }
      ]
    };
  },
  methods: {
    prev() {
      this.currentImage = this.images.length - 1;
      this.$refs.imageCarousel.setSlide(this.images.length - 1);
    },
    next() {
      this.currentImage = this.images.length + 1;
      this.$refs.imageCarousel.setSlide(this.images.length + 1);
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

.custom-dim-comment {
  width: 57%;
  height: 25%;
}

.shadow {
  -webkit-box-shadow: 5px 5px 5px 5px;
  box-shadow: 5px 5px 5px 5px;
}
</style>