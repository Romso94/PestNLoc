<template>
  <header>
    <div class="divlogo">
      <a href="/" >
        <img class="logo" src="../assets/logo.png"/>
      </a>
    </div>

    <div class="divButton">
      <ul>
        <li>
          <a class="Rent" >Rent</a>
        </li>

        <li>
          <a class="OurAgencies" >Agencies</a>
        </li>

        <li>
          <a class="Contract" >Contracts</a>
        </li>

        <li>
          <div>
            <a href="/login" class="Profile" :class="{ active: true }" >Sign In</a>
          </div>
        </li>

        <li>
          <a class="Langue"></a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>

</script>

<style scoped>




@import '../components/Css/headerVue.css';
@import '../components/Css/Global.css';

</style>