<template>
  <HeaderApp/>
  <router-view/>
  <div v-if="isHomePage">
    <WelcomeComponent/>
  </div>

<FooterComponent/>


</template>

<script setup>
import HeaderApp from "@/Static_Components/HeaderApp";
import FooterComponent from "@/Static_Components/FooterComponent.vue";

import { computed } from "vue";
import { useRouter } from "vue-router";
import WelcomeComponent from "@/components/WelcomeComponent";


const router = useRouter();

const isHomePage = computed(() => router.currentRoute.value.path === "/");



</script>

<style scoped>

</style>