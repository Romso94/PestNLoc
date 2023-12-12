<template>
  <div class="formRegisterInputs">
    <h1 class="register-form-title">Personal Informations</h1>
    <div class="wrap-input">
    <div class="NameInput">
      <input type="text" class="first-name input-text"  placeholder="First Name" v-model="formData.registerFirstName">
      <p v-if="errorFirstName" class="error-message">{{ errorFirstName }}</p>
      <input type="text" class="last-name input-text" placeholder="Last Name" v-model="formData.registerLastName">
      <p v-if="errorLastName" class="error-message">{{errorLastName}}</p>
      <input type="text" class="address input-text" placeholder="Address" v-model="formData.registerAddress">
      <p v-if="errorAddress" class="error-message">{{errorAddress}}</p>
    </div>
      <div class="MailPasswordInput">
        <input
            type="text"
            class="email input-text"
            placeholder="Email"
            v-model="formData.registerMail"
        />
        <p v-if="errorMail" class="error-message">{{ errorMail }}</p>
        <input
            :type="showPassword ? 'text' : 'password'"
            class="password input-text"
            placeholder="Password"
            v-model="formData.registerPassword"
        />
        <p v-if="errorPassword" class="error-message">{{ errorPassword }}</p>
        <button type="button" class="togglePassword" @click="togglePasswordVisibility">
          <i v-if="showPassword" class="material-icons">visibility</i>
          <i v-else class="material-icons">visibility_off</i>
        </button>
        <input
            :type="showPassword ? 'text' : 'password'"
            class="confirm-password input-text"
            placeholder="Confirm Password"
            v-model="formData.registerPasswordConfirm"
        />
        <p v-if="errorPasswordConfirm" class="error-message">{{ errorPasswordConfirm }}</p>

      </div>
    </div>
  </div>

</template>

<script>

import {shallowRef} from "vue";
import * as registerFunction from "./js/registerfunctions";

export default {

  data () {
    return {
      formData  : {
        registerFirstName: "",
        registerLastName: "",
        registerMail: "",
        registerAddress: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        selectedYear : "Select your birth year",
        selectedCountry : "Select your country",
        selectedGender : "Select your gender",
        phoneNumber : "",
      },
      // Check error input :

      showPassword: shallowRef(false),
      errorFirstName : shallowRef(''),
      errorLastName : shallowRef(''),
      errorAddress : shallowRef(''),
      errorMail : shallowRef(''),
      errorPassword : shallowRef(''),
      errorPasswordConfirm : shallowRef('')

    }
  },
  name : "RegisterEtape1",

  beforeMount() {
    this.formData = registerFunction.formData;
      },

  methods : {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
     verifInput(){
       let blockNext = false;
       let inputFirstName = document.querySelector(".first-name");
       let inputLastName = document.querySelector(".last-name");
       let inputAddress = document.querySelector(".address");
       let inputEmail = document.querySelector(".email");
       let inputPassword = document.querySelector(".password");
       let inputPasswordConfirm = document.querySelector(".confirm-password");

       inputFirstName.style.borderColor = "#F4CE14";
       inputLastName.style.borderColor = "#F4CE14";
       inputAddress.style.borderColor = "#F4CE14";
       inputEmail.style.borderColor = "#F4CE14";
       inputPassword.style.borderColor = "#F4CE14";
       inputPasswordConfirm.style.borderColor = "#F4CE14";

       this.errorFirstName = "";
       this.errorLastName = "";
       this.errorAddress = "";
       this.errorMail = "";
       this.errorPassword = "";
       this.errorPasswordConfirm = "";

       if(this.formData.registerFirstName === ""){
          inputFirstName.style.borderColor = "red";
          this.errorFirstName = "First Name can't be empty";
          blockNext = true;
        }
        if(this.formData.registerLastName === ""){
          inputLastName.style.borderColor = "red";
          this.errorLastName = "Last Name can't be empty";
          blockNext = true;
        }
        if(this.formData.registerAddress === ""){
          inputAddress.style.borderColor = "red";
          this.errorAddress = "Address can't be empty";
          blockNext = true;
        }
        if(this.formData.registerMail === ""){
          inputEmail.style.borderColor = "red";
          this.errorMail = "Email can't be empty";
          blockNext = true;
        }
        if(this.formData.registerPassword === ""){
          inputPassword.style.borderColor = "red";
          this.errorPassword = "Password can't be empty";
          blockNext = true;
        }
        if(this.formData.registerPasswordConfirm  === ""){
          inputPasswordConfirm.style.borderColor = "red";
          this.errorPasswordConfirm = "Password can't be empty";
          blockNext = true;
        }

        return blockNext;
    },
    getFormData(){
       return this.formData;
    },

    checkPassword () {
       return this.formData.registerPassword === this.formData.registerPasswordConfirm;
    },

    checkPasswordLength(){
      return this.formData.registerPassword.length < 12;
    }

  }

}



</script>
<style scoped>

@import 'Css/Register.css';

.error-message {
  color: red;
  margin-top: 5px;
  margin-bottom: -20px;
}

</style>