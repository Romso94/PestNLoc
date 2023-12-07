<template>
  <div>
    <v-data-table :items="agencies"/>
    <section>
      <table>

        <thead>

          <th class ="top">Agence</th>
          <th class ="top">Adresse</th>
          <th class ="top">Téléphone</th>
          <th class ="top">Email</th>


        </thead>
        <tbody>
        <tr v-for="agency in agencies" :key="agency.Agency_Name">
          <td>{{ agency.Agency_Name }}</td>
          <td>{{ agency.Address }}</td>
          <td>{{ agency.Phone_Number }}</td>
          <td>{{ agency.Email }}</td>

        </tr>
        </tbody>
      </table>
    </section>


  </div>
</template>

<script >
export default {
  data() {
    return{

    }
  },

  methods : {},
}
</script>

<style scoped>
.topMain {
  background: var(--pestnlocColor);
  height: 250px;
  width: 100%;
  margin-top: 50px;
}
.top{
  color:#F4CE14;
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
