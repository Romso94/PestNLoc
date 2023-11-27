<template>
  <div class="WelcomeContainer">
      <div class="formResearch">
        <form>

         <div class="divButtonWelcome">
            <button class="sports" @click="showImage('sportive')">Sportive</button>
            <button class="electric" @click="showImage('electric')">Electric</button>
            <button class="Suv" @click="showImage('suv')">Suv</button>
          </div>
          <br><br>
          <div class="divSearchWelcome">
            <div class ="separatingsearch">
            <input type="search">
            </div>
            <div class ="separating911">
            <img src="@/assets/911.png" class="ImageWelcome911"/>
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
//let carImage = "./src/assets/911.png"

</script>

<style scoped>

  @import "Css/WelcomeComponent.css";

</style>