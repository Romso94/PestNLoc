<template>
  <div class="main-wrapper">
    <div class="wrapper-agencies" style="background-color: #45474B;">
      <div class="wrapper-head-agencies">
        <div class="search-container">
          <input v-model="searchQuery" type="text" placeholder="Search..." class="search-agencies"/>
        </div>
        <div class="title-container">
          <h1>Agency</h1>
        </div>
        <div class="button-container">
          <button class="button-add-agency">New Agency</button>
        </div>
      </div>
      <table class="custom-table">
        <thead>
        <tr class="info">
          <th>Id Agency</th>
          <th>Agency Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Actions</th> <!-- Added Actions column -->
        </tr>
        </thead>
        <tbody>
        <tr class="info" v-for="agencyItem in filteredAgencies" :key="agencyItem.Id_Agency">
          <td>{{ agencyItem.Id_Agency }}</td>
          <td>{{ agencyItem.Agency_Name }}</td>
          <td>{{ agencyItem.Address }}</td>
          <td>{{ agencyItem.Phone_Number }}</td>
          <td>{{ agencyItem.Email }}</td>
          <td class="action-agency">
            <button class="small-but" @click="onModifier(agencyItem)">Update</button>
            <button class="small-but" @click="onSupprimer(agencyItem)">Delete</button>
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
  name: "AgencyCrudComponent",
  data() {
    return {
      agencies: ref([]),
      searchQuery: "",
    };
  },

  async beforeMount() {
    try {
      const response = await fetch("http://localhost:9000/pestnloc/agencies");
      const data = await response.json();
      this.agencies = data;
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  },

  computed: {
    filteredAgencies() {
      return this.agencies.filter((agency) =>
          Object.values(agency).some(
              (value) =>
                  typeof value === "string" &&
                  value.toLowerCase().includes(this.searchQuery.toLowerCase())
          )
      );
    },
  },

  methods: {
    async onSupprimer(agency) {
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];
      const realcookie = cookie[1].split(".");
      cookie= realcookie[1];
      const decodedString = atob(cookie);
      const decodedObject = JSON.parse(decodedString);
      const id_admin = decodedObject.user.id;

      try{
        const reponse = await fetch(`http://localhost:9000/pestnloc/agencies/${agency.Id_Agency}`,{
          method : "DELETE",
          headers : {
            'Authorization': `Bearer ${sendCookie}`
          }});
        if (reponse.ok) {
          alert(`Agency : deleted`);
          if(agency.Id_Agency === id_admin){
            this.logout();
          }
        } else {
          console.error("La suppression a échoué avec le statut :", reponse.status);
        }
      }catch (error){
        console.log("Error :", error);
      }

    },
    logout ()  {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      window.location.href = '/admin/login';
    },
    onModifier(agency) {
      // Logique pour la modification
      console.log("Modifier", agency);
    },
  },
};
</script>

<style scoped>
.search-agencies {
  background-color: #333333;
  border-radius: 5px;
  padding-left: 5px;
  color: #F4CE14;
  border: 1px solid #F4CE14;
  font-size: 22px;
  font-weight: bold;

}

.search-agencies:focus {
  border-color: #F4CE14;
  outline: none;
}
.wrapper-head-agencies{
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


.button-add-agency {
  color: #F4CE14;
  background-color: #333333;
  border: 2px solid #F4CE14;
  border-radius: 5px;
  padding: 5px;
  font-weight: bold;
}

.button-add-agency:hover{
  color: #45474B;
  background-color: #F4CE14;
}

.main-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.wrapper-agencies {
  text-align: center;
  color: white;
  width: 80%;
  border-radius: 15px;
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

.action-agency {
  display: flex;
  justify-content: space-evenly;
}
</style>
