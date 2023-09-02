<template>
  <Header />

  <v-app>
    <v-container>
      <h1>Exercícios</h1>

      <!-- Formulario para cadastro de exercicio -->
      <v-form @submit.prevent="cadastrarExercicio" ref="form">
        <v-row>
          <v-col cols="6" class="mt-6">
            <v-text-field
              v-model="novoExercicio"
              variant="outlined"
              label="Digite o nome do Exercício"
              required
              :rules="[(v) => !!v || 'O nome do exercício é obrigatório']"
            ></v-text-field>
          </v-col>

          <!-- Botao para realizar o cadastro -->
          <v-col>
            <v-btn type="submit" color="blue" class="mt-8">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <!-- Snackbar para exibir a mensagem de cadastrado com sucesso -->
      <v-snackbar v-model="exercicioCadastrado" color="success" top>
        Exercício cadastrado com sucesso!
      </v-snackbar>

      <!-- Lista de exercícios adicionados -->
      <v-list>
        <v-list-item v-for="(exercicio, index) in exercicios" :key="index">
          <v-list-item-title>{{ exercicio }}</v-list-item-title>
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
      novoExercicio: "",
      exercicios: [],
      exercicioCadastrado: false,
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/exercises")
      .then((res) => (this.dashboardInfo = res.data))
      .catch((error) => console.log(error));

    this.userInfo = JSON.parse(localStorage.getItem("user-info")) || null;
  },

  methods: {
    cadastrarExercicio() {
      if (this.novoExercicio.trim() !== "") {
        this.exercicios.push(this.novoExercicio);
        this.novoExercicio = "";
        this.$refs.form.resetValidation();
        this.exercicioCadastrado = true;

        setTimeout(() => {
          this.exercicioCadastrado = false;
        }, 3000);
      }
    },
  },
};
</script>

<style></style>
