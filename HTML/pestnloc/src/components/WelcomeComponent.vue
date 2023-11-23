<template>
  <div class="WelcomeContainer">
      <div class="formResearch">
        <form>
          <div class="divButtonWelcome">
            <!--          Choix du type de la voiture -->
            <button class="sports" @click="showImage('sportive')">Sportive</button>
            <button class="electric" @click="showImage('electric')">Electric</button>
            <button class="Suv" @click="showImage('suv')">Suv</button>
          </div>
          <br><br>
          <div class="divSearchWelcome">
            <input type="search">
          </div>
          <img :src="carImage" class = "showCarImage"/>
          <br><br>
          <div class="parallelebutton">
          <div class="divDateWelcome">
            <input type="date">
            <input type="date">
          </div>

          <br><br>
          <div class="separing">
          <button type="submit"> Show Cars</button>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script setup>
let carImage = '';

function showImage(carType) {
  switch (carType) {
    case 'sportive':
      console.log("sportive");
      carImage = '/src/assets/sportsdrawing.png';
      console.log("image change");
      break;

    case 'electric':
      carImage = '/src/assets/A45.jpg';

      break;

    case 'suv':
      carImage = '/src/assets/A45.jpg';
      break;
  }
}

</script>

<style scoped>

  @import "Css/WelcomeComponent.css";

</style>