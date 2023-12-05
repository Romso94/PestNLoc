<template>
  <div class="maindiv">
    <div class="divFormulaire">
      <h1 class="titleLogin">Sign in</h1>
      <form class="formulaire" @submit.prevent="submitLoginForm">
        <input class="inputEmail" type="text" placeholder="Email" v-model="email" />
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

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submitLoginForm = async () => {
  try {
    const response = await fetch('/pestnloc/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email.value,
        Password: password.value,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    // Traitez le résultat comme nécessaire (par exemple, redirigez l'utilisateur, stockez le token, etc.)
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    // Traitez l'erreur de manière appropriée (affichez un message d'erreur, par exemple)
  }
};
</script>

<style scoped>
@import 'Css/Login.css';
</style>
