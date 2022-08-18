import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProfilePage from "@/views/ProfilePage.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
