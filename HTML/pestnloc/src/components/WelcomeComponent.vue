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
            <img :src="imgsport" class="ImageWelcome911"/>
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
import imagesport from "@/assets/911.png"
import imagesportive from "@/assets/sportive.jpg"
import imageElectric from "@/assets/Electric.jpg"
import imageSuv from "@/assets/Suv.jpg"

let imgsport = imagesport
const changeImage = (cartype) => {
  switch (cartype) {
    case "sportive":
      console.log(imgsport)
      imgsport = imagesportive;
      console.log(imgsport)
      break;
    case "electric":
      imgsport = imageElectric;
      break;
    case "suv":
      imgsport= imageSuv;
      break;
    default:
      break;
  }
};
</script>

<style scoped>
@import "Css/WelcomeComponent.css";
</style>