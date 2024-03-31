import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ResolutionList from "@/views/resolution/ResolutionList.vue";
import ResolutionPage from "../views/resolution/ResolutionPage.vue";
import CreateResolution from "@/views/resolution/CreateResolution.vue";
import Login from "@/views/user/Login.vue";
import SignUp from "@/views/user/SignUp.vue";
import Message from "@/views/message/MessageMain.vue";
import MyInfo from "@/views/user/MyInfo.vue";
import TermsOfService from "@/components/user/TermsOfService.vue";

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
    path: "/resolution/:id",
    name: "resolutionPage",
    component: ResolutionPage,
  },
  {
    path: "/create-resolution",
    name: "createResolution",
    component: CreateResolution,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/message",
    name: "message",
    component: Message,
  },
  {
    path: "/myInfo",
    name: "myInfo",
    component: MyInfo,
  },
  {
    path: "/terms-of-service",
    name: "termsOfService",
    component: TermsOfService,
  },
  {
    path: "/report",
    name: "report",
    component: Report,
  },
  {
    path: "/posts",
    name: "Posts",
    component: PostList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
