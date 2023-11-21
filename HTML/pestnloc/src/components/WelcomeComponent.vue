<template>
  <div class="WelcomeContainer">
      <div class="formResearch">
        <form>
          <div class="divButtonWelcome">
            <!--          Choix du type de la voiture -->
            <button class="sports" @click= showImage(sportive)>Sportive</button>
            <button class="electric" @click= showImage(electric)>Electric</button>
            <button class="Suv" @click= showImage(suv)>Suv</button>
          </div>
          <br><br>
          <div class="divSearchWelcome">
            <input type="search">
          </div>
          <img src="" class = "showCarImage"/>
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
function showImage  (carType) {
switch (carType){

  case 'sportive' : {
    const img = document.getElementById('showCarImage');
    img.src = '../src/assets/sportsdrawing.png';
    img.style.display = "block";
    break;
  }


  case 'electric' : {
    const img = document.getElementById('showCarImage');
    img.src = 'chemin/vers/image';
    img.style.display = "block";
    break;
  }

  case 'suv' : {
    const img = document.getElementById('showCarImage');
    img.src = 'chemin/vers/image';
    img.style.display = "block";
    break;
  }
}
}

</script>

<style scoped>

  @import "Css/WelcomeComponent.css";

</style>