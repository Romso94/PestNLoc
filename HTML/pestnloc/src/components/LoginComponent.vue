<template>
  <div class="maindiv">
    <div class="divFormulaire">
      <h1 class="titleLogin">Sign in</h1>
      <form class="formulaire">
        <input class="inputEmail" type="text" placeholder="Email" />
        <div class="password-container">
          <input
              class="inputPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="password"
          />
          <button type="button" class="togglePassword" @click="togglePasswordVisibility">
            <i v-if="showPassword" class="material-icons">visibility</i>
            <i v-else class="material-icons">visibility_off</i>
          </button>
        </div>
        <button class="submitLogin" type="submit">Login</button>
      </form>
      <a class="linkSignup" href="/register">Sign up</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const password = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submitForm = () => {
  // Ajoutez ici la logique pour soumettre le formulaire si nécessaire
  // Par exemple, vous pouvez ajouter une requête AJAX pour gérer la connexion
};
</script>

<style scoped>
@import 'Css/Login.css';





</style>
