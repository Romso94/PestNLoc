<!-- Rent.vue -->
<template>
  <div>
    <h2>Car to rent</h2>
    <table>
      <thead>
      <tr class="info">
        <th>Brand</th>
        <th>Model</th>
        <th>Agence</th>
        <th>Rent</th>
      </tr>
      </thead>
      <tbody>
      <tr class="info" v-for="car in cars" :key="car.id">
        <td>{{ car.Brand }}</td>
        <td>{{ car.Model }}</td>
        <td>{{ car.agencyname }}</td>
        <td>
          <button class="but" type="submit" @click="openRentForm(car.id)">Louer</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Intégration conditionnelle de la modal RentFormComponent -->
    <RentFormComponent v-if="showModal" />
  </div>
</template>

<script>
import RentFormComponent from "@/components/RentFormComponent.vue";

import { ref } from 'vue';

export default {
  data() {
    return {
      cars: [],
      agence: [],
      showModal: false, // Variable d'état pour la visibilité de la modal
    };
  },
  async beforeMount() {
    // ... Votre code pour récupérer les données
  },
  methods: {
    openRentForm(carId) {
      console.log("Car louée avec ID:", carId);
      this.showModal = true;
    },
  },
};
</script>

<style scoped>
@import "Css/Rent.css";
</style>
