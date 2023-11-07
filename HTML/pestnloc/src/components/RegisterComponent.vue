

<template>
  <div class="maindiv">

    <div class="formulaire">
      <form>

        <div class="formRegister">
          <tr>
            <td>
              <label for="name">FirstName</label>
              <input type="text" id="FirstName" required>
              <label for="name">LastName</label>
              <input type="text" id="LastName" required>
              <label for="email">Email</label>
              <input type="text" id="email" required>


                <label for="password">Password</label>
                <input type="password" id="password" required>
                <label for="Confirmpassword">Confirm Password</label>
                <input type="password" id="Confirmpassword" required>


              <br><br>

              <input class="bouton" type="submit" value="Register" @click="validatePassword">
            </td>
            <td>
              <a href="/login"  onclick="">You already have an account? Click Here to Sign In !</a>
            </td>
          </tr>

        </div>


      </form>

    </div>


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