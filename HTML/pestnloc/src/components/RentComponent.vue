<template>
  <div class="main-wrapper">
    <div class="wrapper">
      <h1 class="h1">Car to rent</h1>
      <table>
        <thead>
        <tr class="info">
          <th>Brand</th>
          <th>Model</th>
          <th>Agence</th>
          <th>Rent</th>
        </tr>
        </thead>
        <tbody>
        <tr class="info" v-for="car in cars">
          <td>{{ car.Brand }}</td>
          <td>{{ car.Model }}</td>
          <td>{{ car.agencyname }}</td>
          <td>
            <button class="button-submit" type="submit" @click="louerVoiture(car.License_Plate)">
              Rent this car
            </button>
          </td>
        </tr>
        <tr v-if="cars.length === 0">
          <td colspan="4" style="text-align: center; font-weight: bold;">
            No More Cars Available
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal" v-if="showModal">
      <button class ="close" @click="CloseModal">x</button>


      <h1 class = "title-modal">{{modal_car_model}}</h1>

      <div class="car-mod">
        <div>
          <p class ="mod-inf-car">License Plate : {{modal_car_plate}} </p>
          <p class ="mod-inf-car">Brand : {{modal_car_brand}}</p>
          <p class ="mod-inf-car">Model : {{modal_car_model}}</p>
          <p class ="mod-inf-car">Type: {{modal_car_type}}</p>
          <p class ="mod-inf-car">Car power : {{modal_car_power}}</p>
        </div>
        <div >
          <img class="imcar" :src="this.showCarImage"/>
        </div>


      </div>

      <div class="button-wrapper">
        <button class="but" type="submit" @click="redirigerVersContratForm()">Rent</button>
      </div>

    </div>

  </div>
</template>

<script>


import router from "../router"



import { ref, onMounted } from "vue";
import {th} from "vuetify/locale";
import {rentCar} from "./js/carsRent";

export default {

  components:{

  },
  data() {
    return {
      cars: ref([]),
      agence: ref([]),
      showModal: false,
      carid : ref([]),
      modal_car_plate : ref(""),
      modal_car_model : ref(""),
      modal_car_reserved : ref(false),
      modal_car_brand : ref(""),
      modal_car_power : ref(""),
      modal_car_type : ref(""),
      modal_car_agency : ref(""),
      showCarImage : ref(''),
      contractExist : ref(false),
    };
  },
  async beforeMount() {
    try {
      const response = await fetch("http://localhost:9000/pestnloc/cars");
      const response2 = await fetch("http://localhost:9000/pestnloc/agencies");
      const data = await response.json();
      const data2 = await response2.json();
      this.cars = data;
      this.agence = data2;
      this.contractExist = await this.getInfoContratUser();


      this.cars = data
          .filter(car => !car.isReserved)
          .map(car => ({
            ...car,
            agencyname: this.agence.find(agency => car.Id_Agency === agency.Id_Agency)?.Agency_Name
          }));
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },
  methods: {
    louerVoiture(carId) {

      if(!this.contractExist){
        alert("You already have a contract !");
        return
      }

      this.showModal = true;
      for (let i=0;i<this.cars.length;i++){
        if (this.cars[i].License_Plate === carId){
          this.carid = this.cars[i]
          break
        }
      }

      this.modal_car_plate = this.carid.License_Plate;
      this.modal_car_model = this.carid.Model;
      this.modal_car_reserved = this.carid.isReserved;
      this.modal_car_brand = this.carid.Brand;
      this.modal_car_power = this.carid.Car_Power;
      this.modal_car_agency = this.carid.agencyname;
      this.modal_car_type = this.carid.Car_Type;

      this.showCarImage = `/src/components/RentDirectory/${this.modal_car_brand}_${this.modal_car_model}.jpg`;

    },
    async redirigerVersContratForm() {

      rentCar.Brand = this.modal_car_brand;
      rentCar.Car_Power = this.modal_car_power;
      rentCar.Car_Type = this.modal_car_type;
      rentCar.isReserved = this.modal_car_reserved;
      rentCar.Id_Agency = this.carid.Id_Agency;
      rentCar.License_Plate = this.modal_car_plate;
      rentCar.Model = this.modal_car_model;
      rentCar.agencyname = this.modal_car_agency;


      await router.push("/newcontract");

    },

    CloseModal(){
      this.showModal = false;
    },

    async getInfoContratUser(){
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];
      const realcookie = cookie[1].split(".");
      cookie= realcookie[1];
      const decodedString = atob(cookie);
      const decodedObject = JSON.parse(decodedString);
      const id_user = decodedObject.user.id;

      try{
        const response = await  fetch(`http://localhost:9000/pestnloc/contracts/clients/${id_user}`, {
          method : "GET",
          headers: {
            'Authorization': `Bearer ${sendCookie}`
          }
        });
        if(response.ok){
          const data = await response.json();

          if (Array.isArray(data) && data.length === 0) {
            return true;
          }

          return false;
        }

      }catch (error){
        console.log("Error :", error)
      }
    }
  },
};
</script>

<style scoped>


.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
  width: 70%;
}

.main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f4ce14;
  margin-top: 50px;
  margin-bottom: 50px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  background-color: #F5F7F8;

}

th {
  background-color: #f2f2f2;
}

.info{
  font-size: 16px;
}
.but{
  display: flex;
  padding: 20px;
  font-size: 22px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #F4CE14;
  border-radius: 10px;
  color: #F4CE14;
  background-color: #45474b;
  transition: background-color 0.3s, color 0.3s;

}

.button-submit{
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #F4CE14;
  border-radius: 10px;
  color: #F4CE14;
  background-color: #45474b;
  transition: background-color 0.3s, color 0.3s;
}

.but:hover, .button-submit:hover {
  background-color: #F4CE14;
  color: white;
}

.button-wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
}

.but:active {
  transform: scale(0.95);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.modal {
  position: fixed;

justify-content: center;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;

  width: 50%;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 100;
  height: 80%;
}

.car-mod {

  display: flex;
  align-items: center;
  margin-left: 10px;
  justify-content: space-evenly;
  text-align: center;
  margin-top: 70px;
  width: 100%;
  font-size: 22px;



}
.imcar{
  height: 300px;
  border-radius: 15px;

}
.mod-inf-car
{
  margin-top: 10px;
}
.title-modal{
  text-align: center;
  margin-top: 20px;
}
.close{
  position: absolute;
  right: 10px;
  font-size: 20px;

}

.close:hover{
  color: white;
  background: red;
}

.h1{
  margin-bottom: 20px;
  font-weight: bold;
  color: #45474b;
  font-size: 24px;
}

</style>
