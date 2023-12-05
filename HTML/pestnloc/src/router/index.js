import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginComponent.vue"
import Contracts from "../components/ContractsComponent.vue"
import Agencies from "../components/AgenciesComponent.vue"
import Rent from "../components/RentComponent.vue"
import Register from "../components/RegisterComponent.vue"
import DefaultLayout from "../Static_Components/DefaultLayout.vue"

const isAuthenticated = () => {

    const jwtCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('jwt='));

    return jwtCookie !== undefined;
};


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
                },
                {
                    path :'/login',
                    name : "Login",
                    component : Login ,
                    beforeEnter: (to, from, next) => {

                        if (isAuthenticated()) {
                            next('/');
                        } else {

                            next();
                        }
                    },
                },

                {
                    path: '/Contracts',
                    name: "Contracts",
                    component: Contracts,
                    beforeEnter: (to, from, next) => {

                        if (isAuthenticated()) {
                            next();
                        } else {

                            next('/login');
                        }
                    },
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