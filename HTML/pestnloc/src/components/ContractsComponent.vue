<template>
  <div class="topMain">
    <div id="app">
      <div v-if="contrat">
        <!-- Affiche le contrat existant s'il y en a un -->
        <h2>Contrat actuel :</h2>
        <p>{{ contrat }}</p>
      </div>
      <div v-else>
        <!-- Affiche le bouton pour afficher le formulaire -->
        <button @click="toggleForm">Ajouter un contrat</button>


        <!-- Affiche le formulaire de contrat s'il n'y a pas de contrat existant -->
        <ContractForm v-if="showForm" @contratAjoute="contratAjoute" />
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import ContractForm from "./ContractFormComponent.vue";

const contrat = ref(null);
const showForm = ref(false);





import jsonData from '@/Json/car.json';
const items = jsonData;

const logout = () => {
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  window.location.href = '/login';
};

const contratAjoute = (nouveauContrat) => {
  contrat.value = nouveauContrat;
  showForm.value = false; // Masquer le formulaire après l'ajout du contrat
};

const toggleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<style scoped>
@import "Css/Contract.css";
p {
  display: flex;
  align-items: center;
  justify-content: center;
}

.topMain {
  background: var(--pestnlocColor);
  height: 250px;
  width: 100%;
  margin-top: 50px;
}
</style>



