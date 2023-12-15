<template>
  <v-card
      class="mx-auto text-center card-register"
      max-width="344"
  >
    <h1  class="admin-form-title my-6">Agency Registration</h1>
    <v-container ref="form">
      <v-text-field
          clearable
          v-model="AgencyName"
          color="primary"
          label="Agency Name"
          variant="underlined"
          :rules = "[rules.required]"
      ></v-text-field>

      <v-text-field
          clearable
          v-model="AgencyAddress"
          color="primary"
          label="Address"
          variant="underlined"
          :rules = "[rules.required]"
      ></v-text-field>

      <v-text-field
          clearable
          v-model="phoneNumber"
          color="primary"
          label="Phone Number"
          variant="underlined"
          :rules = "[rules.required]"
      ></v-text-field>

      <v-text-field
          clearable
          v-model="email"
          color="primary"
          label="Email"
          placeholder="testAdmin@gmail.com"
          variant="underlined"
          :rules = "[rules.required]"
      ></v-text-field>

      <v-text-field
          clearable
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="Admin Password"
          variant="underlined"
          @click:append-inner="visible = !visible"
          :rules = "[rules.required]"
          v-model="password"

      ></v-text-field>

      <v-btn @click="submitForm" class="submit-register">Submit</v-btn>
      <v-btn @click="clearForm" class="ml-15 submit-register">
        Clear
      </v-btn>
    </v-container>
    <v-card-text class="text-center">
      <a
          class="text-decoration-none link-login"
          href="/admin/login"
          rel="noopener noreferrer"
          target="_blank"
      >Login
        <v-icon icon="mdi-chevron-right"></v-icon>

      </a>
    </v-card-text>
  </v-card>
</template>

<script>
import { shallowRef } from "vue";
import router from "../../router";

export default {
  name: "AdminRegisterComponent",

  data() {
    return {
      AgencyName: shallowRef(null),
      AgencyAddress: shallowRef(null),
      phoneNumber: shallowRef(null),
      email: shallowRef(null),
      password: shallowRef(null),
      visible : false,
      rules: {
        required: value => !!value || 'Field is required',
      },

    };
  },

  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

   async submitForm() {
      if(this.verifInput()){
        return
      }

      try{
        const response = await  fetch("http://localhost:9000/pestnloc/admin/register", {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',

          },
          body: JSON.stringify({
            "Agency_Name": this.AgencyName,
            "Address": this.AgencyAddress,
            "Email": this.email,
            "Phone_Number": this.phoneNumber,
            "Password": this.password
          }),
        });

        if(response.ok){
          await router.push("/admin/login");
        }

      }catch (error){
        console.log("Error : ",error);
      }
    },

    verifInput() {
      if(this.AgencyName === null || this.AgencyAddress === null  || this.phoneNumber === null || this.email === null || this.password === null){
        alert("Please fill all field !")
        return true;
      }
      return  false
    },
    clearForm () {
      this.AgencyName = null;
      this.AgencyAddress = null;
      this.phoneNumber = null;
      this.email = null;
      this.password = null;
    },
  },
};
</script>

<style scoped>
@import "../Css/AdminSign.css";

.submit-register{
  color: #F5F7F8;
  background-color:#45474B;
}

.submit-register:hover{
  color: #F4CE14;
}

</style>
