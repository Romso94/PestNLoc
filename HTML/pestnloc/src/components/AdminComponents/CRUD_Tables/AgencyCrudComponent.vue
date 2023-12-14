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
<!--        <div class="button-container">-->
<!--          <button class="button-add-agency" @click="addAgency">New Agency</button>-->
<!--        </div>-->
      </div>
      <table class="custom-table">
        <thead>
        <tr class="info">
          <th>Id Agency</th>
          <th>Agency Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Actions</th>
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

  <template v-if="updateAgency">
    <v-row justify="center">
      <v-dialog v-model="updateAgency" persistent width="1024">
        <v-card>
          <v-card-title>
            <span class="text-h5 mx-auto">{{statusDialog}}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Address" v-model="selectedAgency.Address" ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Agency Name" v-model="selectedAgency.Agency_Name" ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email" v-model="selectedAgency.Email" ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="ID Agency" v-model="selectedAgency.Id_Agency" readonly></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Phone Number" v-model="selectedAgency.Phone_Number" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#45474B" variant="text" @click="updateAgency = false">Close</v-btn>
            <v-btn color="#45474B" variant="text" @click="saveAgency">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>
</template>

<script>
import { ref } from "vue";


export default {
  name: "AgencyCrudComponent",
  data() {
    return {
      agencies: ref([]),
      searchQuery: "",
      updateAgency : false,
      selectedAgency: {
        Address: "",
        Agency_Name: "",
        Email: "",
        Id_Agency: "",
        Phone_Number: ""
      },
      statusDialog : ref(""),
      methodAgency : "",
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
          alert(`Agency : ${agency.Id_Agency} deleted`);
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
      this.selectedAgency = { ...agency };
      this.statusDialog = "Update Agency";
      this.methodAgency = "PUT";
      this.updateAgency = true;
    },

    async saveAgency(){
      const decodedCookie = decodeURIComponent(document.cookie);
      let cookie = decodedCookie.split("=");
      let sendCookie = cookie[1];


      for (const key in this.selectedAgency) {
        if (this.selectedAgency.hasOwnProperty(key)) {
          if (this.selectedAgency[key] === "") {
            alert("Please fill every field");
            return
          }
        }
      }
      try {
        let showAlert = "created";
        let linkToApi = "http://localhost:9000/pestnloc/agencies";
        if(this.methodAgency === "PUT"){
          linkToApi  += `/${this.selectedAgency.Id_Agency}`;
          showAlert = "updated";
        }
        const response = await fetch(linkToApi,{
          method : this.methodAgency,
          headers : {
            'Authorization': `Bearer ${sendCookie}`,
            'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            Agency_Name : this.selectedAgency.Agency_Name,
            Address : this.selectedAgency.Address,
            Phone_Number : this.selectedAgency.Phone_Number,
            Email : this.selectedAgency.Email
          })
        });

        if(response.ok){
          alert(`Agency ${this.selectedAgency.Id_Agency}  ${showAlert}`);
          window.location.reload();
        }

        this.updateAgency = false;

      }catch (error){
        console.log("Error : ", error);
      }
    }

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
