<template>
  <div class="topMain">
    <v-data-table :items="contractData"></v-data-table>

  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

const contractData = ref([
  {
    "Contract_Availability": 365,
    "Start_Date": "2023-01-15",
    "Price": "150.0",
    "End_Date": "2023-02-15",
    "Id_Client": 1,
    "Id_Registration": "ABC123"
  },
  {
    "Contract_Availability": 365,
    "Start_Date": "2023-02-01",
    "Price": "200.0",
    "End_Date": "2023-03-01",
    "Id_Client": 2,
    "Id_Registration": "DEF456"
  }
]);

onMounted(async () => {
  console.log(contractData);
});


</script>

<style scoped>

p{
  display: flex;
  align-items: center;
  justify-content: center;
}

.topMain{
  background: var(--pestnlocColor);
  height: 2500px;
  width: 100%;
  margin-top: 50px;
}

</style>