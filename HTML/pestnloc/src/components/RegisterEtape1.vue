<template>
  <div class="formRegisterInputs">
    <h1 class="register-form-title">Personal Informations</h1>
    <div class="wrap-input">
    <div class="NameInput">
      <input type="text" class="first-name input-text"  placeholder="First Name" required>
      <input type="text" class="last-name input-text" placeholder="Last Name"  required>
      <input type="text" class="address input-text" placeholder="Address"  required>
    </div>
    <div class="MailPasswordInput">
      <input type="email" class="email input-text"  placeholder="Email"   required>
      <input type="password" class="password input-text" placeholder="Password"    required>
      <input type="password" class="confirm-password input-text" placeholder="Confirm Password" required>
    </div>
    </div>
  </div>

</template>

<script>

import {ref} from "vue";

// const registerFirstName = ref('');
// const registerLastName = ref('');
// const registerAddress = ref('');
// const registerMail = ref('');
// const registerPassword = ref('');
// const registerPasswordConfirm = ref('');

export default {
  data () {
    return {

    }
  },

  methods : {
     truc(){
    console.log("test");
    }
  }

}



</script>
<style scoped>

@import 'Css/Register.css';

</style>