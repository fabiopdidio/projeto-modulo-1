<template>
  <v-container>
    <h1>Bem-vindo, {{ userInfo.name }}</h1>

    <v-row>
      <v-col cols="4">
        <v-card
          class="mx-auto mt-10"
          max-width="400"
          elevation="10"
          color="black"
        >
          <v-card-title
            >{{ dashboardInfo.amount_students }} Alunos</v-card-title
          >
          <v-btn type="submit" color="blue" class="mt-2 mb-4 ml-4"
            >Adicionar</v-btn
          >
        </v-card>
      </v-col>

      <v-col cols="4">
        <v-card
          class="mx-auto mt-10"
          max-width="400"
          elevation="10"
          color="black"
        >
          <v-card-title
            >{{ dashboardInfo.amount_exercises }} Exercícios</v-card-title
          >
          <v-btn
            color="blue"
            class="mt-2 mb-4 ml-4"
            @click="$router.push('/gerenciamento-de-exercicios')"
          >
            Adicionar
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dashboardInfo: {},
      userInfo: {},
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/dashboard")
      .then((res) => (this.dashboardInfo = res.data))
      .catch((error) => console.log(error));

    this.userInfo = JSON.parse(localStorage.getItem("user-info")) || null;
  },
};
</script>
