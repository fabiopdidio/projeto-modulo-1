import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage/LoginPage.vue";
import UserRegistration from "../views/UserRegistration/UserRegistration.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/cadastro",
      name: "cadastro-usuario",
      component: UserRegistration,
    }
  ],
});

export default router;
