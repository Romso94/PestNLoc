<template>
  <div>
    <section>
      <table>

        <thead>
        <tr>
          <td>Agence</td>
          <td>Adresse</td>
          <td>Téléphone</td>
          <td>Email</td>
          <td>Mot de passe</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="agency in agencies" :key="agency.Agency_Name">
          <td>{{ agency.Agency_Name }}</td>
          <td>{{ agency.Address }}</td>
          <td>{{ agency.Phone_Number }}</td>
          <td>{{ agency.Email }}</td>
          <td>{{ agency.Password }}</td>
        </tr>
        </tbody>
      </table>
    </section>
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
