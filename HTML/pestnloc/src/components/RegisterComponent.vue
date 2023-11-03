<script setup>

</script>

<template>
  <div class="maindiv">

    <div class="formulaire">
      <form>

        <div class="formRegister">
          <tr>
            <td>
              <label for="name">Name</label>
              <input type="text" id="Name" required>
              <label for="email">Email</label>
              <input type="text" id="email" required>
              <br><br>
              <label for="password">Password</label>
              <input type="password" id="password" required>
              <br><br>
              <input class="bouton" type="submit" value="Register">
            </td>
            <td>
              <a href="/Login"  onclick="">You already have an account? Click Here to Sign In !</a>
            </td>
          </tr>

        </div>


      </form>

    </div>


  </div>

</template>

<style scoped>
@import 'Css/Register.css';

</style>