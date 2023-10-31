<script setup>

</script>

<template>
  <tr>
    <td>
      <label for="email">Email</label>
      <input type="text" id="email" required>
      <br><br>

      <label for="password">Password</label>
      <input type="password" id="password" required>
      <br><br>

      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" required>
      <br><br>

      <input class="bouton" type="submit" value="S'enregistrer">
    </td>
  </tr>
</template>

<style scoped>
@import 'Css/Login.css';

</style>