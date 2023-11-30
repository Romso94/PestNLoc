<template>
  <div class="WelcomeContainer">
    <div class="formResearch">
      <form>
        <div class="divButtonWelcome">
          <button type = "button" class="sports" @click="changeImage('sportive')">Sportive</button>
          <button type = "button" class="electric" @click="changeImage('electric')">Electric</button>
          <button type = "button" class="Suv" @click="changeImage('suv')">Suv</button>
        </div>
        <br><br>
        <div class="divSearchWelcome">
          <div class="separatingsearch">
            <input type="search">
          </div>
          <div class="separating911">
            <img src="./assets/911.png" class="ImageWelcome911"/>
          </div>
        </div>
        <br><br>
        <div class="parallelebutton">
          <div class="divDateWelcome">
            <input type="date">
            <input type="date">
          </div>
          <br><br>
          <div class="separingshowcar">
            <button type="submit"> Show cars available</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import sportive from "./assets/sportsdrawing.png";
import electric from "./assets/Electric.jpg";
import suv from "./assets/Suv.jpg";

const changeImage = (carType) => {
  let image = document.querySelector('.ImageWelcome911');

  console.log(carType);
  switch (carType){

    case 'sportive' : {
      console.log('Sportive Car ')
      image.src = sportive;
      break;
    }
    case 'electric' : {
      console.log('Electric Car ')
      image.src = electric;
      break;
    }
    case 'suv' : {
      console.log('Suv Car ')
      image.src = suv;
      break;
    }

  }
}


</script>

<style scoped>
@import "Css/WelcomeComponent.css";
</style>