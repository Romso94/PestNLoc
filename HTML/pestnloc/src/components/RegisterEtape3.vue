<script setup>

</script>

<template>
  <label for="licensePhoto"> Driving license Photo :</label>
  <input type="file" id="licensePhoto" name="licensePhoto" accept="image/*" required>

  <label for="dateOfIssue">Permit issue date :</label>
  <input type="date" id="dateOfIssue" name="dateOfIssue" required>
</template>

<style scoped>
@import 'Css/Register.css';
</style>