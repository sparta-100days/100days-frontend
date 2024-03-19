// @/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResolutionList from "@/components/ResolutionList.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
    path: "/resolutions",
    name: "resolutionsList",
    component: ResolutionList,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
// import { createRouter, createWebHistory } from "vue-router";
// import ResolutionList from "../components/ResolutionList.vue";
//
// const routes = [
//    
//     {
//     path: "/resolutions",
//     name: "resolutionsList",
//     component: ResolutionList,
//     }
// ];
//
// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });
//
// export default router;