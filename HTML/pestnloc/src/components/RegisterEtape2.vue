<template>
  <div class="formRegisterInputs">
    <h1 class="register-form-title">Privacy Information</h1>
    <div class="register-wrapper">
      <img src="./assets/registerage.jpg" class="register-car-picture" />
      <div class="select-wrapper">
        <select id="sex" class="selector" v-model="selectedGender" required>
          <option value="Select your gender" disabled>Select your gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select id="monthOfBirth" class="selector" v-model="selectedMonth" required>
          <option value="Select your birth month" disabled>Select your birth month</option>
          <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
        </select>

        <select id="yearOfBirth" class="selector" v-model="selectedYear" required>
          <option value="Select your birth year" disabled>Select your birth year</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>

        <div class="phone-input">
          <select id="countryIndex" class="selector phone-selector" v-model="selectedCountry" required>
            <option value="Select your country" disabled>Select your country</option>
            <option v-for="country in sortedCountries" :key="country.name" :value="country">
              {{ country.name }}
            </option>
          </select>
          <input class="phone-number" placeholder="Phone number">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const selectedMonth = ref("Select your birth month");
const selectedYear = ref("Select your birth year");
const selectedCountry = ref("Select your country");
const selectedGender = ref("Select your gender");

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = Array.from({ length: 100 }, (_, index) => 2023 - index);
const sortedCountries = ref([]);
const countryData = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    if (Array.isArray(countries) && countries.length > 0) {
      countryData.value = countries.map(country => {
        const name = country.name?.common || '';
        const flag = country.flags?.svg || '';
        const index = country.cca2 || '';
        return { name, flag, index };
      });

      countryData.value = countryData.value.filter(country => country.name !== 'Afghanistan' && country.flag !== 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg');
      sortedCountries.value = countryData.value.sort((a, b) => a.name.localeCompare(b.name));
      console.log(sortedCountries);
    } else {
      console.error('Country data is empty or undefined.');
    }
  } catch (error) {
    console.error('Error fetching country data:', error);
  }
});
</script>

<style scoped>
@import 'Css/Register.css';
</style>
