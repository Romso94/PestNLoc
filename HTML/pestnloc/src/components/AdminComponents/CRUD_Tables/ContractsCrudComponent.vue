<template>
  <div class="main-wrapper">
    <div class="wrapper-contracts" style="background-color: #45474B;">
      <div class="wrapper-head-contract">
        <div class="search-container">
          <input v-model="searchQuery" type="text" placeholder="Search..." class="search-contracts"/>
        </div>
        <div class="title-container">
          <h1>Contract</h1>
        </div>
        <div class="button-container">
          <button class="button-add-contract" @click="addContract">New Contract</button>
        </div>
      </div>
      <table class="custom-table">
        <thead>
        <tr class="info">
          <th>Id Contract</th>
          <th>License Plate</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Price</th>
          <th>Id Client</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr class="info" v-for="contractItem in filteredContracts" :key="contractItem.Id_Contract">
          <td>{{ contractItem.Id_Contract }}</td>
          <td>{{ contractItem.License_Plate }}</td>
          <td>{{ contractItem.Start_Date }}</td>
          <td>{{ contractItem.End_Date }}</td>
          <td>{{ contractItem.Price }}</td>
          <td>{{ contractItem.Id_Client }}</td>
          <td class="action-contract">
            <button class="small-but" @click="onModifier(contractItem)">Update</button>
            <button class="small-but" @click="onSupprimer(contractItem)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <template v-if="updateContract">
    <v-row justify="center">
      <v-dialog v-model="updateContract" persistent width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5 mx-auto">{{ statusContract }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="End Date" v-model="selectedContract.End_Date"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="ID Client" v-model="selectedContract.Id_Client"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="License Plate" v-model="selectedContract.License_Plate"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Price" v-model="selectedContract.Price"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Start Date" v-model="selectedContract.Start_Date"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#45474B" variant="text" @click="updateContract = false">Close</v-btn>
            <v-btn color="#45474B" variant="text" @click="saveContract">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>

</template>

<script>
import { ref } from "vue";

export default {
  name: "ContractsCrudComponent",
  data() {
    return {
      contracts: ref([]),
      searchQuery: "",
      updateContract: false,
      selectedContract: {
        End_Date: "",
        Id_Client: "",
        Id_Contract: "",
        License_Plate: "",
        Price: "",
        Start_Date: ""
      },
      statusContract : "",
      methodContract : ""
    };
  },

  async beforeMount() {
    try {
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let token = cookie[1];

      const response = await fetch("http://localhost:9000/pestnloc/contracts", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      this.contracts = data;

      this.contracts.forEach((contract) => {
        contract.Start_Date = contract.Start_Date.split("T")[0];
        contract.End_Date = contract.End_Date.split("T")[0];
      });


    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },

  computed: {
    filteredContracts() {
      return this.contracts.filter((contract) =>
          Object.values(contract).some(
              (value) =>
                  typeof value === "string" &&
                  value.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
      );
    },
  },

  methods: {
    async onSupprimer(contract) {
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];

      try{
        const reponse = await fetch(`http://localhost:9000/pestnloc/contracts/${contract.Id_Contract}`,{
          method : "DELETE",
          headers : {
            'Authorization': `Bearer ${sendCookie}`
          }});
        if (reponse.ok) {
          alert(`Contract : ${contract.Id_Contract} deleted`);
          window.location.reload();
        } else {
          console.error("La suppression a échoué avec le statut :", reponse.status);
        }
      }catch (error){
        console.log("Error :", error);
      }
      console.log("Supprimer", contract);
    },
    onModifier(contract) {
      this.selectedContract = { ...contract };
      this.statusContract = "Update Contract";
      this.methodContract = "PUT";
      this.updateContract = true;
    },

    addContract(){
      this.selectedContract ={
        End_Date: "",
        Id_Client: "",
        Id_Contract: "",
        License_Plate: "",
        Price: "",
        Start_Date: ""
      };
       this.statusContract = "Add a new contract";
       this.methodContract = "POST";
       this.updateContract = true;
    },
    async saveContract(){
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];

      for (const key in this.selectedContract) {
        if (this.selectedContract.hasOwnProperty(key)) {
          if (this.selectedContract[key] === "" && key !== "Id_Contract" ) {
            alert("Please fill every field");
            return
          }
        }
      }
      try {
        let showAlert = "created";
        let linkToApi = "http://localhost:9000/pestnloc/contracts";
        if(this.methodContract === "PUT"){
          linkToApi  += `/${this.selectedContract.Id_Contract}`;
          showAlert = "updated";
        }
        const response = await fetch(linkToApi,{
          method : this.methodContract,
          headers : {
            'Authorization': `Bearer ${sendCookie}`,
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            Start_Date : this.selectedContract.Start_Date,
            Price : this.selectedContract.Price,
            End_Date : this.selectedContract.End_Date,
            Id_Client : this.selectedContract.Id_Client,
            License_Plate : this.selectedContract.License_Plate
          })
        });

        if(response.ok){
          alert(`Contract ${this.selectedContract.Id_Contract}  ${showAlert}`);
          window.location.reload();
          this.updateContract = false;
          return
        }

        alert("Check if the Licence Plate or the Id Client exist");



      }catch (error){
        console.log("Error : ", error);
      }
    }
  },
};
</script>

<style scoped>

.search-contracts {
  background-color: #333333;
  border-radius: 5px;
  padding-left: 5px;
  color: #F4CE14;
  border: 1px solid #F4CE14;
  font-size: 22px;
  font-weight: bold;

}

.search-contracts:focus {
  border-color: #F4CE14;
  outline: none;
}
.wrapper-head-contract{
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


.button-add-contract {
  color: #F4CE14;
  background-color: #333333;
  border: 2px solid #F4CE14;
  border-radius: 5px;
  padding: 5px;
  font-weight: bold;
}

.button-add-contract:hover{
  color: #45474B;
  background-color: #F4CE14;
}

.main-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.wrapper-contracts {
  text-align: center;
  color: white;
  width: 80%;
  border-radius: 15px;
}



table.custom-table {
  width: 95%;
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

.action-contract {
  display: flex;
  justify-content: space-evenly;
}
</style>
