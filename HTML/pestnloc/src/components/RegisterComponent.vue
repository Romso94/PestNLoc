<template>
  <div class="maindiv">
    <div class="formRegister">
      <component :is="currentStepComponent" />
      <div class="button-container">
        <button class="bouton" @click="showPreviousStep" :disabled="currentStep.value === 1">Previous</button>
        <button class="bouton" @click="showNextStep">Next</button>
      </div>
      <a href="/login" onclick="">You already have an account? Click Here to Sign In!</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import RegisterEtape1 from "@/components/RegisterEtape1.vue";
import RegisterEtape2 from "@/components/RegisterEtape2.vue";
import RegisterEtape3 from "@/components/RegisterEtape3.vue";

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

const showPreviousStep = () => {
  currentStep.value = currentStep.value === 1 ? 1 : currentStep.value - 1;
};
</script>

<style scoped>
@import 'Css/Register.css';
</style>
