<template>
  <div class="formRegisterInputs">
    <h1 class="register-form-title">Privacy Information</h1>
    <div class="register-wrapper">
      <img src="./assets/registerage.jpg" class="register-car-picture" />
      <div class="select-wrapper">
        <select id="sex" class="selector" v-model="formData.selectedGender" required>
          <option value="Select your gender" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select id="monthOfBirth" class="selector" v-model="formData.selectedMonth" required>
          <option value="Select your birth month" disabled>Select your birth month</option>
          <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
        </select>

        <select id="yearOfBirth" class="selector" v-model="formData.selectedYear" required>
          <option value="Select your birth year" disabled>Select your birth year</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>

        <div class="phone-input">
          <select id="countryIndex" class="selector phone-selector" v-model="formData.selectedCountry" required>
            <option value="Select your country" disabled>Select your country</option>
            <option v-for="country in sortedCountries" :key="country.name" :value="country">
              {{ country.name }}
            </option>
          </select>
          <input class="phone-number" placeholder="Phone number" v-model="formData.phoneNumber">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue';
import * as registerFunction from "../components/registerfunctions";


export default {
  data() {
    return{
      formData  : {
        registerFirstName: "",
        registerLastName: "",
        registerMail: "",
        registerAddress: "",
        registerPassword: "",
        registerPasswordConfirm: "",
        selectedMonth : "Select your birth month",
        selectedYear : "Select your birth year",
        selectedCountry : "Select your country",
        selectedGender : "Select your gender",
        phoneNumber : "",
      },
       months : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       years : Array.from({ length: 100 }, (_, index) => 2023 - index),
       sortedCountries : ref([]),
       countryData : ref([])
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
    fillFormData(formData) {
      this.formData = formData;
      RegisterEtape1.fillData1(this.formData);
    },

  },
}






</script>

<style scoped>
@import 'Css/Register.css';
</style>
