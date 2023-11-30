<template>
  <div>
    <v-data-table :items="agencies"/>
  </div>
</template>

<script setup>
// Importer le fichier JSON
import jsonData from '@/Json/agencies.json';

// Définir les données
const agencies = jsonData;
</script>

<style scoped>
.topMain {
  background: var(--pestnlocColor);
  height: 250px;
  width: 100%;
  margin-top: 50px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
