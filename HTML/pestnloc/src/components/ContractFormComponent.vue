<template>
  <div class="card-wrapper">
  <v-card class="mx-auto text-center card-register" max-width="500">
    <h1 class="admin-form-title my-6">Car Rental Registration</h1>
    <v-container ref="form">
      <v-row>
        <!-- Car Details -->
        <v-col cols="12" sm="4">
          <v-text-field
              v-model="cars.Brand"
              color="primary"
              label="Brand"
              variant="underlined"
              readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
              v-model="cars.Model"
              color="primary"
              label="Model"
              variant="underlined"
              readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
              readonly
              v-model="cars.Car_Type"
              color="primary"
              label="Car Type"
              variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
              readonly
              v-model="cars.isReserved"
              color="primary"
              label="Reserved"
              variant="underlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
              v-model="cars.License_Plate"
              color="primary"
              label="License Plate"
              variant="underlined"
              readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
              readonly
              v-model="cars.Id_Agency"
              color="primary"
              label="Agency ID"
              variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
              v-model="cars.Car_Power"
              color="primary"
              label="Car Power"
              variant="underlined"
              readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
              v-model="cars.agencyname"
              color="primary"
              label="Agency Name"
              variant="underlined"
              readonly
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
              clearable
              v-model="startDate"
              color="primary"
              label="Start Date"
              type="date"
              variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Contract Details -->
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
              readonly
              v-model="price"
              color="primary"
              label="Price"
              type="number"
              variant="underlined"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
              clearable
              v-model="numberOfDays"
              color="primary"
              label="Number of Days"
              type="number"
              variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn @click="submitForm" class="submit-register">Rent</v-btn>
          <v-btn @click="clearForm" class="ml-15 submit-register">Clear</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  </div>
</template>

<script>
import { rentCar } from "./js/carsRent";
import {ref} from "vue";
import router from "../router";

export default {
  data() {
    return {
      cars: ref(""),
      startDate: ref(''),
      price: ref(0),
      numberOfDays: 0,
      price_car: ref(0)
    };
  },


 async beforeMount() {
    this.cars = rentCar;
    if (this.cars.Car_Type === "Sports") {
      this.price_car = 200;
    }
    if (this.cars.Car_Type === "Electric") {
      this.price_car = 50;
    }
    if (this.cars.Car_Type === "Suv") {
      this.price_car = 100;
    }

    if(this.cars.Brand === ""){
      await router.push("/rent");
    }


  },
  methods: {
    updatePrice() {
      this.price = this.numberOfDays * this.price_car;
    },
    async submitForm() {
      if(this.startDate === '' || this.numberOfDays === 0){
        alert("Fill  Date and number of Days ");
        return
      }

      const startDateObj = new Date(this.startDate);

      const endDateObj = new Date(startDateObj);
      endDateObj.setDate(startDateObj.getDate() + parseInt(this.numberOfDays));

      const formattedStartDate = this.formatDate(startDateObj);
      const formattedEndDate = this.formatDate(endDateObj);

      this.startDate = formattedStartDate;



      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];
      const realcookie = cookie[1].split(".");
      cookie= realcookie[1];
      const decodedString = atob(cookie);
      const decodedObject = JSON.parse(decodedString);
      const id_user = decodedObject.user.id;

      try{
        const response = await fetch(`http://localhost:9000/pestnloc/contracts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${sendCookie}`,
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            Start_Date : this.startDate,
            Price : this.price,
            End_Date : formattedEndDate,
            Id_Client : id_user,
            License_Plate : this.cars.License_Plate
          })
        });

        if(response.ok){

          await router.push("/Contracts");
        }

      }catch (error){
        console.log("Error :", error);
      }

    },
    clearForm() {
      this.startDate = "";
      this.numberOfDays = 0;
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

  },
  watch: {
    numberOfDays: "updatePrice",
  },



};
</script>

<style scoped>
button {
  background-color: #F4CE14;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45474b;
}

.card-wrapper{
  background-color: #F4CE14;
  padding: 50px;
}
</style>
