<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Rent of car
      <v-btn @click="logout" color="primary" class="ml-auto">Logout</v-btn>
    </v-card-title>
    <v-data-table v-model:search="search" :items="items">
      <template v-slot:header.stock>
        <div class="text-end">Stock</div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import jsonData from '@/Json/car.json';
const items = jsonData;

const logout = () => {
  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  window.location.href = '/login';
};
</script>

<style scoped>

</style>
