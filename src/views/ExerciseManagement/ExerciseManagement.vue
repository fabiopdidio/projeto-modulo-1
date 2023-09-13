<template>
  <Header/>

  <!-- Configuracao do card -->
  <v-card class="mx-auto mt-8" max-width="800" elevation="10" color="white">
    <!-- Botão para voltar ao dashboard -->
    <router-link to="/dashboard">
      <v-btn color="grey-darken-2" class="mt-8 ml-10" @click="voltar">
        <v-icon left>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>

    <v-container>
      <h1 class="text-center">Exercícios</h1>

      <!-- Formulário para cadastro de exercício -->
      <v-form ref="form" @submit.prevent="handleRegistration">
        <v-row class="text-center">
          <v-text-field
            v-model="newExercise"
            label="Digite o nome do Exercício"
            placeholder="Digite o nome do Exercício"
            :rules="[(v) => !!v || 'O nome do exercício é obrigatório']"
            type="text"
            variant="outlined"
            class="mt-12 ml-12"
            required
          ></v-text-field>

          <!-- Botão para realizar o cadastro -->
          <v-btn type="submit" color="blue" class="mt-14 mr-8 ml-6"
            >Cadastrar</v-btn
          >
        </v-row>
      </v-form>

      <!-- alert para exibir a mensagem de cadastrado com sucesso -->
      <v-alert
        v-model="exerciseRegistered"
        color="success"
        icon="$success"
        top
      >
        Exercício cadastrado com sucesso!
      </v-alert>

      <!-- Lista de exercícios adicionados que aparece abaixo do campo-->
      <v-list>
        <v-list-item
          v-for="(exercise, index) in displayedExercises"
          :key="index"
        >
          <v-list-item-title class="ml-8">{{
            exercise.description
          }}</v-list-item-title>

        </v-list-item>
      </v-list>

      <!-- Paginação para aparecer apenas 4 exercícios por página -->
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(exercises.length / exercisesPerPage)"
      ></v-pagination>
    </v-container>
  </v-card>
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
      newExercise: "",
      exercises: [],
      exerciseRegistered: false,
      currentPage: 1,
      exercisesPerPage: 4,
    };
  },

  computed: { // Paginação
    startIndex() {
      return (this.currentPage - 1) * this.exercisesPerPage;
    },
    endIndex() {
      return this.startIndex + this.exercisesPerPage;
    },
    displayedExercises() {
      return this.exercises.slice(this.startIndex, this.endIndex);
    },
  },

  mounted() {
    this.fetchExercises();
  },

  methods: {
    fetchExercises() {
      axios
        .get("http://localhost:3000/exercises") // Busca lista de exercícios na API
        .then((res) => {
          this.exercises = res.data;
        })
        .catch((error) => console.log(error));
    },

    handleRegistration() {
      if (this.newExercise.trim() !== "") {
        axios
          .post("http://localhost:3000/exercises", { // Envia para a API o novo exercício
            description: this.newExercise,
          })
          .then((res) => {
            this.exercises.push(res.data);
            this.newExercise = "";
            this.$refs.form.resetValidation();
            this.exerciseRegistered = true;

            setTimeout(() => {
              this.exerciseRegistered = false;

              window.location.reload();
            }, 2000);
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>

<style></style>