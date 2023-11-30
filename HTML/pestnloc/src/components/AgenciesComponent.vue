<template>
  <div>
<<<<<<< HEAD
    <section>
      <table>

        <thead>

          <th>Agence</th>
          <th>Adresse</th>
          <th>Téléphone</th>
          <th>Email</th>
          <th>Mot de passe</th>

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
=======
    <v-data-table :items="agencies"></v-data-table>
>>>>>>> 3afcd8bf5db64857ef3e9fdb69707e77a7fb30fd
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
