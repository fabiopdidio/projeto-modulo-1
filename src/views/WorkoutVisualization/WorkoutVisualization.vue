<template>
  <div>
    <Header />

    <v-card class="mx-auto my-auto mt-10" max-width="900" elevation="10" color="white">
      <v-container>
        <router-link to="/gerenciamento-de-alunos">
          <v-btn color="grey-darken-2" class="mt-2 mb-4 ml-4">
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
            <h2 class="mt-3">Treinos - {{ student_id }}</h2>
          </v-col>
        </v-row>

        <hr class="mt-6" />

        <h2 class="ma-6">Hoje</h2>

        <div v-if="selectedDayExercises">
          <p class="ml-4 mb-8">{{ selectedDay }}</p>
          <ul>
            <li v-for="(exercise, index) in selectedDayExercises" :key="index">
              {{ exercise.name }}
              <v-btn @click="markExercise(exercise.id, selectedDay)">Marcar Concluído</v-btn>
            </li>
          </ul>
        </div>

        <v-row>
          <v-col cols="auto" v-for="(day, index) in workoutDays" :key="index">
            <v-btn
              @click="selectDay(day)"
              :color="selectedDay === day ? 'blue' : 'black'"
              size="small"
              class="ml-4 mb-4"
            >
              {{ day }}
            </v-btn>
          </v-col>
        </v-row>

        <p v-if="selectedDay" class="mt-4 ml-4 mb-4">{{ `Treino do dia: ${selectedDay}` }}</p>
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
      student_id: this.$route.params.id,
      userInfo: JSON.parse(localStorage.getItem("user-info")) || null,
      name: localStorage.getItem("username") || "",
      selectedDay: null,
      workoutDays: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ],
      workoutData: {},
    };
  },
  mounted() {
    this.fetchWorkoutData();
  },
  methods: {
    fetchWorkoutData() {
      axios
        .get(`http://localhost:3000/workouts?student_id=${this.student_id}`)
        .then((response) => {
          this.workoutData = response.data;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do treino:", error);
        });
    },
    markExercise(workoutId, dayOfWeek) {
      const requestBody = {
        workout_id: workoutId,
        student_id: this.userInfo.id,
        day_of_week: dayOfWeek,
      };

      axios
        .post("http://localhost:3000/workouts/check", requestBody)
        .then(() => {
        })
        .catch((error) => {
          console.error("Erro ao marcar o exercício como concluído:", error);
        });
    },
    selectDay(day) {
      this.selectedDay = day;

    },
  },
};
</script>

<style scoped></style>
