
<template>
  <header>
    <div class="divlogo">
      <a href="" @click="showComponent('home')">
        <img  class="logo" src="../assets/logo.png"/> <!--Logo -->
      </a>
    </div>

    <div class="divButton">
      <ul>
        <li>
          <a class="Rent">Rent</a>
        </li>

        <li>
          <a class="OurAgencies">Agencies</a>
        </li>

        <li>
          <a class="Contract"> Contracts</a>
        </li>

        <li>
          <div>
            <!--          <svg/>  Icon de Personne en svg -->
            <a @click="showComponent('login')" class="Profile"  :class="{ active: activeItem === 'login' }">Sign In</a>
          </div>
        </li>

        <li>
          <a class="Langue"> </a>
          <!--        <svg/>  Drapeaux Pour modifier la Langue-->
        </li>
      </ul>

    </div>

  </header>
</template>

<script setup>

import { defineEmits, ref } from 'vue';

const emit = defineEmits(['show-component']);
const activeItem = ref(null);

const showComponent = (componentName) => {
  emit('show-component', componentName);
  activeItem.value = componentName;
};


</script>

<style scoped>


@import 'Css/headerVue.css';
@import 'Css/Global.css';

</style>