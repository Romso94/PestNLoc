import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginComponent.vue";
import Contracts from "../components/ContractsComponent.vue";
import Agencies from "../components/AgenciesComponent.vue";
import Rent from "../components/RentComponent.vue";
import Register from "../components/RegisterComponent.vue";
import DefaultLayout from "../Static_Components/DefaultLayout.vue";
import AdminComponent from "../components/AdminComponent.vue";
import AdminLoginComponent from "../components/AdminLoginComponent.vue";
import AdminRegisterComponent from "../components/AdminRegisterComponent.vue";

const isAuthenticated = () => {
    const jwtCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('jwt='));
    return jwtCookie !== undefined;
};

const isAdmin = () => {
    const jwtCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('jwt='));
    console.log('Router : ' + jwtCookie);

    // Implement your logic to check if the user is an admin based on the cookie
    // For example, decode the JWT and check for an "admin" claim
    // Replace the following line with your logic
    return false;
};

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "",
            name: "Main",
            component: DefaultLayout,
            children: [
                { path: "/", redirect: "" },
                { path: '/:pathMatch(.*)*', },
                {
                    path: '/login',
                    name: "Login",
                    component: Login,
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
                    path: '/Agencies',
                    name: "Agencies",
                    component: Agencies,
                },
                {
                    path: '/Rent',
                    name: "Rent",
                    component: Rent,
                },
                {
                    path: '/Register',
                    name: "Register",
                    component: Register,
                }
            ]
        },
        {
            path: "/admin",
            name: "Admin",
            component: AdminComponent,
            beforeEnter: (to, from, next) => {
                if (to.path !== "/admin/login" && !isAdmin() && to.path !== "/admin/register") {
                    next("/admin/login");
                } else {
                    next();
                }
            },
            children: [
                {
                    path: "login",
                    name: "Login Admin",
                    component: AdminLoginComponent,
                },

                {
                    path: "register",
                    name: "Register Admin",
                    component: AdminRegisterComponent
                }

            ],
        }
    ]
});

export default router;
