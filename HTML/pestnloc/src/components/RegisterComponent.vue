

<template>
  <div class="maindiv">

      <form class="formRegister">




          <input class="bouton" type="submit" value="Register" @click="validatePassword">

          <a href="/login"  onclick="">You already have an account? Click Here to Sign In !</a>






      </form>

  </div>





</template>

<script setup>

const  validatePassword = () => {
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("Confirmpassword").value;
  var errorElement = document.getElementById("passwordMatchError");

  if (password !== confirmPassword) {
    errorElement.textContent = "Passwords do not match. Please try again.";
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}


</script>


<style scoped>
@import 'Css/Register.css';

</style>