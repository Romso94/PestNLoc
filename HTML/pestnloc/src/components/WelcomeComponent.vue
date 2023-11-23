<template>
  <div class="WelcomeContainer">
      <div class="formResearch">
        <form>
<!--     On va enlever cette div et a la place de cliquer sur un boutton pour la recherche du type de voiture Mets un volet deroulant nono
         <div class="divButtonWelcome">
            <button class="sports" @click="showImage('sportive')">Sportive</button>
            <button class="electric" @click="showImage('electric')">Electric</button>
            <button class="Suv" @click="showImage('suv')">Suv</button>
          </div>-->
          <br><br>
          <div class="divSearchWelcome">
            <input type="search">
          </div>
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

</script>

<style scoped>

  @import "Css/WelcomeComponent.css";

</style>