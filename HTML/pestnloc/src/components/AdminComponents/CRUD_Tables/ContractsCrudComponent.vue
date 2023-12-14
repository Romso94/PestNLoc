<template>
  <div class="main-wrapper">
    <div class="wrapper-contracts" style="background-color: #45474B;">

      <h1 class="table-title">
        <input v-model="searchQuery" type="text" placeholder="Search..." class="search-contracts"/>
        Contracts
      </h1>
      <table class="custom-table">
        <thead>
        <tr class="info">
          <th>Id Contract</th>
          <th>License Plate</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Price</th>
          <th>Id Client</th>
          <th>Contract Availability</th>
          <th>Actions</th> <!-- Added Actions column -->
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
          <td>{{ contractItem.Contract_Availability }}</td>
          <td class="action-contract">
            <button class="small-but" @click="onModifier(contractItem)">Update</button>
            <button class="small-but" @click="onSupprimer(contractItem)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ContractsCrudComponent",
  data() {
    return {
      contracts: ref([]),
      searchQuery: "",
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

      console.log(this.contracts)

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
      console.log("Supprimer", client);
    },
    onModifier(contract) {
      // Logique pour la modification
      console.log("Modifier", contract);
    },
  },
};
</script>

<style scoped>
.search-contracts {
  position: absolute;
  left: 12%;
  background-color: #333333;
  border-radius: 5px;
  padding-left: 5px;
  color: #F4CE14;
  border: 1px solid #F4CE14;
  transition: border-color 0.3s;
}

.search-contracts:focus {
  border-color: yellow;
  outline: none;
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

.table-title {
  margin-top: 20px;
  color: #F4CE14;
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
