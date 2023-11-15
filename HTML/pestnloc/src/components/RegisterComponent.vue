<template>
  <div class="maindiv">
    <div class="formRegister">
      <component :is="currentStepComponent" />
      <button class="bouton" @click="showNextStep">Next</button>
      <a href="/login" onclick="">You already have an account? Click Here to Sign In!</a>
    </div>
  </div>
</template>

<script setup>
import { ref,computed } from 'vue';

const currentStep = ref(1);

const currentStepComponent = computed(() => {
  if (currentStep.value === 1) {
    return RegisterEtape1;
  } else if (currentStep.value === 2) {
    return RegisterEtape2;
  } else if (currentStep.value === 3) {
    return RegisterEtape3;
  } else {
  return RegisterEtape1;
}
});

const showNextStep = () => {
  currentStep.value += 1;
  if (currentStep.value > 3) currentStep.value = 1;
};

import RegisterEtape1 from "@/components/RegisterEtape1.vue";
import RegisterEtape2 from "@/components/RegisterEtape2.vue";
import RegisterEtape3 from "@/components/RegisterEtape3.vue";


//const  validatePassword = () => {
//  var password = document.getElementById("password").value;
//  var confirmPassword = document.getElementById("Confirmpassword").value;
//  var errorElement = document.getElementById("passwordMatchError");

//  if (password !== confirmPassword) {
//    errorElement.textContent = "Passwords do not match. Please try again.";
//    return false;
//  } else {
//    errorElement.textContent = "";
//    return true;
//  }
//}


</script>


<style scoped>
@import 'Css/Register.css';

</style>