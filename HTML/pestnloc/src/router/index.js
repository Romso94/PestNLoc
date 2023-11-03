import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginComponent.vue"
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



            ]
        },

    ],
});

export default router;