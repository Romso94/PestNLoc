<template>
  <div class="formRegisterInputs">
    <div class="NameInput">
      <input type="text" id="FirstName" placeholder="First Name" required>

      <input type="text" id="LastName" placeholder="Last Name" required>
    </div>
    <div class="MailPasswordInput">
      <input type="email" id="email"  placeholder="Email" required>
      <input type="password" id="password" placeholder="Password" required>
      <input type="password" id="Confirmpassword" placeholder="Confirm Password" required>
    </div>
  </div>
  <br><br>
</template>

<script setup>

</script>

<style scoped>

@import 'Css/Register.css';

</style>