<template>
  <div>
    <Header />

    <v-card
      class="mx-auto my-auto mt-10"
      max-width="900"
      elevation="10"
      color="white"
    >
      <v-container>
        <router-link to="/gerenciamento-de-alunos">
          <v-btn color="grey-darken-2" class="mt-2 mb-4 ml-4" @click="voltar">
            <v-icon left>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>

        <v-row align="center">
          <v-col cols="auto">
            <v-img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="Imagem"
              width="50"
              height="50"
              class="mt-4 ml-4"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <h2 class="mt-3">Treinos - {{ userInfo.name }}</h2>
          </v-col>
        </v-row>

        <!-- Linha para divisão entre título e informações -->
        <hr class="mt-6" />

        <h2 class="ma-6">Hoje</h2>

        <!-- Lugar para aparecer o treino do dia -->
        <div v-if="selectedDayExercises">
          <p class="ml-4 mb-8">{{ selectedDay }}</p>
          <ul>
            <li v-for="(exercise, index) in selectedDayExercises" :key="index">
              {{ exercise.name }}
            </li>
          </ul>
        </div>

        <!-- Botões para selecionar o dia desejado -->
        <v-row>
          <v-col cols="auto" v-for="(day, index) in workoutData" :key="index">
            <v-btn
              @click="displayMessage(day)"
              :color="selectedDay === day ? 'blue' : 'black'"
              size="small"
              class="ml-4 mb-4"
            >
              {{ day }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- Ao clicar no botão aparece o treino -->
        <p v-if="selectedDay" class="mt-4 ml-4 mb-4">
          {{ `Eu sou ${selectedDay}` }}
        </p>
      </v-container>
    </v-card>
  </div>
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
      userInfo: {},
      selectedDay: null,
      workoutData: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ],
      name: "",
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("user-info")) || null;
    this.name = localStorage.getItem("username") || "";
  },
  methods: {
    fetchWorkoutData(day) {
      axios
        .get(`http://localhost:3000//workouts?student_id=:id`)
        .then((response) => {
          this.workoutData[day] = response.data.exercises;
          this.selectedDay = day;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do treino:", error);
        });
    },
    markExercise(workoutId, dayOfWeek) {
      const requestBody = {
        training_id: trainingId,
        student_id: this.userInfo.id,
        day_of_week: dayOfWeek,
      };

      axios
        .post("http://localhost:3000/training/check", requestBody)
        .then(() => {
          const exercises = this.workoutData[dayOfWeek];
          const exercise = exercises.find((ex) => ex.id === workoutId);
          if (exercise) {
            exercise.completed = true;
          }
        })
        .catch((error) => {
          console.error("Erro ao marcar o exercício como concluído:", error);
        });
    },
  },
};
</script>

<style scoped></style>
