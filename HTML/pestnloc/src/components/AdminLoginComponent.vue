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
      ></v-text-field>

      <v-btn
          block
          class="mb-8"
          color="#45474B"
          size="large"
          variant="tonal"
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

export default {
  name: "AdminComponent",
  data ()  {
    return {
      Mail : shallowRef(''),
      Password : shallowRef(''),
      visible : false
    }
  }
}
</script>

<style scoped>
@import "Css/AdminSign.css";

.link-signup{
  color: #45474B;
}

</style>