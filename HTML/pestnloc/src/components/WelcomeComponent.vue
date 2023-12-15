<template>
  <div class="WelcomeContainer">
    <div class="formResearch">
      <form>
        <h1 class="title-welcome">Welcome To <strong>PestN'Loc</strong></h1>
        <div class="divButtonWelcome">
          <button type="button" class="sports choiceCar" @click="changeImage('sportive')">Sportive</button>
          <button type="button" class="electric choiceCar" @click="changeImage('electric')">Electric</button>
          <button type="button" class="Suv choiceCar" @click="changeImage('suv')">Suv</button>
        </div>
        <br><br>
        <div class="divSearchWelcome">
          <div class="separatingsearch">
            <input type="search">
          </div>
          <div class="separating911">
            <img src="./assets/911.jpg" class="ImageWelcome911" />
          </div>
        </div>
        <br><br>
        <br><br>
      </form>
    </div>
  </div>
  <div class="welcome-content">
    <div class="content-wrapper">
      <h2>Welcome to PestnLoc: Your Premier Car Rental Destination</h2>
      <div class="content-details">
        <p>
          At PestnLoc, we pride ourselves on being a leading car rental service provider, offering a seamless and convenient
          way for individuals to access reliable transportation. With a network of strategically located agencies, we bring
          car rental services closer to you, ensuring that you can travel with ease and flexibility. Our commitment to
          customer satisfaction and a diverse fleet of high-quality vehicles makes PestnLoc your go-to destination for all
          your rental needs.
        </p>
        <img class="img-p-1" src="./assets/carp1.jpg" />
      </div>
    </div>
  </div>

  <div class="welcome-content size-div-2" style="background-color: #F4CE14; color: #45474B;">
    <div class="content-wrapper" >
      <h2 class="my-4">Discover Unmatched Convenience and Choice</h2>
      <div class="content-details" >
        <img class="img-p-2" src="./assets/clef-welcome.jpg" />
        <p>
          At the heart of PestnLoc's success lies the commitment to providing our customers with unparalleled convenience and a wide range of vehicle choices. Whether you're planning a weekend getaway, a business trip, or need a temporary vehicle, PestnLoc has you covered. Our diverse fleet spans various brands, models, and styles, ensuring that you find the perfect vehicle to suit your preferences and travel requirements. From compact cars to spacious SUVs, we offer a fleet that caters to every need, backed by a seamless booking experience.
        </p>
      </div>
    </div>
  </div>

  <div class="welcome-content">
    <div class="content-wrapper">
      <h2>Quality Service, Every Mile of the Way</h2>
      <div class="content-details">
        <p>
          PestnLoc goes beyond just offering cars for rent; we deliver a comprehensive rental experience marked by quality service at every step of your journey. Our dedicated team of professionals is committed to ensuring that your rental experience is smooth, efficient, and tailored to your needs. From easy online bookings to well-maintained vehicles and transparent pricing, PestnLoc is here to redefine the way you travel. Join us on the road to hassle-free and enjoyable travels – because at PestnLoc, every mile is an opportunity to make your journey exceptional.
        </p>
        <img class="img-p-3" src="./assets/luxe-car.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
import sportive from "./assets/sportive.jpg";
import electric from "./assets/Electric.jpg";
import suv from "./assets/Suv.jpg";

export default {
  data() {
    return {};
  },

  methods: {
    changeImage(carType) {
      let image = document.querySelector('.ImageWelcome911');

      switch (carType) {
        case 'sportive': {
          image.src = sportive;
          break;
        }
        case 'electric': {
          image.src = electric;
          break;
        }
        case 'suv': {
          image.src = suv;
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
@import "Css/WelcomeComponent.css";

.title-welcome {
  margin-top: 70px;
  text-align: center;
}

.welcome-content {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.welcome-content h2 {
  font-size: 26px;
  margin-bottom: 20px;
  color: #45474b;
  text-align: center;
}

.content-details {
  display: flex;
  align-items: center;
  margin-right: 120px; /* Ajustez la marge droite selon vos préférences */
  width: 80%;
}

.welcome-content p {
  max-width: 600px;
  font-size: 18px;
  margin-top: 30px;
  color: #45474b;
}

.size-div-2{
  height: 100%;
  padding-bottom: 40px;
}

.img-p-1,
.img-p-3 {
  height: 300px;
  width: 500px;
  border-radius: 10px;
  margin-top: 40px;
  margin-left: 250px;
}

.img-p-2 {
  height: 300px;
  width: 500px;
  border-radius: 10px;
  margin-top: 40px;
  margin-right: 250px;

}
</style>
