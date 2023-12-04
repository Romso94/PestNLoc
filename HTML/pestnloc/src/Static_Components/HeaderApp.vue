<template>
  <header>
    <div class="divlogo">
      <a href="/" >
        <img class="logo" src="../components/assets/logo.png"/>
      </a>
    </div>
    <div class="divButton">
      <ul>
        <li class="li-header"><router-link to="/Rent" class="Rent" exact-active-class="active" >Rent</router-link></li>
        <li class="li-header"><router-link to="/Agencies" class="OurAgencies"  exact-active-class="active">Agencies</router-link></li>
        <li class="li-header"><router-link to="/Contracts" class="Contract" exact-active-class="active" >Contracts</router-link></li>
        <li class="li-header">
          <div>
            <router-link to="/login" class="Profile" exact-active-class="active" >Sign In</router-link>
          </div>
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