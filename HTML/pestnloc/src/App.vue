<template>
  <HeaderApp @show-component="getComponentToShow" />
  <LoginComponent v-if="listComponentToShow.loginComponent === true" />


</template>

<script setup>

import HeaderApp from "@/components/HeaderApp";
import LoginComponent from "@/components/LoginComponent.vue";
import {ref} from "vue";


const listComponentToShow = ref({
  loginComponent: false,
  home: false,
});

const getComponentToShow = (nameComponent) =>{
  Object.keys(listComponentToShow.value).forEach((key) => {
    listComponentToShow[key] = false;
  });
   switch (nameComponent){
     case 'login' : {
       listComponentToShow.value.loginComponent = true;
       break;
     }


     default : {
       break;
     }

   }
}



</script>

<style>

</style>
