<template>
  <Header />

  <v-container>
    <!-- Mensagem de boas-vindas buscando o nome do usuário na API-->
    <h1 class="text-white mt-16 mb-5 text-center">
      Bem-vindo(a), {{ userInfo.name }}
    </h1>

    <v-row>
      <v-col cols="6">
        <!-- Card com informacoes de alunos -->
        <v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="white"
        >
          <v-row>
            <v-col cols="64">
              <!-- Card com informacoes de alunos -->
              <v-card-title class="mt-8 ml-10 mr-8"
                >{{ dashboardInfo.amount_students }} Alunos</v-card-title
              >

              <v-btn
                type="submit"
                color="blue"
                class="mb-4 ml-12"
                @click="$router.push('/cadastro-novo-aluno')"
              >
                Adicionar
              </v-btn>

              <!-- Botão para levar o usuário para a página de gerenciamento de alunos-->
              <v-btn
                type="submit"
                color="grey-darken-2"
                class="ml-12 mb-8"
                @click="$router.push('/gerenciamento-de-alunos')"
              >
                Gerenciar
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-img
                src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                alt="Imagem"
                width="100"
                height="100"
                class="mt-14 ml-16"
              ></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="6">
        <!-- Card com informacoes de exercicios -->
        <v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="white"
        >
          <v-row>
            <v-col cols="6">
              <!-- Card com o número de exercícios-->
              <v-card-title class="mt-8 ml-10 mr-8 mb-4"
                >{{ dashboardInfo.amount_exercises }} Exercícios</v-card-title
              >
              <!-- Botão para levar o usuário para a página de gerenciamento de exercícios-->
              <v-btn
                color="blue"
                class="mt-2 mb-15 ml-14"
                @click="$router.push('/gerenciamento-de-exercicios')"
              >
                Adicionar
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-img
                src="https://cdn-icons-png.flaticon.com/512/563/563777.png"
                alt="Imagem"
                width="80"
                height="80"
                class="mt-14 ml-16"
              ></v-img>
            </v-col>
          </v-row>
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
    return { // Informações como array vazio para mostrarem informações da API
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
