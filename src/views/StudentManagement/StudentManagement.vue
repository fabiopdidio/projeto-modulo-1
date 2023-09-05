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

      <!-- Formulário para buscar alunos -->
      <v-form @submit.prevent="buscarAluno" ref="form">
        <v-row>
          <v-col cols="6" class="mt-6 ml-16">
            <v-text-field
              v-model="nomeBusca"
              variant="outlined"
              label="Digite o nome do aluno"
            ></v-text-field>
          </v-col>

          <!-- Botão para realizar a busca -->
          <v-col>
            <v-btn type="submit" color="blue" class="mt-4">Buscar</v-btn>
            
            <router-link to="/cadastro-novo-aluno">
              <v-btn color="grey-darken-2" class="mt-8 mb-4 ml-4">Novo</v-btn>
            </router-link>
          </v-col>
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
              <v-btn small color="success" @click="$router.push('/cadastro-de-treino')">Montar treino</v-btn>
            </v-col>

            <!-- Botão que leva à página de visualização de treino -->
            <!-- CRIAR PÁGINA -->
            <v-col cols="4">
              <v-btn small color="grey-darken-2" @click="$router.push('/visualizacao-de-treino')">Ver</v-btn>
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
  methods: {
    buscarAluno() {
      // Requisição para a API
      axios
        .get("http://localhost:3000/students")
        .then((res) => {
          this.alunos = res.data.students;
        })
        .catch((error) => console.log(error));
    },
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
