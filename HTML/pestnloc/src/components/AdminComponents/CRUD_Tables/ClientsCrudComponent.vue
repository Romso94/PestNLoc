<template>
  <div class="main-wrapper">
    <div class="wrapper-clients" style="background-color: #45474B;">
      <div class="wrapper-head-clients">
        <div class="search-container">
          <input v-model="searchQuery" type="text" placeholder="Search..." class="search-clients"/>
        </div>
        <div class="title-container">
          <h1>Clients</h1>
        </div>
        <div class="button-container">
          <button class="button-add-clients">New Client</button>
        </div>
      </div>
      <table class="custom-table">
        <thead>
        <tr class="info">
          <th>Id Client</th>
          <th>Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>Year of Birth</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Date Permis Issue</th>
          <th>Country</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr class="info" v-for="clientItem in filteredClients" :key="clientItem.Id_Client">
          <td>{{ clientItem.Id_Client }}</td>
          <td>{{ clientItem.Name }}</td>
          <td>{{ clientItem.LastName }}</td>
          <td>{{ clientItem.Gender }}</td>
          <td>{{ clientItem.YearOfBirth }}</td>
          <td>{{ clientItem.Email }}</td>
          <td>{{ clientItem.Phone_Number }}</td>
          <td>{{ clientItem.Date_Permis_Issue }}</td>
          <td>{{ clientItem.Country }}</td>
          <td>{{ clientItem.Address }}</td>
          <td class="action-client">
            <button class="small-but mx-1" @click="onModifier(clientItem)">Update</button>
            <button class="small-but" @click="onSupprimer(clientItem)">Delete</button>
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
  name: "ClientsCrudComponent",
  data() {
    return {
      clients: ref([]),
      searchQuery: "",
    };
  },

  async beforeMount() {
    try {
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let token = cookie[1];

      const response = await fetch("http://localhost:9000/pestnloc/clients", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      this.clients = data;

      this.clients.forEach((client) => {
        client.Date_Permis_Issue = client.Date_Permis_Issue.split("T")[0];
      });

    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },

  computed: {
    filteredClients() {
      return this.clients.filter((client) =>
          Object.values(client).some(
              (value) =>
                  typeof value === "string" &&
                  value.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
      );
    },
  },

  methods: {
   async onSupprimer(client) {
     const decodedCookie = decodeURIComponent(document.cookie);
     let cookie = decodedCookie.split("=");
     let sendCookie = cookie[1];

      try{
        const reponse = await fetch(`http://localhost:9000/pestnloc/clients/${client.Id_Client}`,{
          method : "DELETE",
          headers : {
            'Authorization': `Bearer ${sendCookie}`
          }});
        if (reponse.ok) {
          alert(`Client : Id =${client.Id_Client} ${client.Name}  ${client.LastName} deleted`);
          window.location.reload();
        } else {
          console.error("La suppression a échoué avec le statut :", reponse.status);
        }
      }catch (error){
        console.log("Error :", error);
      }

    },
    onModifier(client) {
      // Logique pour la modification
      console.log("Modifier", client);
    },
  },
};
</script>

<style scoped>

.search-clients {
  background-color: #333333;
  border-radius: 5px;
  padding-left: 5px;
  color: #F4CE14;
  border: 1px solid #F4CE14;
  font-size: 22px;
  font-weight: bold;

}

.search-clients:focus {
  border-color: #F4CE14;
  outline: none;
}
.wrapper-head-clients{
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


.button-add-clients {
  color: #F4CE14;
  background-color: #333333;
  border: 2px solid #F4CE14;
  border-radius: 5px;
  padding: 5px;
  font-weight: bold;
}

.button-add-clients:hover{
  color: #45474B;
  background-color: #F4CE14;
}

.main-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.wrapper-clients {
  text-align: center;
  color: white;
  width: 90%;
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

.action-client{
  display: flex;
  height: 56px;
  justify-content: space-evenly;
}
</style>
