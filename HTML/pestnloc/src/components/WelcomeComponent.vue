<template>
  <div class="WelcomeContainer">
    <div class="formResearch">
      <form>
        <div class="divButtonWelcome">
          <button type = "button" class="sports choiceCar" @click="changeImage('sportive')">Sportive</button>
          <button type = "button" class="electric choiceCar" @click="changeImage('electric')">Electric</button>
          <button type = "button" class="Suv choiceCar" @click="changeImage('suv')">Suv</button>
        </div>
        <br><br>
        <div class="divSearchWelcome">
          <div class="separatingsearch">
            <input type="search">
          </div>
          <div class="separating911">
            <img src="./assets/911.jpg" class="ImageWelcome911"/>
          </div>
        </div>
        <br><br>
        <div class="parallelebutton">
          <div class="divDateWelcome">
            <input class = "thedates" type="date">
            <input class = "thedates" type="date">
          </div>
          <br><br>
          <div class="separingshowcar">
            <button class ="choiceCar choiceCar2" type="submit"> Show cars available</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script >
import sportive from "./assets/sportive.jpg";
import electric from "./assets/Electric.jpg";
import suv from "./assets/Suv.jpg";

export default {
  data() {
    return{

    }
  },

  methods : {
     changeImage  (carType) {
      let image = document.querySelector('.ImageWelcome911');

      switch (carType){

        case 'sportive' : {
          image.src = sportive;
          break;
        }
        case 'electric' : {
          image.src = electric;
          break;
        }
        case 'suv' : {
          image.src = suv;
          break;
        }
      }
    }
  },
}




</script>

<style scoped>
@import "Css/WelcomeComponent.css";
</style>