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
      <tr class ="info" v-for="car in cars" :key="car.id">
        <td>{{ car.Brand }}</td>
        <td>{{ car.Model }}</td>
        <td>{{ car.agencyname }}</td>
        <td>
          <button class ="but" type="submit" @click="louerVoiture(car.id)">Louer</button>
        </td>
      </tr>
      </tbody>
    </table>
    <RentFormComponent v-if="showModal" />
  </div>
</template>

<script>

import RentFormComponent from "@/components/RentFormComponent.vue";



  import { ref, onMounted } from "vue";

export default {
  components:{
    RentFormComponent
  },
  data() {
    return {
      cars: ref([]),
      agence: ref([]),
      showModal: false,
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

      this.cars.forEach((car) => {
        const matchingAgency = this.agence.find(
            (agency) => car.Id_Agency === agency.Id_Agency
        );

        if (matchingAgency) {
          // Ajoutez une nouvelle propriété agencyname à l'objet car
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
    },
  },
};
</script>

<style scoped>
@import "Css/Rent.css";
</style>
