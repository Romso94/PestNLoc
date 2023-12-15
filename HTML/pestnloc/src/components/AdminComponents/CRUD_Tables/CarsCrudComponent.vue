<template>
  <div class="main-wrapper">
    <div class="wrapper-cars" style="background-color: #45474B;">
      <div class="wrapper-head-cars">
        <div class="search-container">
          <input v-model="searchQuery" type="text" placeholder="Search..." class="search-cars"/>
        </div>
        <div class="title-container">
          <h1>Car</h1>
        </div>
        <div class="button-container">
          <button class="button-add-car" @click="addCar">New Car</button>
        </div>
      </div>

      <table class="custom-table">
        <thead>
        <tr class="info">
          <th>License Plate</th>
          <th>Model</th>
          <th>Brand</th>
          <th>Reserved</th>
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
          <td>{{ car.isReserved ? 'true' : 'false' }}</td>
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

  <template v-if="updateCar">
    <v-row justify="center">
      <v-dialog v-model="updateCar" persistent width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5 mx-auto">{{ statusCar }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Brand" v-model="selectedCar.Brand"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Car Power" v-model="selectedCar.Car_Power"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                      label="Car Type"
                      v-model="selectedCar.Car_Type"
                      :items="['Sports', 'Suv','Electric']"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                      label="Reserved"
                      v-model="selectedCar.isReserved"
                      :items="['true', 'false']"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="License Plate" v-model="selectedCar.License_Plate"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Model" v-model="selectedCar.Model"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Agency ID" v-model="selectedCar.Id_Agency"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#45474B" variant="text" @click="updateCar = false">Close</v-btn>
            <v-btn color="#45474B" variant="text" @click="saveCar">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

</template>

<script>
export default {
  data() {
    return {
      cars: [],
      searchQuery: "",
      updateCar : false,
      selectedCar: {
        Brand: "",
        Car_Power: "",
        Car_Type: "",
        isReserved: false,
        License_Plate: "",
        Model: "",
        Id_Agency : ""
      },
      statusCar : "",
      methodCar : "",
    };
  },
  async beforeMount() {
    try {
      const response = await fetch("http://localhost:9000/pestnloc/cars");
      const data = await response.json();
      this.cars = data;
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
    async onModifier(car) {

        this.selectedCar = car;
        this.selectedCar.isReserved = Boolean(this.selectedCar.isReserved);
        this.statusCar = "Update Car";
        this.updateCar = true;
        this.methodCar = "PUT";

    },

    addCar(){
      this.selectedCar ={
        Brand: "",
        Car_Power: "",
        Car_Type: "",
        isReserved: false,
        License_Plate: "",
        Model: "",
        Id_Agency: "",
      };
      this.methodCar = "POST";
      this.statusCar = "Add a new Car";
      this.updateCar = true;
    },
    async saveCar(){
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];

      for (const key in this.selectedCar) {
        if (this.selectedCar.hasOwnProperty(key)) {
          if (this.selectedCar[key] === "") {
            alert("Please fill every field");
            return
          }
        }
      }

      if(this.selectedCar.isReserved === "true"){
        this.selectedCar.isReserved = 1;
      }else {
        this.selectedCar.isReserved = 0;
      }

      try {
        let showAlert = "created";
        let linkToApi = "http://localhost:9000/pestnloc/cars";
        if(this.methodCar === "PUT"){
           linkToApi  += `/${this.selectedCar.License_Plate}`;
           showAlert = "updated";
        }
        const response = await fetch(linkToApi,{
          method : this.methodCar,
          headers : {
            'Authorization': `Bearer ${sendCookie}`,
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            Model : this.selectedCar.Model,
            Brand : this.selectedCar.Brand,
            isReserved : this.selectedCar.isReserved,
            Car_Power : this.selectedCar.Car_Power,
            Car_Type : this.selectedCar.Car_Type,
            Id_Agency : this.selectedCar.Id_Agency,
            License_Plate : this.selectedCar.License_Plate
          })
        });

        if(response.ok){
          alert(`Car ${this.selectedCar.Model} ${this.selectedCar.Brand} ${showAlert}`);
          window.location.reload();
        }

        this.updateCar = false;

      }catch (error){
        console.log("Error : ", error);
      }
    }

  },
};
</script>

<style scoped>

.search-cars {
  background-color: #333333;
  border-radius: 5px;
  padding-left: 5px;
  color: #F4CE14;
  border: 1px solid #F4CE14;
  font-size: 22px;
  font-weight: bold;
  width: 80%;

}

.search-cars:focus {
  border-color: #F4CE14;
  outline: none;
}

.main-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.wrapper-head-cars {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 90%;
  margin: 20px auto;

}

.search-container,
.title-container,
.button-container {
  flex: 1;
}

.button-container{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
}

.title-container h1 {
  color: #F4CE14;
}

.wrapper-cars {
  text-align: center;
  justify-content: center;
  color: white;
  border-radius: 15px;
}

.action-car{
  display: flex;
  justify-content: space-evenly;
}

.button-add-car {
  color: #F4CE14;
  background-color: #333333;
  border: 2px solid #F4CE14;
  border-radius: 5px;
  padding: 5px;
  font-weight: bold;
}

.button-add-car:hover{
  color: #45474B;
  background-color: #F4CE14;
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
