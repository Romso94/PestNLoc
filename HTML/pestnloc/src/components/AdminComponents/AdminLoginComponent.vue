<template>
  <div>
    <v-card
        class="mx-auto admin-form pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
    >
      <h1 class="admin-form-title">Admin Pannel</h1>
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="Mail"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          v-model="Password"
      ></v-text-field>

      <v-btn
          block
          class="mb-8"
          color="#45474B"
          size="large"
          variant="tonal"
          @click ="login"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
            class="text-decoration-none link-signup"
            href="/admin/register"
            rel="noopener noreferrer"
            target="_blank"
        >
          Register your agency<v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>

</template>

<script>
import {shallowRef} from "vue";
import router from "../../router";

export default {
  name: "AdminComponent",
  data ()  {
    return {
      Mail : shallowRef(''),
      Password : shallowRef(''),
      visible : false
    }
  },

  methods : {
   async login () {
      if(this.Password === "" || this.Mail === ""){
        alert("Fill every Field");
        return
      }
      try {
        const response = await fetch('http://localhost:9000/pestnloc/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Email: this.Mail,
            Password: this.Password,
          }),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const result = await response.json();
        const token = result.token;
        document.cookie = `jwt=${token}; path=/; secure; samesite=strict`;
        await router.push('/admin');

      } catch (error) {
        alert("Wrong Password or Email !");
      }

    }
  }
}
</script>

<style scoped>
@import "../Css/AdminSign.css";

.link-signup{
  color: #45474B;
}

</style>