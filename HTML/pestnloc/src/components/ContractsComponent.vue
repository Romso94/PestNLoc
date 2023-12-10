<template>
  <div class="topMain">
    <div class="Contract_component">


          <div class ="AddNameLogout">

            <div class="NameandSurname">Welcome {{Name}} {{ Surname }}</div>
            <button @click="logout" color="primary" class="Buttoncontract">Logout</button>
          </div>
          <div class ="AddNameLogout">
            <div>You don't have any contracts</div>
          </div>

          <div class="White_contract">
          <h2>Contrat actuel :</h2>
          <div>Id Client : {{Id_client}}</div>
          <div>Id Contract : {{Id_contract}}</div>
          <div>Starting Date : {{Start_Date_Year}}-{{Start_Date_Month}}-{{Start_Date_Day}}</div>
          <div>Ending Date : {{End_Date_Year}}-{{End_Date_Month}}-{{End_Date_Day}}</div>
          <div>Price : {{Price}}</div>
          <div>License Plate : {{License_Plate}}</div>
          </div>

      <div>
        <div class ="AddNameLogout">
          <button @click="ajouterContrat" class="Buttoncontract Buttoncontract2">Ajouter un contrat</button>
        </div>
        <ContractForm v-if="showForm" @contratAjoute="contratAjoute" />
      </div>
    </div>
  </div>
  <div>
  </div>

  <div>
    <!-- Affiche le contrat existant s'il y en a un -->
    <p>{{ contrat }}</p>
  </div>


</template>

<script >
import {ref, shallowRef} from 'vue';
import ContractForm from "./ContractFormComponent.vue";
import jsonData from '@/Json/car.json';

export default {
  data() {
    return {
       contrat : shallowRef(null),
       showForm : shallowRef(false),
       items : jsonData,
       Name : shallowRef(""),
       Surname : shallowRef(""),
      Id_client : shallowRef(""),
      Id_contract : shallowRef(""),
      Start_Date_Year : shallowRef(""),
      Start_Date_Month : shallowRef(""),
      Start_Date_Day : shallowRef(""),
      End_Date_Year : shallowRef(""),
      End_Date_Month : shallowRef(""),
      End_Date_Day : shallowRef(""),
      License_Plate : shallowRef(""),
      Price : shallowRef(""),
      responseData : null
    }
  },

  components : {
    ContractForm
  },

  beforeMount() {
    this.fetchContract();
  },

  methods : {
     logout ()  {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      window.location.href = '/login';
    },
    async fetchContract () {
       const decodedCookie = decodeURIComponent(document.cookie);
       let cookie = decodedCookie.split("=");
       let sendCookie = cookie[1];
       const realcookie = cookie[1].split(".");
       cookie= realcookie[1];
       const decodedString = atob(cookie);
       const decodedObject = JSON.parse(decodedString);
       const id_user = decodedObject.user.id;

      try {
        const response = await fetch(`http://localhost:9000/pestnloc/contracts/clients/${id_user}`, {
              method: 'GET',
              headers:{
                'Authorization': `Bearer ${sendCookie}`
              }});

        if (response.ok) {

          const responseData = await response.json();
          console.log(responseData[0].Id_Contract);
          this.Id_client = responseData[0].Id_Client;
          this.Id_contract = responseData[0].Id_contract;
          this.Start_Date_Year = responseData[0].Start_Date.slice(0,4);
          this.Start_Date_Month = responseData[0].Start_Date.slice(5,7);
          this.Start_Date_Day = responseData[0].Start_Date.slice(8,10);
          this.End_Date_Year = responseData[0].End_Date.slice(0,4);
          this.End_Date_Month = responseData[0].End_Date.slice(5,7);
          this.End_Date_Day = responseData[0].End_Date.slice(8,10);
          this.License_Plate = responseData[0].License_Plate;
          this.Price = responseData[0].Price;


          try {
            const response = await fetch(`http://localhost:9000/pestnloc/clients/${this.Id_client}`, {
              method: 'GET',
              headers:{
                'Authorization': `Bearer ${sendCookie}`
              }});

            if (response.ok){
              const infoclient = await response.json();
              console.log(infoclient)
              this.Name = infoclient[0].Name;
              this.Surname = infoclient[0].LastName;

            }
          }

          catch (error){
            console.log('Erreur lors de la récupération des infos clients')
          }


        } else {
          console.error('La requête a échoué avec le statut :', response.status);
        }

      } catch (error) {
        console.error('Erreur lors de la récupération du contrat :', error);
      }
    },

     contratAjoute (nouveauContrat)  {
      this.contrat = nouveauContrat;
      this.showForm = false;
    },

    toggleForm () {
      this.showForm = !this.showForm;

    }
  },
}



</script>

<style scoped>

@import "Css/Contract.css";

</style>

