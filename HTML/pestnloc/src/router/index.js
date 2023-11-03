import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginComponent.vue"
import Contracts from "../components/ContractsComponent.vue"
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
                    redirect: "/"
                },
                {
                    path :'/login',
                    name : "Login",
                    component : Login,
                },

                {

                    path : '/Contracts',
                    name : "Contracts",
                    component : Contracts,
                }






            ]
        },

    ],
});

export default router;