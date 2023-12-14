<template>
  <div class="WelcomeContainer">
    <div class="formResearch">
      <form>
        <div class ="Weare We">We are a luxury car rental agency with several rental sites throughout Hungary.</div>
          <div class ="Weare">Mainly present in Budapest, we invite you to discover some vehicles that we would be happy to rent to you. Click  below ;)</div>
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


          <br><br>




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