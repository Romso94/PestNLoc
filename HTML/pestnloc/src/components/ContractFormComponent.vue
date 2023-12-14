<script>
export default {
  data() {
    return {
      clientId: null,
      // Variable pour stocker les données de la voiture
      numberOfDays:null,
      startDate:null,
      Car:null,

    };
  },
  mounted() {
    // Accéder aux paramètres de la route
    this.plate = this.$route.params.plate;
    console.log("Données de la voiture dans newcontract :", this.plate);
  },
  methods: {},
};
</script>

<template>
  <div>
    <h2>Nouveau Contrat</h2>
    <form @submit.prevent="submitForm" class="form-square">
      <div class="form-group">
        <label for="carr">Car : </label>
        <input class="champ" v-model="Car" type="text" id="Car" required>
      </div>

      <div class="form-group">
        <label for="startDate">Start date : </label>
        <input  v-model="startDate" type="date" id="startDate" required>
      </div>

      <div class="form-group">
        <label for="price">Price : </label>

      </div>

      <div class="form-group">
        <label for="numberOfDays">Number of days : </label>
        <select class="champ"  v-model="numberOfDays" id="numberOfDays" required>
          <option v-for="day in 30" :key="day" :value="day">{{ day }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="clientId">ID of client:</label>
        <input class="champ"  v-model="clientId" type="text" id="clientId" required>
      </div>



      <button type="submit">Submit</button>
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

  width: 100%;
  height: 80%;
  font-size: 20px;

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
.champ{
 background-color: #f0f4c3;
  font-size: 9px;
}

</style>

