import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/LoginComponent.vue";
import Contracts from "../components/ContractsComponent.vue";
import ContractForm from "../components/ContractFormComponent.vue";
import Agencies from "../components/AgenciesComponent.vue";
import Rent from "../components/RentComponent.vue";
import Register from "../components/RegisterComponent.vue";
import DefaultLayout from "../Static_Components/DefaultLayout.vue";
import AdminComponent from "../components/AdminComponents/AdminComponent.vue";
import AdminLoginComponent from "../components/AdminComponents/AdminLoginComponent.vue";
import AdminRegisterComponent from "../components/AdminComponents/AdminRegisterComponent.vue";
import CarsCrudComponent from "../components/AdminComponents/CRUD_Tables/CarsCrudComponent.vue";
import AgencyCrudComponent from "../components/AdminComponents/CRUD_Tables/AgencyCrudComponent.vue";
import ContractsCrudComponent from "../components/AdminComponents/CRUD_Tables/ContractsCrudComponent.vue";
import ClientsCrudComponent from "../components/AdminComponents/CRUD_Tables/ClientsCrudComponent.vue";

const isAuthenticated = () => {
    const jwtCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('jwt='));
    return jwtCookie !== undefined;
};

const isAdmin = () => {
    try {
        const decodedCookie = decodeURIComponent(document.cookie);
        let cookie = decodedCookie.split("=");
        const realcookie = cookie[1].split(".");
        cookie = realcookie[1];
        const decodedString = atob(cookie);
        const decodedObject = JSON.parse(decodedString);
        if (decodedObject !== undefined) {
            return decodedObject.user.role === "admin";
        }

    } catch (error) {
        return false;
    }
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
                    beforeEnter: (to, from, next) => {
                        if (isAuthenticated()) {
                            next('/');
                        } else {
                            next();
                        }
                    },
                },
                {
                    path: '/newcontract',
                    name: "ContractFromComponent",
                    component: ContractForm,
                    beforeEnter: (to, from, next) => {
                        if (isAuthenticated()) {
                            next();
                        } else {
                            next('/login');
                        }
                    }
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
                    beforeEnter: (to, from, next) => {
                        if (isAdmin()) {
                            next("/admin");
                        }
                        next();
                    }
                },
                {
                    path: "register",
                    name: "Register Admin",
                    component: AdminRegisterComponent
                },
                {
                    path: "cars",
                    name: "Cars CRUD Table",
                    component: CarsCrudComponent,
                    beforeEnter: (to, from, next) => {
                        if (isAdmin()) {
                            next();
                        }
                        next("/admin/login");
                    }
                },
                {
                    path: "agencies",
                    name: "Agency CRUD Tables",
                    component: AgencyCrudComponent,
                    beforeEnter: (to, from, next) => {
                        if (isAdmin()) {
                            next();
                        }
                        next("/admin/login");
                    }
                },
                {
                    path: "contracts",
                    name: "Contract CRUD Tables",
                    component: ContractsCrudComponent,
                    beforeEnter: (to, from, next) => {
                        if (isAdmin()) {
                            next();
                        }
                        next("/admin/login");
                    }
                },
                {
                    path: "clients",
                    name: "Client CRUD Tables",
                    component: ClientsCrudComponent,
                    beforeEnter: (to, from, next) => {
                        if (isAdmin()) {
                            next();
                        }
                        next("/admin/login");
                    }
                }
            ]
        }
    ]
});

export default router;
