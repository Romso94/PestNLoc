<template>
  <div class="topMain">
    <div id="app">

      <div>

        <div id="app">
          <div class ="AddNameLogout">

            <div class="NameandSurname">Welcome {{Name}} {{ Surname }}</div>
            <button @click="logout" color="primary" class="Buttoncontract">Logout</button>
          </div>
          <div class ="AddNameLogout">
            <div>You don't have any contracts</div>
          </div>
          <div class ="AddNameLogout">
            <button @click="ajouterContrat" class="Buttoncontract Buttoncontract2">Ajouter un contrat</button>
          </div>
          <h2>Contrat actuel :</h2>
        </div>
      </div>
      <div>
        <!-- Affiche le bouton pour afficher le formulaire -->
        <button @click="toggleForm">Ajouter un contrat</button>


        <!-- Affiche le formulaire de contrat s'il n'y a pas de contrat existant -->
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
       showForm : ref(false),
       items : jsonData,
       Name : "Florian",
       Surname : "Poscente"
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
       let sendCookie = decodedCookie.split("=");
       const realcookie = cookie[1].split(".");
       cookie= realcookie[1];
       const decodedString = atob(cookie);
      const decodedObject = JSON.parse(decodedString);
      const id_user = decodedObject.user.id;

      console.log(decodedCookie);
      try {
        const response = await fetch(`http://localhost:9000/pestnloc/contracts/${id_user}`, {
              method: 'GET',
              headers:{
                'Authorization' : 'Bearer ${sendCookie}'
              }});

       console.log(response);
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

