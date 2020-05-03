<template>
  <div class="sub-work-div">
            <div class="col-xs-1 text-center">
            <b-button class="btn-types" @click="showCarBrand()">Car brand</b-button>
            <b-button class="btn-types" @click="showCarModel()">Car model</b-button>
            <b-button class="btn-types" @click="showCarType()">Car type</b-button>
            <b-button class="btn-types" @click="showFuelType()">Fuel type</b-button>
            <b-button class="btn-types" @click="showTransmissionType()">Transmission type</b-button>
            </div>
            <b-container v-if="showCarBrandB" style="margin-top:2em;width:90%;">
                     <b-form class="form-style" @submit.prevent="addCarBrand()">
                     <b-form-group label="Car brand:" label-for="carBrandID">
                       <b-input id="carBrandID" v-model="carBrand" type="text" required placeholder="Enter a new car brand"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                  <b-table class="table-style" id="table-carBrands" striped hover bordered borderless :items="itemsCarBrands" :fields="fields_types">
                     <template v-slot:cell(edit)="row">
                       <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'carBrand')">Edit</b-button>
                     </template>
                     <template v-slot:cell(remove)="row">
                       <b-button size="sm" variant="outline-danger" @click="removeCarBrand(row.item.id)">Remove</b-button>
                     </template>
                  </b-table>
            </b-container>
            <b-container v-if="showCarModelB" style="margin-top:2em;width:90%;">
                     <b-form class="form-style" @submit.prevent="addCarModel()">
                     <b-form-group label="Car brand:" label-for="carBrand-modelID">
                        <b-form-select size="sm" text="Car brand" v-model="carBrandChosen" :options="allCarBrands" required>
                           <template v-slot:first>
                             <b-form-select-option :value="null">Select car brand</b-form-select-option>
                           </template>
                        </b-form-select>                     
                    </b-form-group>    
                     <b-form-group label="Car model:" label-for="carModelID">
                       <b-input id="carModelID" v-model="carModel" type="text" required placeholder="Enter a new car model"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                  <b-table class="table-style" id="table-carModels" striped hover bordered borderless :items="itemsCarModels" :fields="fields_types">
                     <template v-slot:cell(edit)="row">
                       <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'carModel')">Edit</b-button>
                     </template>
                     <template v-slot:cell(remove)="row">
                       <b-button size="sm" variant="outline-danger" @click="removeCarModel(row.item.id)">Remove</b-button>
                     </template>
                  </b-table>
            </b-container>
            <b-container v-if="showCarTypeB" style="margin-top:2em;width:90%;">
                     <b-form class="form-style" @submit.prevent="addCarType()">
                     <b-form-group label="Car type:" label-for="carTypeID">
                       <b-input id="carTypeID" v-model="carType" type="text" required placeholder="Enter a new car type"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                  <b-table class="table-style" id="table-carTypes" striped hover bordered borderless :items="itemsCarTypes" :fields="fields_types">
                     <template v-slot:cell(edit)="row">
                       <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'carType')">Edit</b-button>
                     </template>
                     <template v-slot:cell(remove)="row">
                       <b-button size="sm" variant="outline-danger" @click="removeCarType(row.item.id)">Remove</b-button>
                     </template>
                  </b-table>
            </b-container>
            <b-container v-if="showFuelTypeB" style="margin-top:2em;width:90%;">
                     <b-form class="form-style" @submit.prevent="addFuelType()">
                     <b-form-group label="Fuel type:" label-for="fuelTypeID">
                       <b-input id="fuelTypeID" v-model="fuelType" type="text" required placeholder="Enter a new fuel type"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                  <b-table class="table-style" id="table-fuelTypes" striped hover bordered borderless :items="itemsFuelTypes" :fields="fields_types">
                     <template v-slot:cell(edit)="row">
                       <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'fuelType')">Edit</b-button>
                     </template>
                     <template v-slot:cell(remove)="row">
                       <b-button size="sm" variant="outline-danger" @click="removeFuelType(row.item.id)">Remove</b-button>
                     </template>
                  </b-table>
            </b-container>
            <b-container v-if="showTransmissionTypeB" style="margin-top:2em;width:90%;">
                     <b-form class="form-style" @submit.prevent="addTransmissionType()">
                     <b-form-group label="Transmission type:" label-for="transmissionTypeID">
                       <b-input id="transmissionTypeID" v-model="transmissionType" type="text" required placeholder="Enter a new transmission type"></b-input>
                     </b-form-group>
                      <b-button variant="success" type="submit">Add</b-button>
                     </b-form>
                  <b-table class="table-style" id="table-transminssionTypes" striped hover bordered borderless :items="itemsTransmissionTypes" :fields="fields_types">
                     <template v-slot:cell(edit)="row">
                       <b-button size="sm" variant="outline-primary" @click="editName(row.item, 'transmissionType')">Edit</b-button>
                     </template>
                     <template v-slot:cell(remove)="row">
                       <b-button size="sm" variant="outline-danger" @click="removeTransmissionType(row.item.id)">Remove</b-button>
                     </template>
                  </b-table>
            </b-container>
            <b-modal id="modal-edit" ref="modal-edit" centered title="Name update" :header-bg-variant="headerBgVariant" @ok="changeName()">
                     <b-form-group label="Change name:" label-for="changeNameID">
                       <b-input id="changeNameID" v-model.trim="changedName" type="text" required placeholder="Enter a new name"></b-input>
                     </b-form-group>
            </b-modal>
          </div>
