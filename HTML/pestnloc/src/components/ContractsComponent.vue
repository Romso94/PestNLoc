

<template>
  <div class="topMain">
    <table>
      <thead>
      <tr>
        <th>Availability</th>
        <th>Start Date</th>
        <th>Price</th>
        <th>End Date</th>
        <th>Client ID</th>
        <th>Registration ID</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="contract in contractData" :key="contract.Id_Registration">
        <td>{{ contract.Contract_Availability }}</td>
        <td>{{ contract.Start_Date }}</td>
        <td>{{ contract.Price }}</td>
        <td>{{ contract.End_Date }}</td>
        <td>{{ contract.Id_Client }}</td>
        <td>{{ contract.Id_Registration }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

const contractData = ref([]);

onMounted(async () => {

  const jsonData = await import('@/Json/Contract.json');
  contractData.value = jsonData;
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