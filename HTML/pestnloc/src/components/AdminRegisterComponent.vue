<template>
  <v-card
      class="mx-auto text-center"
      max-width="344"
      title="Agency Registration"
  >
    <v-container>
      <v-text-field
          clearable
          v-model="AgencyName"
          color="primary"
          label="Agency Name"
          variant="underlined"
      ></v-text-field>

      <v-text-field
          clearable
          v-model="AgencyAddress"
          color="primary"
          label="Address"
          variant="underlined"
      ></v-text-field>

      <v-text-field
          clearable
          v-model="phoneNumber"
          color="primary"
          label="Phone Number"
          variant="underlined"
      ></v-text-field>

      <v-text-field
          clearable
          v-model="email"
          color="primary"
          label="Email"
          placeholder="testAdmin@gmail.com"
          variant="underlined"
      ></v-text-field>

      <v-text-field
          clearable
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          label="Admin Password"
          variant="underlined"
          @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn @click="submitForm" color="primary">Submit</v-btn>
    </v-container>
  </v-card>
</template>

<script>
import { shallowRef } from "vue";

export default {
  name: "AdminRegisterComponent",

  data() {
    return {
      AgencyName: shallowRef(''),
      AgencyAddress: shallowRef(''),
      phoneNumber: shallowRef(''),
      email: shallowRef(''),
      password: shallowRef(''),
      visible : false,
    };
  },

  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    },

    submitForm() {
      // Implement your form submission logic here
      console.log('Form submitted!');
    },
  },
};
</script>

<style scoped>
/* Ajoutez du style si nécessaire */
</style>
