<template>
  <div class="formRegisterInputs">
    <select id="Genre" required>
      <option value="Homme">Homme</option>
      <option value="Femme">Femme</option>
      <option value="Autre">Autre</option>
    </select>

    <select id="dayOfBirth" v-model="selectedDay" required>
      <option value="Select your birth day" disabled>Select your birth day</option>
      <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
    </select>

    <select id="monthOfBirth" v-model="selectedMonth" required>
      <option value="Select your birth month" disabled>Select your birth month</option>
      <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
    </select>

    <select id="yearOfBirth" v-model="selectedYear" required>
      <option value="Select your birth year" disabled>Select your birth year</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>


    <select id="countryIndex" v-model="selectedCountry" required>
      <option value="Select your country" disabled>Select your country</option>
      <option v-for="country in sortedCountries" :key="country.name" :value="country">
        <img v-if="country.flag" :src="country.flag" alt="Flag" class="country-flag" />
        {{ country.name }}
      </option>
    </select>
    <input class="phone-number" placeholder="phone-number">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const selectedDay = ref("Select your birth day");
const selectedMonth = ref("Select your birth month");
const selectedYear = ref("Select your birth year");
const selectedCountry = ref("Select your country");

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const years = Array.from({ length: 100 }, (_, index) => 2023 - index);
const sortedCountries = ref([]);

const countryData = ref([]);



onMounted(async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    if (Array.isArray(countries) && countries.length > 0)  {
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
      console.error('Les données des pays sont vides ou non définies.');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données des pays :', error);
  }
});


</script>

<style scoped>
@import 'Css/Register.css';


</style>
