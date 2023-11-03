<template>
  <div class="maindiv">

    <div class="formulaire">
      <form>

        <div class="formLogin">
          <tr>
            <td>
              <label for="email">Email</label>
              <input type="text" id="email" required>
              <br><br>
              <label for="password">Password</label>
              <input type="password" id="password" required>
              <br><br>
              <input class="bouton" type="submit" value="Login">
            </td>
            <td>
              <a href=""  onclick="">No account ? Click Here to Sign up !</a>
            </td>
          </tr>

        </div>


      </form>

    </div>


  </div>

</template>

<script setup>



</script>

<style scoped>
@import 'Css/Login.css';

</style>