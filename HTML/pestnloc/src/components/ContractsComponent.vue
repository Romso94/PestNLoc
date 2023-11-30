
<template>
  <div class="topMain">

  <div id="app">
    <div v-if="contrat">
      <!-- Affiche le contrat existant s'il y en a un -->
      <h2>Contrat actuel :</h2>
      <p>{{ contrat }}</p>
    </div>
    <div v-else>
      <!-- Affiche un bouton pour ajouter un contrat si aucun contrat n'existe -->
      <button @click="ajouterContrat">Ajouter un contrat</button>
    </div>
  </div>
  </div>

</template>

<script setup>



</script>

<style scoped>

  p{
  display: flex;
  align-items: center;
  justify-content: center;
}

  .topMain{
  background: var(--pestnlocColor);
  height: 250px;
  width: 100%;
  margin-top: 50px;
}

</style>
