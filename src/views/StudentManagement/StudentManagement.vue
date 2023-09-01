<template>
  <Header />

  <v-app>
    <v-container>
      <h1>Alunos</h1>
      <!-- Botão de cadastro de novo aluno, leva para a página de cadastro-->
      <v-btn type="submit" color="blue" class="mt-8">Novo</v-btn>

      <!-- Formulário para buscar alunos -->
      <v-form @submit.prevent="buscarAluno" ref="form">
        <v-row>
          <v-col cols="6" class="mt-6">
            <v-text-field
              v-model="nomeBusca"
              variant="outlined"
              label="Digite o nome do aluno"
            ></v-text-field>
          </v-col>

          <!-- Botão para realizar a busca -->
          <v-col>
            <v-btn type="submit" color="blue" class="mt-8">Buscar</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Lista de alunos -->
      <v-list>
        <v-list-item v-for="(aluno, index) in alunos" :key="index">
          <v-list-item-title>{{ aluno.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-container>
  </v-app>
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
      nomeBusca: "",
      alunos: [],
    };
  },
  methods: {
    buscarAluno() {
      axios
        .get("http://localhost:3000/students")
        .then((res) => {
          this.alunos = res.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style></style>
