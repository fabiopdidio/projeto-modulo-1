<template>
  <v-container class="dashboard">
    <h1>Bem-vindo, {{ name }}</h1>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="black"
        >
          <v-card-title class="mt-4">Alunos Cadastrados</v-card-title>
          <v-card-text class="dashboard-card-content">{{
            students
          }}</v-card-text>
          <v-card-actions>
            <v-btn color="blue" @click="$router.push('/cadastro-aluno')"
              >Adicionar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card
          class="mx-auto mt-10"
          max-width="600"
          elevation="10"
          color="black"
        >
          <v-card-title class="mt-4">Exercícios</v-card-title>
          <v-card-text class="dashboard-card-content">{{
            exercises
          }}</v-card-text>
          <v-card-actions>
            <v-btn color="blue" @click="$router.push('/cadastro-treino')"
              >Adicionar</v-btn
            >
          </v-card-actions>
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
      students: 0,
      exercises: 0,
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

        this.name = data.name;
        this.students = data.students;
        this.exercises = data.exercises;
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard-card-content {
  font-size: 24px;
  font-weight: bold;
}
</style>
