<template>
  <div class="WelcomeContainer">
      <div class="formResearch">
        <form>
          <div class="divButtonWelcome">
            <!--          Choix du type de la voiture -->
            <button>Sportive</button>
            <button>Electric</button>
            <button>SUV</button>
          </div>
          <br><br>
          <div class="divSearchWelcome">
            <input type="search">
          </div>

          <br><br>
          <div class="divDateWelcome">
            <input type="date">
            <input type="date">
          </div>

          <br><br>
          <button type="submit"> Show Cars</button>
        </form>
      </div>
  </div>
</template>

<script setup>

</script>

<style scoped>

  @import "Css/WelcomeComponent.css";

</style>