<template>
  <div class="formRegisterInputs">
    <h1 class="register-form-title">Personal Informations</h1>
    <div class="wrap-input">
    <div class="NameInput">
      <input type="text" class="first-name input-text" v-model="registerFirstName" placeholder="First Name" required>
      <input type="text" class="last-name input-text" placeholder="Last Name" v-model="registerLastName" required>
      <input type="text" class="address input-text" placeholder="Address" v-model="registerAddress" required>
    </div>
    <div class="MailPasswordInput">
      <input type="email" class="email input-text"  placeholder="Email"  v-model="registerMail" required>
      <input type="password" class="password input-text" placeholder="Password"   v-model="registerPassword" required>
      <input type="password" class="confirm-password input-text" placeholder="Confirm Password" required>
    </div>
    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";

const registerFirstName = ref('');
const registerLastName = ref('');
const registerAddress = ref('');
const registerMail = ref('');
const registerPassword = ref('');
const registerPasswordConfirm = ref('');




</script>

<style scoped>

@import 'Css/Register.css';

</style>