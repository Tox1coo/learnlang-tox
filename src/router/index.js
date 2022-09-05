import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import MyDictionary from "@/views/MyDictionary.vue";
import Testing from "@/views/Testing.vue";

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
  {
    path: "/mydictionary",
    name: "MyDictionary",
    component: MyDictionary,
  },
  {
    path: "/testing",
    name: "Testing",
    component: Testing,
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
