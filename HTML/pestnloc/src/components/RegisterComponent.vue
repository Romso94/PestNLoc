<template>
  <div class="maindiv">
    <div class="divFormulaire">
      <div class="div-steper">
        <div class="image-steper">
          <img class="svg-car" src="./assets/sportcar-stepper.svg" />
        </div>

        <div class="steper-line">
          <div class="steper-line-first"></div>
          <div class="steper-line-second"></div>
        </div>

        <div class="steper-text">
          <p class="steper-text1" >1. Identity</p>
          <p class="steper-text2" >2. Age</p>
          <p class="steper-text3" >3. License</p>
        </div>
      </div>
      <component :is="currentStepComponent" />
      <div class="button-container">
        <button class="previous-button" @click="showPreviousStep" :disabled="currentStep.value === 1" >Previous</button>
        <button class="next-button" @click="showNextStep" v-show="areButtonsVisible ">Next</button>
        <button class="send-button" v-if="isLastStep"  @click="sendFunction" v-show="!areButtonsVisible">Send</button>
      </div>
      <a href="/login" class="sign-in">Sign In</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import RegisterEtape1 from "@/components/RegisterEtape1.vue";
import RegisterEtape2 from "@/components/RegisterEtape2.vue";
import RegisterEtape3 from "@/components/RegisterEtape3.vue";

const currentStep = ref(1);



onMounted(() => {
  const textStep1 = document.querySelector(".steper-text1");
  if (textStep1) {
    textStep1.classList.add("currentStep");
  }
});

const currentStepComponent = computed(() => {
  const textStep1 = document.querySelector(".steper-text1");
  const textStep2 = document.querySelector(".steper-text2");
  const textStep3 = document.querySelector(".steper-text3");

  const carSVG = document.querySelector(".image-steper");
  const progressBar1 = document.querySelector(".steper-line-first");
  const progressBar2 = document.querySelector(".steper-line-second");

  if (textStep1) {
    if (currentStep.value === 1) {
      textStep1.classList.add("currentStep");
      carSVG.style.justifyContent = "left";
      progressBar1.style.backgroundColor = "#45474B";
      progressBar2.style.backgroundColor = "#45474B";
    } else {
      textStep1.classList.remove("currentStep");
    }
  }
  if (textStep2) {
    if (currentStep.value === 2) {
      textStep2.classList.add("currentStep");
      carSVG.style.justifyContent = "center";
      progressBar1.style.backgroundColor = "#F4CE14";
      progressBar2.style.backgroundColor = "#45474B";
    } else {
      textStep2.classList.remove("currentStep");
    }
  }
  if (textStep3) {
    if (currentStep.value === 3) {
      textStep3.classList.add("currentStep");
      carSVG.style.justifyContent = "right";
      progressBar1.style.backgroundColor = "#F4CE14";
      progressBar2.style.backgroundColor = "#F4CE14";
    } else {
      textStep3.classList.remove("currentStep");
    }
  }

  if (currentStep.value === 1) {
    return RegisterEtape1;
  } else if (currentStep.value === 2) {
    return RegisterEtape2;
  } else if (currentStep.value === 3) {
    return RegisterEtape3;
  }
});

const showNextStep = () => {
  console.log('Before: currentStep.value', currentStep.value);
  if (currentStep.value < 3) {
    currentStep.value += 1;
  }
  console.log('After: currentStep.value', currentStep.value);
};

const showPreviousStep = () => {
  currentStep.value = currentStep.value === 1 ? 1 : currentStep.value - 1;
};

const areButtonsVisible = computed(() => {
  return currentStep.value !== 3;
});

const isLastStep = computed(() => {
  return currentStep.value === 3;
});

const sendFunction = () => {
  console.log('Send button clicked!');
};
</script>

<style scoped>
@import 'Css/Register.css';
</style>
