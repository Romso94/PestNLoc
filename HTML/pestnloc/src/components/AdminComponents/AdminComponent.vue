<template>
  <div>
    <AdminPannelComponent v-if="shouldShowComponents"/>
    <router-view/>
    <button v-if="shouldShowComponents" className="logout-button" @click="logout">Log out</button>
  </div>
</template>

<script>
import AdminPannelComponent from "./AdminPannelComponent.vue";
import {useRouter} from "vue-router/dist/vue-router";
import {ref, watchEffect} from "vue";

export default {
  name: "AdminComponent",
  components: {AdminPannelComponent},

  setup() {
    const router = useRouter();
    const currentPath = ref(router.currentRoute.value.path);

    const shouldShowComponents = ref(true);

    watchEffect(() => {
      currentPath.value = router.currentRoute.value.path;
      shouldShowComponents.value = !["/admin/register", "/admin/login"].includes(currentPath.value);
    });

    return {
      shouldShowComponents,
    };
  },
  methods : {
    logout ()  {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      window.location.href = '/admin/login';
    },
  }
};
</script>

<style scoped>

.logout-button {
  color: red;
  background-color: #45474B;
  height: 30px;
  width: 80px;
  border-radius: 10px;
  top: 600px;
  right: 20px;
  position: fixed;
}
</style>
