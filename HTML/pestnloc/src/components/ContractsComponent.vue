<template>
  <div class="topMain">
    <div id="app">
      <div>
  <div id="app">
    <div class ="AddNameLogout">

        <div class="NameandSurname">Welcome {{Name}} {{ Surname }}</div>
      <button @click="logout" color="primary" class="Buttoncontract">Logout</button>
    </div>
    <div class ="AddNameLogout">
      <div>You don't have any contracts</div>
    </div>
    <div class ="AddNameLogout">
    <button @click="ajouterContrat" class="Buttoncontract Buttoncontract2">Ajouter un contrat</button>
      </div>
    <h2>Contrat actuel :</h2>
  </div>
  </div>

    <div>
      <!-- Affiche le contrat existant s'il y en a un -->
      <p>{{ contrat }}</p>
    </div>
    </div>
  </div>
</template>

<script setup>
import jsonData from '@/Json/car.json';
const items = jsonData;
const Name = "Florian";
const Surname = "Poscente"

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

@import  "Css/Contract.css";

</style>

