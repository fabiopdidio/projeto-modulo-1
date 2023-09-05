<template>
  <Header />

  <v-card class="mx-auto mt-10" max-width="800" elevation="10" color="white">
    <v-container>
      <router-link to="/dashboard">
        <v-btn color="grey-darken-2" class="mt-4 mb-4 ml-10" @click="voltar">
          <v-icon left>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>

      <h1 class="text-center mb-4">Alunos</h1>

      <v-form ref="form" @submit.prevent="handleRegistration">
        <v-row class="text-center">
          <v-text-field
            v-model="buscarAluno"
            label="Digite o nome do Aluno"
            placeholder="Digite o nome do Aluno"
            type="text"
            variant="outlined"
            class="mt-4 ml-12"
            required
          ></v-text-field>

          <!-- Botão para realizar o cadastro -->
          <v-btn type="submit" color="blue" class="mt-6 mr-2 ml-6"
            >Buscar</v-btn
          >
          <v-btn type="submit" color="grey-darken-2" class="mt-6 mr-8"
            >Novo</v-btn
          >
        </v-row>
      </v-form>

      <!-- Lista de alunos -->
      <v-list class="ml-16">
        <v-list-item>
          <v-row align="center" justify="center">
            <v-col cols="2">
              <strong>Nome</strong>
            </v-col>
            <v-col cols="8">
              <strong>Ações</strong>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item v-for="(aluno, index) in displayedAlunos" :key="index">
          <v-row align="center" justify="center">
            <v-col cols="2">
              <v-list-item-title>{{ aluno.name }}</v-list-item-title>
            </v-col>

            <!-- Botão que leva à página de cadastro de treino -->
            <!-- CRIAR PÁGINA -->
            <v-col cols="4">
              <v-btn small color="success" @click="montarTreino(aluno.id)">Montar treino</v-btn>
            </v-col>

            <!-- Botão que leva à página de visualização de treino -->
            <!-- CRIAR PÁGINA -->
            <v-col cols="4">
              <v-btn small color="grey-darken-2" @click="verTreino(aluno.id)">Ver</v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>

      <!-- Paginação para aparecer apenas 4 alunos por página -->
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(alunos.length / itemsPerPage)"
      ></v-pagination>
    </v-container>
  </v-card>
</template>

<script>
import Header from "../../components/Header.vue";

import axios from "axios";
export default {
  // Exporta o Header do componente
  components: {
    Header,
  },
  data() {
    return {
      nomeBusca: "",
      alunos: [],
      currentPage: 1, // Página inicial como 1
      itemsPerPage: 4, // 4 Itens máximos
    };
  },
  created() {
    // Requisição para a API ao criar o componente
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        this.alunos = res.data.students;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    montarTreino(alunoId) {
      this.$router.push(`/cadastro-de-treino/${alunoId}`);
    },
    verTreino(alunoId) {
      this.$router.push(`/visualizacao-de-treino/${alunoId}`);
    }
  },
  computed: {
    // Configuração da paginação
    displayedAlunos() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.alunos.slice(startIndex, endIndex);
    },
  },
};
</script>

<style></style>
