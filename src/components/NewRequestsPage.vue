<template>
  <div>
    <NavBar/>
      <div v-if="showEmpty">
        <h1 class="empty">Your don't have new requests</h1>
      </div>

      <div v-if="!showEmpty" class="container mt-2">
        <div class="custom-width" v-for="req in newRequests" :key="req.id">
          <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="secondary" header-text-variant="white"  > <!-- Velika kartica za bundle -->
            <template v-slot:header>
                <h3 class="mb-0 text-center">{{req.clientName + ' ' + req.clientLastname}}</h3>
            </template>
            <div class="mt-2" v-for="reqAd in req.requestAds" :key="reqAd.id">
              <b-card no-body class="overflow-hidden shadow custom-width" header-bg-variant="info" header-text-variant="white" >
                  <template v-slot:header>
                    <h3 class="mb-0 text-center">{{reqAd.ad.car.carBrand + ' ' + reqAd.ad.car.carModel}}</h3>
                  </template>
                  <b-row>
                    <b-col md="5">
                      <b-card-img :src="reqAd.ad.car.photos64[0]" width="415" height="277" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
                    </b-col> 
                    <b-col md="7">
                        <b-row class="mt-4">
                          <b-col>
                            <b> Start date of rent: </b> {{format_date(reqAd.startDate)}}
                          </b-col>
                          <b-col>
                            <b> End date of rent:</b> {{format_date(reqAd.endDate)}}
                          </b-col>
                        </b-row>
                       
                        <b-row class="mt-3">
                          <b-col>
                            <b> Price in total: </b> {{reqAd.payment}} <b>€</b>
                          </b-col>
                          <b-col>
                            <b> Price per km: </b> {{reqAd.currentPricePerKm}} <b>€</b>
                          </b-col>
                        </b-row>
                        <hr>
                        <b-row class="mt-2">
                          <b-col>
                            <b> Location </b> {{reqAd.ad.location}}
                          </b-col>
                          <b-col>
                            <b> Collision Damage Waiver:</b> {{ reqAd.ad.cdw == true ? 'Yes' : 'No' }}
                          </b-col>
                        </b-row>    
                        <b-row class="mt-2">
                          <b-col>
                            <b> Ad start date: </b> {{format_date(reqAd.ad.startDate)}}
                          </b-col>
                          <b-col>
                            <b> Ad end date:</b> {{format_date(reqAd.ad.endDate)}}
                          </b-col>
                        </b-row>  
                        <hr>
                        <b-row class="mt-2">
                          <b-col col-3>
                            <b> Rate: </b>
                             {{reqAd.ad.car.rate}}  <b-icon icon="star-fill"></b-icon>                   
                          </b-col>
                          <b-col col-3>
                            <b> Children seats: </b> {{reqAd.ad.car.childrenSeats}}
                          </b-col>
                        </b-row>   
                        <b-row class="mt-2 mb-4">
                          <b-col>
                            <b> Mileage:</b> {{reqAd.ad.car.mileage}} <b>km</b>
                          </b-col>
                          <b-col>
                            <b> Km limit:</b> {{reqAd.ad.car.limitKm == 0 ? 'UNLIMITED' : reqAd.ad.car.limitKm + ' km' }}
                          </b-col>
                        </b-row>  
                    </b-col>    
                  </b-row>                
              </b-card>
            </div>
            <b-row>
                <b-button  type="button" class="ml-auto mr-2 mt-3 mb-3 buttons" variant="danger" @click="reject(req.id)"> Reject </b-button>
                <b-button  type="button" class="mr-4 mt-3 mb-3 buttons" variant="info" @click="reject(req.id)">Accept</b-button>
            </b-row> 
          </b-card>
        </div>
      </div>
    
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
//import axios from "axios";
import moment from 'moment'

export default {
  components: {
    NavBar
  },

  data() {
      return{
        showEmpty: false,
        newRequests: [
            {
              id: 1,
              clientId: 3,
              clientName: "Petar",
              clientLastname: "Petrovic",
              ownerId: 2,
               requestAds: [
                {
                 id: 1,
                 startDate: '2020-05-31',
                 endDate: '2020-06-30',
                 payment: '250',
                 currentPricePerKm: 2,
                 ad: {
                     startDate: '2020-04-30', 
                     endDate: '2020-06-30',
                     location: 'Novi Sad',
                     cdw: true,
                     car:{
                        photos64:  ["https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914"],
                        carBrand: "Audi",
                        carModel: "A8",
                        mileage: 15000,
                        limitKm: 0,
                        childrenSeats: 0,                       
                        rate: 4.5
                     },               
                 }
               },
               { 
                id: 2,
                startDate: '2020-05-31',
                 endDate: '2020-06-30',
                 payment: '250',
                 currentPricePerKm: 2,
                 ad: {
                     startDate: '2020-04-30', 
                     endDate: '2020-06-30',
                     location: 'Novi Sad',
                     cdw: true,
                     car:{
                        photos64:  ["https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914"],
                        carBrand: "Audi",
                        carModel: "A8",
                        mileage: 15000,
                        limitKm: "Unlimited",
                        childrenSeats: 0,                       
                        rate: 4.5
                     },            
                 }
               }
               ] 
            },
            {
              id: 2,
              clientId: 4,
              clientName: "Marko",
              clientLastname: "Markovic",
              ownerId: 2,
                requestAds: [ {
                 id: 3,
                 startDate: '2020-05-31',
                 endDate: '2020-06-30',
                 payment: '250',
                 currentPricePerKm: 2,
                 ad: {
                     startDate: '2020-04-30', 
                     endDate: '2020-06-30',
                     location: 'Novi Sad',
                     cdw: true,
                     car:{
                        photos64:  ["https://audimediacenter-a.akamaihd.net/system/production/media/49930/images/28318372b7f78fa640c07e629929a92fffb90804/A178321_x500.jpg?1582358914"],
                        carBrand: "Audi",
                        carModel: "A8",
                        mileage: 15000,
                        limitKm: "Unlimited",
                        childrenSeats: 0,                       
                        rate: 4.5
                     },               
                 }
               },             
               ] 
            }

        ],
      }
  },
  methods:
  {
      format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
      },

      accept(id)
      {
          alert(id);
      },

      reject(id)
      {
          alert(id);
      }
  },

  created(){

     /* axios.get("https://localhost:8083/rent-service/api/request/pending").then(
            response=> {
                this.newRequests = response.data;  
                if(this.newRequests.length == 0)
                {
                    this.showEmpty = true;
                }                  
            } 
        ).catch(error => {
            alert(error.response);
        });  */
    }

  
}
</script>

<style scoped>

.empty {
  text-align: center;
  color: red;
  margin-top:1em;
}
.custom-width {
  width: 95%;
  margin: auto;
}
.buttons {
  width: 110px;
}

</style>