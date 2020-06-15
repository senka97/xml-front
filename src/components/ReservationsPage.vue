<template>
    <div>
        <NavBar/>

        <div  v-if="loading" align="center">
            <br/>
            <br/>
            <b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner"></b-spinner>
        </div>

        <div class="mx-5 my-4" v-if="!loading">
        <b-tabs content-class="mt-3" >
            
          <b-tab title="Online reservations" active :title-link-class="linkClass()">
            <div v-if="showEmptyRequests">
                <h1 class="empty">You don't have any requests.</h1>
            </div>
            <div class="container">
              <div class="custom-width" v-for="req in paidRequests" :key="req.id">
                <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="secondary" header-text-variant="white"  > <!-- Velika kartica za bundle -->
                  <template v-slot:header>
                    <h3 class="mb-0 text-center">Client: {{req.clientName + ' ' + req.clientLastName}}</h3>
                  </template>
                  <div class="mt-2" v-for="reqAd in req.requestAds" :key="reqAd.id">
                    <b-card no-body class="overflow-hidden shadow custom-width" header-bg-variant="info" header-text-variant="white" >
                      <template v-slot:header>
                        <h3 class="mb-0 text-center">{{reqAd.ad.car.carBrand + ' ' + reqAd.ad.car.carModel}}</h3>
                      </template>
                      <b-row>
                        <b-col md="5">
                          <b-card-img :src="reqAd.ad.car.photo64" width="415" height="277" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
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
                                <b> Km limit:</b> {{reqAd.ad.limitKm == 0 ? 'UNLIMITED' : reqAd.ad.limitKm + ' km' }}
                             </b-col>
                          </b-row>  
                        </b-col>    
                      </b-row>                
                    </b-card>
                  </div>
                  <b-row>
                    <b-button  type="button" class="ml-auto mr-2 mt-3 mb-3 buttons" variant="info"> Report </b-button>
                    <b-button  type="button" class="mr-4 mt-3 mb-3 buttons" variant="secondary" @click="goToChat(req.id)">Chat</b-button>
                  </b-row> 
                </b-card>
              </div>
            </div>
          </b-tab>

          <b-tab title="My reservations" :title-link-class="linkClass()">
            <div v-if="showEmptyReservations">
                <h1 class="empty">You don't have any reservations.</h1>
            </div>
            
            <div class="container">
              <div class="custom-width" v-for="res in reservations" :key="res.id">
                <b-card no-body class="overflow-hidden custom-width mb-3 shadow" header-bg-variant="secondary" header-text-variant="white"  > <!-- Velika kartica za bundle -->
                  <template v-slot:header>
                    <h3 class="mb-0 text-center">Client: {{res.clientFirstName + ' ' + res.clientLastName}}</h3>
                  </template>
                  <div class="mt-2">
                    <b-card no-body class="overflow-hidden shadow custom-width" header-bg-variant="info" header-text-variant="white" >
                      <template v-slot:header>
                        <h3 class="mb-0 text-center">{{res.ad.car.carBrand + ' ' + res.ad.car.carModel}}</h3>
                      </template>
                      <b-row>
                        <b-col md="5">
                          <b-card-img :src="res.ad.car.photo64" width="415" height="320" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
                        </b-col> 
                        <b-col md="7">
                          <b-row class="mt-4">
                            <b-col>
                                <b> Start date of rent: </b> {{format_date(res.startDate)}}
                            </b-col>
                            <b-col>
                                <b> End date of rent:</b> {{format_date(res.endDate)}}
                            </b-col>
                          </b-row>
                       
                          <b-row class="mt-2">
                            <b-col>
                                <b> Price in total: </b> {{res.payment}} <b>€</b>
                            </b-col>
                            <b-col>
                                <b> Price per km: </b> {{res.currentPricePerKm}} <b>€</b>
                            </b-col>
                          </b-row>
                          <hr>
                          <b-row class="mt-2">
                            <b-col>
                                <b> {{res.clientFirstName}}'s email: </b> {{res.clientEmail}} 
                            </b-col>
                            <b-col>
                                <b> {{res.clientFirstName}}'s phone number: </b> {{res.clientPhoneNumber}} 
                            </b-col>
                          </b-row>
                          <hr>
                          <b-row class="mt-2">
                            <b-col>
                                <b> Location </b> {{res.ad.location}}
                            </b-col>
                            <b-col>
                                <b> Collision Damage Waiver:</b> {{ res.ad.cdw == true ? 'Yes' : 'No' }}
                            </b-col>
                          </b-row>    
                          <b-row class="mt-2">
                            <b-col>
                                <b> Ad start date: </b> {{format_date(res.ad.startDate)}}
                            </b-col>
                            <b-col>
                                <b> Ad end date:</b> {{format_date(res.ad.endDate)}}
                            </b-col>
                          </b-row>  
                          <hr>
                          <b-row class="mt-2">
                            <b-col col-3>
                                <b> Rate: </b>
                                {{res.ad.car.rate}}  <b-icon icon="star-fill"></b-icon>                   
                            </b-col>
                            <b-col col-3>
                                <b> Children seats: </b> {{res.ad.car.childrenSeats}}
                            </b-col>
                          </b-row>   
                          <b-row class="mt-2 mb-3">
                            <b-col>
                                <b> Mileage:</b> {{res.ad.car.mileage}} <b>km</b>
                            </b-col>
                            <b-col>
                                <b> Km limit:</b> {{res.ad.limitKm == 0 ? 'UNLIMITED' : res.ad.limitKm + ' km' }}
                             </b-col>
                          </b-row>  
                        </b-col>    
                      </b-row>                
                    </b-card>
                  </div>
                  <b-row>
                    <b-button  type="button" class="ml-auto mr-4 mt-3 mb-3 buttons" variant="info"> Report </b-button>
                  </b-row> 
                </b-card>
              </div>
            </div>
              
          </b-tab>

        </b-tabs>

      </div>
      
    </div>
</template>

<script>

import NavBar from "../components/NavBar.vue";
import axios from "axios";
import moment from 'moment'

export default {
    name: 'ReservationsPage',
    components: {
        NavBar
    },
    data(){
        return {
           loading: true,
           showEmptyRequests: false,
           showEmptyReservations: false,
           paidRequests: [],
           reservations: [],
        }
    },
     methods: {

      linkClass() {
        return ['bg-dark', 'text-light']
      },

      format_date(value){
         if (value) {
           return moment(String(value)).format("DD-MMM-YYYY")
          }
      },

      goToChat(id)
      {
          this.$router.push({ path: '/requests/'+ id +'/chat'});
      }
      
    },
    created()
    {    
      this.loading = true;
      axios.get("https://localhost:8083/rent-service/api/request/paid").then(
            response=> {
                this.paidRequests = response.data; 
            
                if(this.paidRequests.length == 0)
                {
                    this.showEmptyRequests = true;
                }        
                this.loading = false;          
            } 
        ).catch(error => {
            this.showEmptyRequests = true;
            console.log(error.response);
        });  

        axios.get("https://localhost:8083/rent-service/api/reservations").then(
            response=> {
                this.reservations = response.data; 

                if(this.reservations.length == 0)
                {
                    this.showEmptyReservations = true;
                }        
                this.loading = false;          
            } 
        ).catch(error => {
            this.showEmptyReservations = true;
            console.log(error.response);
        });  
    
    },
    
}
</script>

<style scoped>

.container{
    margin-left: auto;
    margin-right: auto;
}

.custom-width {
  width: 98%;
  margin: auto;
}
.buttons {
  width: 110px;
}

.empty {
  text-align: center;
  color: red;
  margin-top:1em;
}

</style>