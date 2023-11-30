<template>
  <div class ="topMain"/>

  <section>
    <h2>Mercedes A45 AMG</h2>
    <br>
    <img src="./assets/A45.jpg" alt="Voiture à louer">

    <p>Description de la voiture à louer.</p>
    <br>
    <p>Tarif de Location: $400 par jour</p>

    <button @click="louerVoiture()">Louer Maintenant</button>
    <h2>Audi Rs3</h2>
    <img src="./assets/rs3.jpg" alt="Voiture à louer">
    <br>
    <p>Description de la voiture à louer.</p>
    <br>
    <p>Tarif de Location: $400 par jour</p>

    <button @click="louerVoiture()">Louer Maintenant</button>
    </section>


</template>

<script setup>
function louerVoiture() {
  alert("Félicitations ! Vous avez loué la voiture !");
}

</script>

<style scoped>

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}



section {
  max-width: 1300px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

img {
  max-width: 40%;
  height: auto;
}

button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>