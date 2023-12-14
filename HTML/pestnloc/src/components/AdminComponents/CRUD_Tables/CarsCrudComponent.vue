<template>
  <div class="main-wrapper">
    <div class="wrapper-cars" style="background-color: #45474B;">
      <h1 class="table-title">
        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-cars"/>
        Car to rent
      </h1>
      <table class="custom-table">
        <thead>
        <tr class="info">
          <th>License Plate</th>
          <th>Model</th>
          <th>Brand</th>
          <th>Fuel State</th>
          <th>Car Power</th>
          <th>Car Type</th>
          <th>ID Agency</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr class="info" v-for="car in filteredCars" :key="car.License_Plate">
          <td>{{ car.License_Plate }}</td>
          <td>{{ car.Model }}</td>
          <td>{{ car.Brand }}</td>
          <td>{{ car.Fuel_State }}</td>
          <td>{{ car.Car_Power }}</td>
          <td>{{ car.Car_Type }}</td>
          <td>{{ car.Id_Agency }}</td>
          <td class="action-car">
            <button class="small-but" @click="onModifier(car)">Update</button>
            <button class="small-but" @click="onSupprimer(car)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cars: [],
      searchQuery: "",
    };
  },
  async beforeMount() {
    try {
      const response = await fetch("http://localhost:9000/pestnloc/cars");
      const data = await response.json();
      this.cars = data;
      console.log(this.cars)
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },
  computed: {
    filteredCars() {
      return this.cars.filter((car) =>
          Object.values(car).some(
              (value) =>
                  typeof value === "string" &&
                  value.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
      );
    },
  },
  methods: {
    async onSupprimer(car) {
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];

      try{
        const reponse = await fetch(`http://localhost:9000/pestnloc/cars/${car.License_Plate}`,{
          method : "DELETE",
          headers : {
            'Authorization': `Bearer ${sendCookie}`
          }});
        if (reponse.ok) {
          alert(`Car : ${car.License_Plate}, ${car.Brand} ${car.Model} deleted`);
          window.location.reload();
        } else {
          console.error("La suppression a échoué avec le statut :", reponse.status);
        }
      }catch (error){
        console.log("Error :", error);
      }

    },
    onModifier(car) {
      // Logique pour la modification
      console.log("Modifier", car);
    },
  },
};
</script>

<style scoped>

.search-cars{
  position: absolute;
  left: 14%;
  background-color: #333333;
  border-radius: 5px;
  padding-left: 5px;
  color: #F4CE14;
  border: 1px solid #F4CE14;
}
.search-cars:focus {
  border-color: #F4CE14;
  outline: none;
}

.main-wrapper{
  display: flex;
  justify-content: center;
  margin-top: 50px;
}


.wrapper-cars {
  text-align: center;
  color: white;
  width: 80%;
  border-radius: 15px;
}

.action-car{
  display: flex;
  justify-content: space-evenly;
}

.table-title {
  margin-top: 20px;
  color: #F4CE14;
}

table.custom-table {
  width: 90%;
  margin: 20px auto;
  background-color: white;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  color: black;
}

.info {
  font-size: 16px;
}

.small-but {
  display: inline-block;
  padding: 5px 10px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #F4CE14;
  border-radius: 5px;
  color: #F4CE14;
  background-color: white;
  transition: background-color 0.3s, color 0.3s;
}

.small-but:hover {
  background-color: #F4CE14;
  color: white;
}

.small-but:active {
  transform: scale(0.95);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
