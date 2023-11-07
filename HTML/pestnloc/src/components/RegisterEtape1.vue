<script setup>

</script>

<template>
  <div class="formRegisterInputs">
    <div class="NameInput">
      <label>Firs tName</label>
      <input type="text" id="FirstName" required>
      <label>Last Name</label>
      <input type="text" id="LastName" required>
    </div>
    <div class="MailPasswordInput">
      <label for="email">Email</label>
      <input type="text" id="email" required>

      <label for="password">Password</label>
      <input type="password" id="password" required>
      <label for="Confirmpassword">Confirm Password</label>
      <input type="password" id="Confirmpassword" required>

    </div>
  </div>


  <br><br>
</template>

<style scoped>

@import 'Css/Register.css';

</style>