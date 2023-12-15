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
          <p class="steper-text1">1. Identity</p>
          <p class="steper-text2">2. Privacy</p>
          <p class="steper-text3">3. License</p>
        </div>
      </div>
      <component :is="currentStepComponent"  ref="currentStep"   />
      <div class="button-container">
        <button class="previous-button" @click="showPreviousStep" :disabled="currentStep.value === 1">Previous</button>
        <button class="next-button" @click="showNextStep" v-show="areButtonsVisible()">Next</button>
        <button class="send-button" @click="sendFunction" v-show="isLastStep()">Send</button>

      </div>


      <a href="/login" class="sign-in">Sign In</a>
    </div>
  </div>
</template>

<script>
import RegisterEtape1 from "@/components/RegisterEtape1.vue";
import RegisterEtape2 from "@/components/RegisterEtape2.vue";
import RegisterEtape3 from "@/components/RegisterEtape3.vue";

import * as registerFunction from "./js/registerfunctions";
import {  watch,shallowRef} from "vue";
import {formData} from "./js/registerfunctions";
import router from "../router";




export default {
  name : "RegisterComponent",
  data() {
    return {
      currentStep: shallowRef(1),
      currentStepComponent: shallowRef(RegisterEtape1),
      isModalVisible: false,
      modalErrorMessage: "",
    };
  },
  components : {
    RegisterEtape1,
    RegisterEtape2,
    RegisterEtape3,
  },

  beforeMount() {
    watch(() => this.currentStep, () => {
      this.updatecurrentStepComponent();
    });
  },
  methods: {

    updatecurrentStepComponent() {
      const textStep1 = document.querySelector(".steper-text1");
      const textStep2 = document.querySelector(".steper-text2");
      const textStep3 = document.querySelector(".steper-text3");

      const carSVG = document.querySelector(".image-steper");
      const progressBar1 = document.querySelector(".steper-line-first");
      const progressBar2 = document.querySelector(".steper-line-second");

      if (textStep1) {
        if (this.currentStep === 1) {
          textStep1.classList.add("currentStep");
          carSVG.style.justifyContent = "left";
          progressBar1.style.backgroundColor = "#45474B";
          progressBar2.style.backgroundColor = "#45474B";
        } else {
          textStep1.classList.remove("currentstep");
        }
      }
      if (textStep2) {
        if (this.currentStep === 2) {
          textStep2.classList.add("currentstep");
          carSVG.style.justifyContent = "center";
          progressBar1.style.backgroundColor = "#F4CE14";
          progressBar2.style.backgroundColor = "#45474B";
        } else {
          textStep2.classList.remove("currentstep");
        }
      }
      if (textStep3) {
        if (this.currentStep === 3) {
          textStep3.classList.add("currentstep");
          carSVG.style.justifyContent = "right";
          progressBar1.style.backgroundColor = "#F4CE14";
          progressBar2.style.backgroundColor = "#F4CE14";
        } else {
          textStep3.classList.remove("currentstep");
        }
      }

      if (this.currentStep === 1) {
        this.currentStepComponent = RegisterEtape1;
      } else if (this.currentStep === 2) {
        this.currentStepComponent = RegisterEtape2;
      } else if (this.currentStep === 3) {
        this.currentStepComponent = RegisterEtape3;
      }
    },

    showNextStep() {
      if (this.currentStep < 3) {
        if(this.currentStep === 1){
          if (this.$refs.currentStep.verifInput()){
            return
          }
          if(!this.$refs.currentStep.checkPassword()){
            alert("Password Doesn't match");
            return;
          }
          if(this.$refs.currentStep.checkPasswordLength()){
            alert("Password need to be 12 caracters or more !");
            return;
          }
        }
        if(this.currentStep === 2){
          if(this.$refs.currentStep.verifSelect()){
            return;
          }

        }
        this.currentStep += 1;
      }
    },
    showPreviousStep() {
      this.currentStep = this.currentStep === 1 ? 1 : this.currentStep - 1;
    },

    areButtonsVisible() {
      return this.currentStep !== 3;
    },

    isLastStep() {
      return this.currentStep === 3;
    },

    async sendFunction() {
      if(this.currentStep === 3){
        if(this.$refs.currentStep.verifInput()){
          return;
        }
        let registerFirstName = formData.registerFirstName;
        let registerLastName = formData.registerLastName;
        let registerMail = formData.registerMail;
        let registerAddress = formData.registerAddress;
        let registerPassword = formData.registerPassword
        let registerPasswordConfirm = formData.registerPasswordConfirm;
        let selectedYear = formData.selectedYear;
        let selectedCountry = formData.selectedCountry.name;
        let selectedGender = formData.selectedGender;
        let phoneNumber = formData.phoneNumber;
        let LicenseDateIssue = formData.LicenseDateIssue;

        try{
          const response = await  fetch("http://localhost:9000/pestnloc/register", {
            method : 'POST',
            headers: {
              'Content-Type': 'application/json',

            },
            body: JSON.stringify({
              "Name": registerFirstName,
              "LastName": registerLastName,
              "YearOfBirth": selectedYear,
              "Address": registerAddress,
              "Date_Permis_Issue": LicenseDateIssue,
              "Email": registerMail,
              "Phone_Number": phoneNumber,
              "Password": registerPassword,
              "Country" : selectedCountry,
              "Gender"  : selectedGender,
            }),
          });

          if(response.ok){
            await router.push("/login");
          }

        }catch (error){
          console.log("Error",error)
        }
      }

    },

  }
};
</script>

<style scoped>
@import 'Css/Register.css';
</style>