<template>
  <div>
    <h2 class ="h2">Agency List</h2>
    <table>
      <thead>
      <tr>
        <th>Agency Name</th>
        <th>Adress</th>
        <th>Phone Number</th>

      </tr>
      </thead>
      <tbody>
      <tr v-for="age in agence" >
        <td>{{ age.Agency_Name }}</td>
        <td>{{ age.Address }}</td>
        <td>{{ age.Phone_Number }}</td>

      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { ref } from "vue";

export default {
  data() {
    return {
      agence: ref([]),
    };
  },
  async beforeMount() {
    try {
      const response2 = await fetch("http://localhost:9000/pestnloc/agencies");
      const data2 = await response2.json();
      this.agence = data2;
      console.log(this.agence);
    } catch (error) {

      console.error("Erreur lors de la récupération des données:", error);
    }
  },

  methods: {},
};
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
