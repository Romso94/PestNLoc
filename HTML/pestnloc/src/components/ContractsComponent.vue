<template>
  <div class="topMain">
    <div class="Contract_component">
          <div class ="AddNameLogout">
            <div class="NameandSurname">Welcome {{Name}} {{ Surname }}</div>
            <button @click="logout" color="primary" class="Buttoncontract">Logout</button>
          </div>

          <div   class="White_contract">
            <h3 class="title-contract">Your Contract</h3>
            <div v-if="contractBool" class="wrapp-contract-info">
              <div class="text-contrat-wrap">
                <p>Id Client : {{this.contrat.Id_Client}}</p>
                <p>Id Contract : {{this.contrat.Id_Contract}}</p>
                <p>License Plate : {{this.contrat.License_Plate}}</p>
                <p>Starting Date : {{this.contrat.Start_Date}}</p>
                <p>End Date : {{this.contrat.End_Date}}</p>
                <p>Price : {{this.contrat.Price}}$</p>
              </div>
              <img class="contract-img" src="./assets/contract.png"/>

            </div>
            <div class ="Nocontract" v-if="!contractBool">{{Nocontract}}</div>
          </div>




      <div>
        <div class ="AddNameLogout">
          <button @click="deleteContract" class="Buttoncontract ">Delete your contract</button>
        </div>
      </div>
    </div>
  </div>
  <div>
  </div>



</template>

<script >
import {ref, shallowRef} from 'vue';
import ContractForm from "./ContractFormComponent.vue";
import jsonData from '@/Json/car.json';

export default {
  data() {
    return {
       contrat : shallowRef(""),
       items : jsonData,
       Name : shallowRef(""),
       Surname : shallowRef(""),
      Nocontract : shallowRef(""),
      contractBool : shallowRef(false),
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
        const response = await fetch(`http://localhost:9000/pestnloc/clients/${id_user}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${sendCookie}`
          }
        });

        if (response.ok) {
          const infoclient = await response.json();
          this.Name = infoclient[0].Name;
          this.Surname = infoclient[0].LastName;


          try {
            const response = await fetch(`http://localhost:9000/pestnloc/contracts/clients/${id_user}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${sendCookie}`
              }
            });

            if (response.ok) {
              this.contractBool = true;
              const dataResponse = await response.json();

              this.contrat = dataResponse[0];

              this.contrat.Start_Date = new Date(this.contrat.Start_Date);
              this.contrat.End_Date = new Date(this.contrat.End_Date);

              const formattedStartDate = this.formatDate(this.contrat.Start_Date);
              const formattedEndDate = this.formatDate(this.contrat.End_Date);

              this.contrat.Start_Date = formattedStartDate;
              this.contrat.End_Date = formattedEndDate;

            }

          } catch (error) {
            this.contractBool = false;
            this.Nocontract = "You don't have any contract"
          }
        } else {
          console.error('La requête a échoué avec le statut :', response.status);
        }
      }
      catch (error){
          console.log('Erreur lors de la récupération des infos clients')
        }
    },
   async deleteContract(){
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];

      try{
        const reponse = await fetch(`http://localhost:9000/pestnloc/contracts/${this.contrat.Id_Contract}`,{
          method : "DELETE",
          headers : {
            'Authorization': `Bearer ${sendCookie}`
          }});
        if (reponse.ok) {
          window.location.reload();
        } else {
          console.error("La suppression a échoué avec le statut :", reponse.status);
        }
      }catch (error){
        console.log("Error :", error);
      }
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  },
}



</script>

<style scoped>

@import "Css/Contract.css";



</style>

