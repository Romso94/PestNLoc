<script>
export default {
  data() {
    return {
      carData: null, // Variable pour stocker les données de la voiture
    };
  },
  mounted() {
    // Accéder aux paramètres de la route
    this.carData = this.$route.params.carData;
    console.log("Données de la voiture dans newcontract :", this.carData);
  },
  methods: {},
};
</script>

<template>
  <div>
    <h2>Nouveau Contrat</h2>
    <form @submit.prevent="submitForm" class="form-square">
      <div class="form-group">
        <label for="contractAvailability">Disponibilité du contrat:</label>
        <input v-model="contractAvailability" type="text" id="contractAvailability" required>
      </div>

      <div class="form-group">
        <label for="startDate">Date de début:</label>
        <input v-model="startDate" type="date" id="startDate" required>
      </div>

      <div class="form-group">
        <label for="price">Prix:</label>
        <input v-model="price" type="number" id="price" required>
      </div>

      <div class="form-group">
        <label for="endDate">Date de fin:</label>
        <input v-model="endDate" type="date" id="endDate" required>
      </div>

      <div class="form-group">
        <label for="clientId">ID du client:</label>
        <input v-model="clientId" type="text" id="clientId" required>
      </div>

      <div class="form-group">
        <label for="licensePlate">Plaque d'immatriculation:</label>
        <input v-model="licensePlate" type="text" id="licensePlate" required>
      </div>

      <button type="submit">Soumettre</button>
    </form>
  </div>
</template>

<style scoped>
.form-square {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;

  border: 1px solid #ccc; /* Bordure grise */
  border-radius: 8px; /* Coins arrondis */

}

.form-group {
  margin-bottom: 15px;
}

button {
  background-color: #F4CE14;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

