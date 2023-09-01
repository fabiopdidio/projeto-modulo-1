import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage/LoginPage.vue";
import UserRegistration from "../views/UserRegistration/UserRegistration.vue"
import Dashboard from "../views/Dashboard/Dashboard.vue"
import ExerciseManagement from "../views/ExerciseManagement/ExerciseManagement.vue"

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
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/gerenciamento-de-exercicios",
      name: "gerenciamento-de-exercicios",
      component: ExerciseManagement,
    },
  ],
});

export default router;
