import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import MyDictionary from "@/views/MyDictionary.vue";



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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
