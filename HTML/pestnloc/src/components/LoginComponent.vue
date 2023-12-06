<template>
  <div class="maindiv">
    <div class="divFormulaire">
      <h1 class="titleLogin">Sign in</h1>
      <form class="formulaire" @submit.prevent="submitLoginForm">
        <input class="inputEmail" type="text" placeholder="Email" v-model="email" />
        <p v-if="errorEmptyMail" class="error-message">{{ errorEmptyMail }}</p>
        <div class="password-container">
          <input class="inputPassword" :type="showPassword ? 'text' : 'password'" placeholder="Password"  v-model="password" />
          <button type="button" class="togglePassword" @click="togglePasswordVisibility">
            <i v-if="showPassword" class="material-icons">visibility</i>
            <i v-else class="material-icons">visibility_off</i>
          </button>
        </div>
        <p v-if="errorEmptyPassword" class="error-message">{{ errorEmptyPassword }}</p>
        <button class="submitLogin" type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <a class="linkSignup" href="/register">Sign up</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();
const errorMessage = ref('');
const errorEmptyMail = ref('');
const errorEmptyPassword = ref('');

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submitLoginForm = async () => {
  let inputEmail = document.querySelector(".inputEmail");
  let inputPass = document.querySelector(".inputPassword");
  inputEmail.style.borderColor = "#F4CE14";
  inputPass.style.borderColor = "#F4CE14";
  errorEmptyMail.value = "";
  errorEmptyPassword.value = "";
  if(email.value===''){
  inputEmail.style.borderColor = "red";
  errorEmptyMail.value = "Mail can't be empty !"
  return
  }
  if(password.value===""){
    inputPass.style.borderColor = "red";
    errorEmptyPassword.value = "Password can't be empty !"
    return
  }
  try {
    const response = await fetch('http://localhost:9000/pestnloc/login', {
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
    const token = result.token;

    document.cookie = `jwt=${token}; path=/; secure; samesite=strict`;

    console.log('Token from server:', document.cookie);

    // Rediriger vers la page '/Rent'
    router.push('/Rent');

  } catch (error) {
    console.error('Erreur lors de la requête :', error);


    errorMessage.value = 'Wrong Email or Password ! Try again';
  }
};
</script>

<style scoped>
@import 'Css/Login.css';

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
