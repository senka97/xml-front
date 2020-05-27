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
          <h3 class="mb-0 text-center">{{vehicle.car.carBrand + ' ' + vehicle.car.carModel}}</h3>
        </template>
        <b-card-text>
          <b-row >
            <b-col class="col-12">
                  <b> Available from: </b> {{format_date(vehicle.startDate)}} <b> to </b> {{format_date(vehicle.endDate)}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col col-3>
              <b-icon icon="star-fill"></b-icon>
              {{vehicle.car.rate}}
            </b-col>
            <b-col col-3>
              <b>Location:</b>
              {{vehicle.location}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col col-3>
              <b> Price per Day:</b>
              {{vehicle.priceList.pricePerDay}} <b>€</b>
            </b-col>
            <b-col col-3>
              <b>Price per Km:</b>
              {{vehicle.priceList.pricePerKm}} <b>€</b>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col col-3>
              <b> Discount over 20 Days:</b>
              {{vehicle.priceList.discount20Days}} <b>%</b>
            </b-col>
            <b-col col-3>
              <b>Discount over 30 Days:</b>
              {{vehicle.priceList.discount30Days}} <b>%</b>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Vehicle type:</b>
              {{vehicle.car.carClass}}
            </b-col>
            <b-col>
              <b>Fuel type:</b>
              {{vehicle.car.fuelType}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Transmission:</b>
              {{vehicle.car.transType}}
            </b-col>
            <b-col>
              <b>Children seats:</b>
              {{vehicle.car.childrenSeats}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Mileage:</b>
              {{vehicle.car.mileage}}
              <b>km</b>
            </b-col>
            <b-col>
              <b>Km limit:</b>
              {{vehicle.car.limitKm}}
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <b>Collision Damage Waiver:</b> {{ vehicle.cdw == true ? 'Yes' : 'No' }}
            </b-col>
            <b-col>
              <b>Android app present:</b> {{ vehicle.car.hasAndroidApp == true ? 'Yes' : 'No' }}
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
          <b-form-textarea id="textarea" placeholder="Enter comment..." rows="3" no-resize v-model="textarea"></b-form-textarea>
          <b-row class="mt-2">
            <b-col class="col-2">
              <b-btn class="buttons">Add comment</b-btn>
            </b-col>
            <b-col>
              <b-btn class="buttons" @click="clear">Clear</b-btn>
            </b-col>          
          </b-row>
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
import axios from "axios";
import moment from 'moment'

export default {
  name: "VehicleDetails",
  components: {
    NavBar
  },
  data() {
    return {
      vehicle: {},
      images: [
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg",
        "https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914",
        "https://stimg.cardekho.com/images/carexteriorimages/930x620/Audi/Audi-A8-2019/6722/1544785682176/front-left-side-47.jpg"
      ],
      currentImage: 0,
      comments: [
        {
          id: 1,
          comment:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, beatae? Lorem ipsum dolor sit, amet consectetur adipisicing elit.Unde id animi at hic reprehenderit praesentium aliquam vero quae! Sint, officiis!",
          name: "Pera",
          surname: "Peric"
        },
        {
          id: 2,
          comment:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, beatae? Lorem ipsum dolor sit, amet consectetur adipisicing elit.Unde id animi at hic reprehenderit praesentium aliquam vero quae! Sint, officiis!",
          name: "Djura",
          surname: "Djuric"
        },
        {
          id: 3,
          comment:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, beatae? Lorem ipsum dolor sit, amet consectetur adipisicing elit.Unde id animi at hic reprehenderit praesentium aliquam vero quae! Sint, officiis!",
          name: "Marko",
          surname: "Markovic"
        }
      ],
      textarea: '',
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
    },
    clear() {
      this.textarea = '';
    },

    format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
      },
  },
  created() {
        var id = this.$route.fullPath;
        id = id.split('?')[1];
        id = id.split('=')[1];
  
        
        axios.get("https://localhost:8083/ad-service/api/ads/"+id).then(
            response=> {
                this.vehicle = response.data;
                
                var x = new Date(this.item.endDate[0], this.item.endDate[1]-1, this.item.endDate[2]);
                var maxD = new Date(x);
                this.maxDate = maxD;

                var y = new Date(this.item.startDate[0], this.item.startDate[1]-1, this.item.startDate[2]);
                var minD = new Date(y);
                this.minDate = minD;

                     
            }
        );
                
    },
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

.buttons {
  width: 130px;
}
</style>