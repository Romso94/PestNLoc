

<template>

  <div class="formRegisterInputs">
    <h1 class="register-form-title">Personal Informations</h1>
    <div class="wrap-input">
      <!-- raccourcis les input -->
    <div class="NameInput">
        <input type="text" class="age input-text" placeholder="Age" required>
        <input type="text" class="country input-text" placeholder="Country Code" pattern="\+\d{1,4}" required>
      <input type="tel" id="phone" name="phone" class="tel input-text" placeholder="Phone number" pattern="\d{10}" required>
      <select id="sexe" class= "sex input-text" name="sexe" required>
        <option value="homme">Homme</option>
        <option value="femme">Femme</option>
        <option value="autre">Autre</option>
      </select>
    </div>





      </div>










  </div>
</template>

<script setup>


</script>

<style scoped>
@import 'Css/Register.css';
</style>