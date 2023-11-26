import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

createApp(App)
    .use(Vuetify)
    .use(router)
    .mount("#app");