</template>

<script>
export default {
    name: 'codebookManagement',
     data() {
        return {
          carModel: "",
          carBrand: "",
          carType: "",
          fuelType: "",
          transmissionType: "",
          fields_types: [
            "name",
            "edit",
            "remove"
          ],
          showCarBrandB: false,
          showCarModelB: false,
          showCarTypeB: false,
          showFuelTypeB: false,
          showTransmissionTypeB: false,
          itemsCarBrands: [{"id":"1", "name": "BMW"}, {"id":"2","name":"Volkswagen"}],
          itemsCarModels: [],
          itemsCarTypes: [{"id":"1", "name": "SUV"}, {"id":"2","name":"Cabriolet"}],
          itemsFuelTypes: [{"id":"1", "name": "Diesel"}, {"id":"2","name":"Petrol"}],
          itemsTransmissionTypes: [{"id":"1", "name": "Automatic"}, {"id":"2","name":"Manual gearbox"}],
          carBrandChosen: null,
          allCarBrands: [],
          headerBgVariant: 'dark',
          originalName: "",
          changedName: "",
          currentlyChangingType: "", //carBrand, carModel, carType, fuelType, transmissionType
          currentlyChangingID: ""

        }
     },
     methods:{
        showCarBrand(){
          //posalje se zahtev za svim brendovima
          this.showCarBrandB = true;
          this.showCarModelB = false;
          this.showCarTypeB = false;
          this.showFuelTypeB = false;
          this.showTransmissionTypeB = false;

        },
        showCarModel(){
          //posalje se zahtev za svim brendovima
          this.allCarBrands = [{"value":"1", "text":"BMW"}, {"value":"2", "text":"Volkswagen"}, {"value":"3", "text":"Tesla"}];  
          this.showCarBrandB = false;
          this.showCarModelB = true;
          this.showCarTypeB = false;
          this.showFuelTypeB = false;
          this.showTransmissionTypeB = false;
        },
        showCarType(){
          //posalje se zahtev za svim tipovima
          this.showCarBrandB = false;
          this.showCarModelB = false;
          this.showCarTypeB = true;
          this.showFuelTypeB = false;
          this.showTransmissionTypeB = false;

        },
        showFuelType(){
          //posalje se zahtev za svim tipovima goriva  
          this.showCarBrandB = false;
          this.showCarModelB = false;
          this.showCarTypeB = false;
          this.showFuelTypeB = true;
          this.showTransmissionTypeB = false;

        },
        showTransmissionType(){
          //posalje se zahtev za svim tipovima menjaca
          this.showCarBrandB = false;
          this.showCarModelB = false;
          this.showCarTypeB = false;
          this.showFuelTypeB = false;
          this.showTransmissionTypeB = true;

        },
        addCarBrand(){
             //posalje se zahtev za dodavanje
             this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New car brand successfully added!',
                type: 'success'
            });
            this.carBrand = "";
            //posalje se zahtev za prikaz svih
        },
        addCarModel(){
          //posalje se zahtev
          //osvezi se lista modela za brend sa id carBrandChosen
           this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New car model successfully added!',
                type: 'success'
            });
            this.carModel = "";
        },
        addCarType(){
          //posalje se zahtev
          this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New car type successfully added!',
                type: 'success'
            });
            this.carType = "";
            //osvezi se prikaz svih
        },
        addFuelType(){
          //posalje se zahtev
          this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New fuel type successfully added!',
                type: 'success'
            });
            this.fuelType = "";
            //osvezi se prikaz svih
        },
        addTransmissionType(){
          //posalje se zahtev
          this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'New transmission type successfully added!',
                type: 'success'
            });
            this.transmissionType = "";
            //osvezi se prikaz svih
        },
        removeCarBrand(id){
            //posalje se zahtev za brisanje
            //ozvezi se prikaz svih
            console.log(id);
            this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'Car brand successfully removed!',
                type: 'success'
            });
        },
        removeCarModel(id){
            //posalje se zahtev za brisanje
            //ozvezi se prikaz svih modela za brend sa id carBrandChosen
            console.log(id);
            this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'Car model successfully removed!',
                type: 'success'
            });
        },
        removeCarType(id){
            //posalje se zahtev za brisanje
            //ozvezi se prikaz svih
            console.log(id);
            this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'Car type successfully removed!',
                type: 'success'
            });
        },
        removeFuelType(id){
            //posalje se zahtev za brisanje
            //ozvezi se prikaz svih
            console.log(id);
            this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'Fuel type successfully removed!',
                type: 'success'
            });
        },
        removeTransmissionType(id){
            //posalje se zahtev za brisanje
            //ozvezi se prikaz svih
            console.log(id);
            this.$notify({
                group: 'mainHolder',
                title: 'Success',
                text: 'Transmission type successfully removed!',
                type: 'success'
            });
        },
        editName(item, type){
    
            this.currentlyChangingType = type;
            this.currentlyChangingID = item.id;
            this.originalName = item.name;
            this.changedName = item.name;
            this.$refs["modal-edit"].show();

        },
        changeName(){
            if(this.changedName == ""){
                this.$notify({
                group: 'mainHolder',
                title: 'Error',
                text: "Name is mandatory.",
                type: 'error'
            });
            return;
            }
            if(this.originalName != this.changedName){
                if(this.currentlyChangingType == "carBrand"){
                    alert("promenio se brend");
                    //posalji zahtev za izmenu brenda
                    console.log(this.currentlyChangingID);
                    console.log(this.changedName);
                    //ponovo osvezi listu brendova
                }
                if(this.currentlyChangingType == "carModel"){
                    alert("promenio se model");
                    //posalji zahtev za izmenu modela
                    console.log(this.currentlyChangingID);
                    console.log(this.changedName);
                    //ponovo osvezi listu modela za brandChosenID
                }
                if(this.currentlyChangingType == "carType"){
                    alert("promenio se tip");
                    //posalji zahtev za izmenu tipa
                    console.log(this.currentlyChangingID);
                    console.log(this.changedName);
                    //ponovo osvezi listu tipova
                }
                if(this.currentlyChangingType == "fuelType"){
                    alert("promenio se tip goriva");
                    //posalji zahtev za izmenu tipa goriva
                    console.log(this.currentlyChangingID);
                    console.log(this.changedName);
                    //ponovo osvezi listu tipova goriva
                }
                if(this.currentlyChangingType == "transmissionType"){
                    alert("promenio se tip menjaca");
                    //posalji zahtev za izmenu tipa menjaca
                    console.log(this.currentlyChangingID);
                    console.log(this.changedName);
                    //ponovo osvezi listu tipova menjaca
                }

            }
        }
     },
     watch: {
         carBrandChosen: function(newValue){
             //posalje se zahtev za svim modelima brenda sa id newValue
             console.log(newValue);
             this.itemsCarModels = [{"id":"1", "name": "R8"}, {"id":"2","name":"Golf 4"}];
         }
     }

}
</script>

<style scoped>
   .sub-work-div{
    width: 100%;
    padding-top:1em;
  }

  .form-style{
      width:60%;
      margin-left:auto;
      margin-right:auto;

  }

  .table-style{
      width:70%;
      margin-left:auto;
      margin-right:auto;
      margin-top:1em;

  }
</style>