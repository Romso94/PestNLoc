import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginComponent.vue"
import Contracts from "../components/ContractsComponent.vue"
import Agencies from "../components/AgenciesComponent.vue"
import Rent from "../components/RentComponent.vue"
import Register from "../components/RegisterComponent.vue"
import DefaultLayout from "../Static_Components/DefaultLayout.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "",
            name: "Main",
            component: DefaultLayout,
            children : [
                {
                    path: "/",
                    redirect: "",
                },
                {
                    path: '/:pathMatch(.*)*',
                    redirect: "/",
                },
                {
                    path :'/login',
                    name : "Login",
                    component : Login ,
                },

                {
                    path : '/Contracts',
                    name : "Contracts",
                    component : Contracts,
                },

                {
                    path : '/Agencies',
                    name : "Agencies",
                    component : Agencies,
                },

                {
                    path : '/Rent',
                    name : "Rent",
                    component : Rent,
                },

                {
                    path : '/Register',
                    name : "Register",
                    component : Register,
                }
            ]
        },

    ],
});

export default router;