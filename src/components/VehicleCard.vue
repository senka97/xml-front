<template>
  <b-card no-body class="overflow-hidden custom-width mb-3">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="vehicle.image" alt="Image" class="rounded-0 mt-2 ml-2 mb-2"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body :title="vehicle.brand + ' ' + vehicle.model">
          <b-card-text>
              <b-row>
                  <b-col col-3>
                       <b-icon icon="star-fill"></b-icon>
                        {{vehicle.rate}}
                  </b-col>
                  <b-col col-3>
                        <b>Price:</b> {{vehicle.price}} <b>€</b>
                    </b-col>
              </b-row>   
              <b-row class="mt-2">
                <b-col>
                  <b>Fuel type:</b> {{vehicle.fuelType}}
                </b-col>
                <b-col>
                  <b>Vehicle type:</b> {{vehicle.vehicletype}}
                </b-col>
              </b-row>       
              <b-row class="mt-2">
                  <b-col>
                    <b>Transmission:</b> {{vehicle.transmission}}
                  </b-col>
                  <b-col>
                    <b>Children seats:</b> {{vehicle.childrenSeats}}
                  </b-col>
              </b-row> 
              <b-row class="mt-2">
                  <b-col>
                    <b>Mileage:</b> {{vehicle.mileage}} <b>km</b>
                  </b-col>
                  <b-col>
                    <b>Km limit:</b> {{vehicle.kilometerLimit}}
                  </b-col>
              </b-row>     
              <b-row class="mt-2">
                  <b-col>
                      <b>Collision Damage Waiver:</b> Yes
                  </b-col>
              </b-row>     
          </b-card-text>       
        </b-card-body>
        <b-row>
          <!--Dugme "Add to {korpica}" ce se prikazivati samo ako je korisnik ulogovan-->
          <b-button v-show="showDiffButtons" type="button" class="ml-auto mr-2 mt-3"> <a class="removeDecoration" href="/cart">Add to <b-icon icon="bucket-fill"></b-icon></a></b-button>
          <b-button v-show="showDiffButtons" type="button" class="mr-4 mt-3"><a class="removeDecoration" href="/vehicle/details">Details</a></b-button>
        </b-row> 
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
    name: 'VehicleCard',
    props: {
        vehicle: {},
        showDiffButtons: Boolean,
    },
    data() {
        return {
          show: false,
        }
    },
    methods: {
      
    }

}
</script>

<style scoped>

.custom-width {
    width: 75%;
}

.removeDecoration {
    text-decoration: none;
    color: #fff;
}

</style>