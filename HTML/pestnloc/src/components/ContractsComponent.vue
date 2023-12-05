
<template>
  <div class="topMain">

  <div id="app">
    <div class ="AddNameLogout">
        <button @click="ajouterContrat" class="ml-auto">Ajouter un contrat</button>
        <div class="Name">Welcome Name Surname</div>
      <button @click="logout" color="primary" class="ml-auto">Logout</button>
    </div>
    <h2>Contrat actuel :</h2>
  </div>
  </div>

    <div>
      <!-- Affiche le contrat existant s'il y en a un -->
      <p>{{ contrat }}</p>
    </div>


</template>

<script setup>
import jsonData from '@/Json/car.json';
const items = jsonData;

const logout = () => {
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  window.location.href = '/login';
};


</script>

<style scoped>
@import  "Css/Contract.css";

</style>
