import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResolutionList from "@/views/ResolutionList.vue";
import ResolutionPage from "../views/ResolutionView.vue";

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
  },
  {
    path: "/resolutions/:id",
    name: "resolutionPage",
    component: ResolutionPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
