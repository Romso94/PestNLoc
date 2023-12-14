<template>
  <div class="formRegisterInputs">
    <div class="NameInput">
      <h1 class="register-form-title">Driving Information</h1>
      <label for="fileInput" class="upload-label" >
        Upload a png of your License
      </label>
      <input type="file"  id="fileInput" class="licence" placeholder="Licence Photo" accept="image/*" style="display: none;">
      <h2 class="label-license-Date">Permit date</h2>
      <input type="date" class="date " placeholder="dd/mm/yyyy" v-model="formData.LicenseDateIssue" lang="en">
      <p v-if="errorDate" class="error-message">{{errorDate}}</p>
        <img class="jean-in-the-car" src="./assets/jeanvoiture.jpg">

    </div>
  </div>
</template>


<script>
import * as registerFunction from "./js/registerfunctions";
import {shallowRef} from "vue";

export default {
  data() {
    return{
      formData : {
        LicenseDateIssue: "",
      },
      errorDate : shallowRef(""),

    }
  },

  beforeMount() {
    this.formData = registerFunction.formData;
  },

  methods : {
    verifInput(){

      let blockNext = false;
      let LicenseDate = document.querySelector(".date");

      LicenseDate.style.borderColor = "#F4CE14";
      this.errorDate = "";

      if(this.formData.LicenseDateIssue === ""){
        LicenseDate.style.borderColor = "red";
        this.errorDate = "Fill up the date please !";
        blockNext = true;
      }

      return blockNext;

    }
  },
}

</script>



<style scoped>
@import 'Css/Register.css';

.error-message {
  text-align: center;
  font-size: 13px;
  color: red;
  margin-top: 5px;
  margin-bottom: -20px;
}

</style>