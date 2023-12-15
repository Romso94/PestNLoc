<template>
  <div class="main-wrapper">
  <div class="wrapper">
    <h1 class ="h1">Agency List</h1>
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
  </div>
  <div class="second-section">
    <div>
      <h2 class="title-second">Explore Our Agencies</h2>
      <p class="text-block">
        Discover all our car rental agencies on this page
        <br>
        Get ready to embark on a seamless journey with PestnLoc
        <br>
        Find the information you need, including contact numbers,
        to connect with any of our agencies
        <br>
        Your <strong>next</strong> adventure starts <strong>HERE</strong>
      </p>
    </div>
    <div>
      <img class="img-agency" src="./assets/agency_img.jpg" />
    </div>
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
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },

  methods: {},
};
</script>


<style scoped>

.second-section {
  display: flex;
  margin-top: 40px;
  margin-bottom: 40px;
  justify-content: space-evenly;
  align-items: center;
}

.img-agency {
  height: 30%;
  width: 500px;
  border-radius: 10px;
}

.title-second{
  font-size: 26px;
  margin-top: -70px;
  margin-bottom: 20px;
  color: #45474b;
}

.text-block {
  max-width: 600px;
  font-size: 18px;
  margin-top: 30px;
  color: #45474b;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 70%;
}

.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4ce14;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f5f7f8;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.h1 {
  margin-bottom: 20px;
  font-weight: bold;
  color: #45474b;
  font-size: 24px;
}
</style>
