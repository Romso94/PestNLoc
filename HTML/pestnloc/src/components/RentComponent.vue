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


      {{carid}}

    </div>

  </div>
</template>

<script>

import RentFormComponent from "@/components/RentFormComponent.vue";



  import { ref, onMounted } from "vue";
import {th} from "vuetify/locale";

export default {
  components:{
    RentFormComponent
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
      modal_car_agency : ref("")
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
      this.modal_car_power

    },
  },
};
</script>

<style scoped>
@import "Css/Rent.css";

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  width: 50%;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1000000;
}
</style>
