

<template>

  <div class="formRegisterInputs">
    <label for="age">Âge :</label>
    <input type="number" id="age" name="age" required>
    <br>



    <label for="codePays">Code pays :</label>
    <input type="text" id="codePays" name="codePays" pattern="\+\d{1,4}" required>
    <br>

    <label for="telephone">Numéro de téléphone :</label>
    <input type="tel" id="telephone" name="telephone" pattern="\d{9,15}" required>
    <small>Format : 1234567890 (sans espace)</small>


    <label for="sexe">Sexe :</label>
    <select id="sexe" name="sexe" required>
      <option value="homme">Homme</option>
      <option value="femme">Femme</option>
      <option value="autre">Autre</option>
    </select>

  </div>
</template>

<script setup>


</script>

<style scoped>
@import 'Css/Register.css';
</style>