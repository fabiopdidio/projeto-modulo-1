<template>
  <Header/>

  <v-container>
    <!-- Mensagem de boas-vindas buscando o nome do usuário na API-->
    <h1 class="text-white mt-16 mb-5 text-center">Bem-vindo, {{ userInfo.name }}</h1>

    <v-row>
      <v-col cols="6">
        <v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="white"
        >
          <v-card-title class="ma-4"
            >{{ dashboardInfo.amount_students }} Alunos</v-card-title
          >
          <v-btn
            type="submit"
            color="blue"
            class="mt-2 mb-8 ml-8"
            @click="$router.push('/cadastro-novo-aluno')"
            >Adicionar</v-btn
          >
          <v-btn
            type="submit"
            color="grey"
            class="mt-2 mb-8 ml-8"
            @click="$router.push('/gerenciamento-de-alunos')"
            >Gerenciar</v-btn
          >
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="white"
        >
          <v-card-title class="ma-4"
            >{{ dashboardInfo.amount_exercises }} Exercícios</v-card-title
          >
          <v-btn
            color="blue"
            class="mt-2 mb-8 ml-8"
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
import Header from "../../components/Header.vue";

import axios from "axios";
export default {
  components: {
    Header,
  },
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
