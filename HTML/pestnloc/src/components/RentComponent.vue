<template>

  <div>
    <h2>Car to rent</h2>
    <table>
      <thead>
      <tr class ="info">
        <th>Brand</th>
        <th>Model</th>
        <th>Agence</th>
        <th>Rent</th>
      </tr>
      </thead>
      <tbody>
      <tr class ="info" v-for="car in cars" >
        <td>{{ car.Brand }}</td>
        <td>{{ car.Model }}</td>
        <td>{{ car.agencyname }}</td>
        <td>
          <button class ="but" type="submit" @click="louerVoiture(car.License_Plate)">Louer</button>
        </td>
      </tr>
      </tbody>
    </table>

    <div class="modal" v-if="showModal">
      <button class ="close" @click="CloseModal">X</button>


      <h1 class = "title-modal">{{modal_car_model}}</h1>

      <div class="car-mod">
        <p class ="mod-inf-car">License Plate : {{modal_car_plate}} </p>
        <p class ="mod-inf-car">Brand : {{modal_car_brand}}</p>
        <p class ="mod-inf-car">Model : {{modal_car_model}}</p>
        <p class ="mod-inf-car">Type: {{modal_car_type}}</p>
        <p class ="mod-inf-car">Fuel state : {{modal_car_fuel}}</p>
        <p class ="mod-inf-car">Car power : {{modal_car_power}}</p>
        <img class="imcar" :src="this.showCarImage"/>


      </div>
      <button class ="but" type="submit" @click="redirigerVersContratForm(this.cars)" >Lou</button>

    </div>

  </div>
</template>

<script>


import router from "../router"



  import { ref, onMounted } from "vue";
import {th} from "vuetify/locale";

export default {

  components:{

  },
  data() {
    return {
      cars: ref([]),
      agence: ref([]),
      showModal: false,
      carid : ref([]),
      modal_car_plate : ref(""),
      modal_car_model : ref(""),
      modal_car_fuel : ref(""),
      modal_car_brand : ref(""),
      modal_car_power : ref(""),
      modal_car_type : ref(""),
      modal_car_agency : ref(""),
      showCarImage : ref('')
    };
  },
  async beforeMount() {
    try {
      const response = await fetch("http://localhost:9000/pestnloc/cars");
      const response2 = await fetch("http://localhost:9000/pestnloc/agencies");
      const data = await response.json();
      const data2 = await response2.json();
      this.cars = data;
      this.agence = data2;

      console.log(this.cars);

      this.cars.forEach((car) => {
        const matchingAgency = this.agence.find(
            (agency) => car.Id_Agency === agency.Id_Agency
        );

        if (matchingAgency) {
          car.agencyname = matchingAgency.Agency_Name;
        }
      });

      console.log(this.cars);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },
  methods: {
    louerVoiture(carId) {
      console.log("Car louée avec ID:", carId);
      this.showModal = true;
      for (let i=0;i<this.cars.length;i++){
        if (this.cars[i].License_Plate === carId){
          this.carid = this.cars[i]
          break
        }
      }

      this.modal_car_plate = this.carid.License_Plate;
      this.modal_car_model = this.carid.Model;
      this.modal_car_fuel = this.carid.Fuel_State;
      this.modal_car_brand = this.carid.Brand;
      this.modal_car_power = this.carid.Car_Power;
      this.modal_car_agency = this.carid.agencyname;
      this.modal_car_type = this.carid.Car_Type;

      this.showCarImage = `/src/components/RentDirectory/${this.modal_car_brand}_${this.modal_car_model}.jpg`;




    },
    async redirigerVersContratForm(cars) {
      await router.push({
        name: 'ContractFromComponent', // Nom de la route spécifié ici
        params: { cars },
      });
    },



    CloseModal(){
      this.showModal = false;
    }
  },
};
</script>

<style scoped>
@import "Css/Rent.css";


</style>
