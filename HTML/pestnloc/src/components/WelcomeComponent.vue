<template>
  <div class="WelcomeContainer">
    <div class="formResearch">
      <form>
        <div class="divButtonWelcome">
          <button type = "button" class="sports" @click="changeImage('sportive')">Sportive</button>
          <button class="electric" @click="changeImage('electric')">Electric</button>
          <button class="Suv" @click="changeImage('suv')">Suv</button>
        </div>
        <br><br>
        <div class="divSearchWelcome">
          <div class="separatingsearch">
            <input type="search">
          </div>
          <div class="separating911">
            <img :src="image.src" class="ImageWelcome911"/>
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
let image = {
  src: "@/assets/911.png"
};

const changeImage = (cartype) => {
  switch (cartype) {
    case "sportive":
      image.src = "@/assets/sportive.jpg";
      break;
    case "electric":
      image.src = "@/assets/electric.jpg";
      break;
    case "suv":
      image.src = "@/assets/suv.jpg";
      break;
    default:
      break;
  }
};
</script>

<style scoped>
@import "Css/WelcomeComponent.css";
</style>