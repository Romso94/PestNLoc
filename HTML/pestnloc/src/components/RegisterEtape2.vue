

<template>

  <div class="formRegisterInputs">

    <select id="dayOfBirth" v-model="selectedDay" required>
      <option value="" disabled>Sélectionnez le jour</option>
      <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
    </select>



    <select id="monthOfBirth" v-model="selectedMonth" required>
      <option value="" disabled>Sélectionnez le mois</option>
      <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
    </select>


    <select id="yearOfBirth" v-model="selectedYear" required>
      <option value="" disabled>Sélectionnez l'année</option>
      <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
    </select>


    <div>
      <select id="countryIndex">
      </select>
      <input class="phone-numer" placeholder="phone-number">
    </div>

  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';


const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const years = Array.from({ length: 100 }, (_, index) => 2023 - index);


const countryData = ref([]);

onMounted(async () => {
  try {
    // Récupérons les données des pays avec calling codes
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();

    // Assurez-vous que les données des pays sont définies et non vides
    if (Array.isArray(countries) && countries.length > 0) {
      // Mettons à jour la référence countryData avec les données des pays
      countryData.value = countries.map(country => {
        const name = country.name?.common || '';
        const flag = country.flags?.svg || '';
        const callingCode = country.idd?.root || '';

        return { name, flag, callingCode };
      });


      console.log(countryData.value);
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
