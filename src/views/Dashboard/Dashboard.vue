<template>
  <v-container class="dashboard">
    <!-- Mensagem com o nome do usuário-->
    <h1>Bem-vindo, {{ name }}</h1>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card
          v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="black"
        >
          <v-card-title class="mt-4">10 Alunos</v-card-title>
          <v-card-text class="dashboard-card-content"
            >{{ numStudents }}
            <v-btn
              color="blue"
              class="mt-2 mb-4"
              @click="$router.push('/cadastro-aluno')"
              >Adicionar</v-btn
            ></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card
          v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="black"
        >
          <v-card-title class="mt-4">10 Exercícios</v-card-title>
          <v-card-text class="dashboard-card-content"
            >{{ numExercises }}
            <v-btn
              color="blue"
              class="mt-2 mb-4"
              @click="$router.push('/cadastro-treino')"
              >Adicionar</v-btn
            >
          </v-card-text>
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
      name: "",
      numStudents: 0,
      numExercises: 0,
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get("http://localhost:3000/dashboard");
        const data = response.data;

        this.name = data.name; // Corrigido para usar "name" da API
        this.numStudents = data.numStudents;
        this.numExercises = data.numExercises;
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    },
  },
};
</script>

<style scoped></style>
