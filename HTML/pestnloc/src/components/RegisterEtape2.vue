<template>
  <div class="formRegisterInputs">
    <h1 class="register-form-title">Privacy Information</h1>
    <div class="register-wrapper">
      <img src="./assets/registerage.jpg" class="register-car-picture" />
      <div class="select-wrapper">

        <select id="gender" class="selector gender" v-model="formData.selectedGender" required>
          <option value="Select your gender" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <p v-if="errorGender" class="error-message">{{ errorGender }}</p>



        <select id="yearOfBirth" class="selector yearOfBirth"  v-model="formData.selectedYear" required>
          <option value="Select your birth year" disabled>Select your birth year</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
        <p v-if="errorYear" class="error-message">{{ errorYear }}</p>

        <select id="countrySelector" class="selector country-selector " v-model="formData.selectedCountry" required>
          <option value="Select your country" disabled>Select your country</option>
          <option v-for="country in sortedCountries" :key="country.name" :value="country">
            {{ country.name }}
          </option>
        </select>
        <p v-if="errorCountry" class="error-message">{{ errorCountry }}</p>

        <input pattern="[0-9]*" class="phone-number" placeholder="Phone number" v-model="formData.phoneNumber" maxlength="12">
        <p v-if="errorPhone" class="error-message">{{ errorPhone }}</p>

      </div>
    </div>
  </div>
</template>

<script>
import { shallowRef} from 'vue';
import * as registerFunction from "./js/registerfunctions";


export default {
  data() {
    return{
       years : Array.from({ length: 100 }, (_, index) => 2023 - index),
       sortedCountries : shallowRef([]),
       countryData : shallowRef([]),
       errorGender : shallowRef(''),
       errorYear : shallowRef(''),
       errorCountry : shallowRef(''),
       errorPhone : shallowRef(''),
    }
  },


  async beforeMount()  {

    this.formData = registerFunction.formData;

    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();

      if (Array.isArray(countries) && countries.length > 0) {
        this.countryData = countries.map(country => {
          const name = country.name?.common || '';
          const flag = country.flags?.svg || '';
          const index = country.cca2 || '';
          return {name, flag, index};
        });

        this.countryData = this.countryData.filter(country => country.name !== 'Afghanistan' && country.flag !== 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg');
        this.sortedCountries = this.countryData.sort((a, b) => a.name.localeCompare(b.name));

      } else {
        console.error('Country data is empty or undefined.');
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  },

  methods : {
    getFormData() {
      return this.formData;
    },

    verifSelect(){

      let blockNext = false;

      let selectedYear = document.querySelector(".yearOfBirth");
      let selectedCountry = document.querySelector(".country-selector");
      let selectedGender = document.querySelector(".gender");
      let phone_number = document.querySelector(".phone-number");

      selectedYear.style.borderColor = "#F4CE14";
      selectedCountry.style.borderColor = "#F4CE14";
      selectedGender.style.borderColor = "#F4CE14";
      phone_number.style.borderColor = "#F4CE14";

      this.errorGender = '';
      this.errorYear = '';
      this.errorCountry = '';
      this.errorPhone = '';

      if(this.formData.selectedGender === "Select your gender"){
        selectedGender.style.borderColor = "red";
        this.errorGender = "Please select your gender";
        blockNext=true;
      }

      if(this.formData.selectedYear === "Select your birth year"){
        selectedYear.style.borderColor = "red";
        this.errorYear = "Please select your year of birth";
        blockNext = true;
      }

      if(this.formData.selectedCountry === "Select your country"){
        selectedCountry.style.borderColor = "red";
        this.errorCountry = "Please select your country";
        blockNext = true;
      }

      if(this.formData.phoneNumber === ''){
        phone_number.style.borderColor = "red";
        this.errorPhone = "Please enter a phone number ";
        blockNext = true;
      }

      return blockNext;


    }
  },
}






</script>

<style scoped>
@import 'Css/Register.css';

.phone-number:invalid{
  animation: shake 300ms;
  border-color: red;

}

@keyframes shake {
  0%, 100% { transform: translate(0);}
  25% {transform: translate(0.125rem);}
  75% {transform: translate(-0.125rem);}

}

.error-message {
  text-align: center;
  font-size: 13px;
  color: red;
  margin-top: 5px;
  margin-bottom: -20px;
}
</style>
