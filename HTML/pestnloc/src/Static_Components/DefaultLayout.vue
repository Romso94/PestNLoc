<template>
  <div>
    <HeaderApp/>
    <router-view/>
    <div v-if="isHomePage">
      <WelcomeComponent/>
    </div>
    <FooterComponent/>
  </div>
</template>

<script setup>

import HeaderApp from "@/Static_Components/HeaderApp.vue";
import FooterComponent from "@/Static_Components/FooterComponent.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import WelcomeComponent from "@/components/WelcomeComponent.vue";

const router = useRouter();
const isHomePage = computed(() => router.currentRoute.value.path === "/");
</script>

<style scoped>

</style>