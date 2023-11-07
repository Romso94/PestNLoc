

<template>
  <div class="maindiv">

      <form>
        <div class=""></div>
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