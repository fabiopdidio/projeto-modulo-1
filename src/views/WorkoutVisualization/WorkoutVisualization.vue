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
          <v-btn color="grey-darken-2" class="mt-2 mb-4 ml-4">
            <v-icon left>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>

        <v-row>
          <v-col cols="auto">
            <v-img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="Imagem"
              width="50"
              height="50"
              class="mt-2 ml-4"
            ></v-img>
          </v-col>

          <!-- Mostra o nome do aluno pelas rotas -->
          <v-col cols="auto">
            <h2 class="mt-3">Treinos - {{ this.$route.params.name }}</h2>
          </v-col>
        </v-row>

        <hr class="mt-5 ml-4 mr-4" />

        <!-- Ao lado de hoje aparece o dia atual-->
        <h3 class="mt-4 ml-6 mb-4">Hoje - {{ currentDay }}</h3>

        <!--Treino do dia baseado no dia do sistema do usuario-->
        <p
          class="mt-2 ml-5"
          v-for="(exercise, index) in todayWorkout"
          :key="index"
        >
          <input type="checkbox" />
          {{ exercise.exercise_description }} | {{ exercise.weight }} kg |
          {{ exercise.repetitions }} repetições | {{ exercise.break_time }} min
          de intervalo
        </p>

        <!-- Demais treinos aparecem ao clicar no dia correspondente-->
        <v-row class="mt-2">
          <v-col cols="auto" v-for="(day, index) in workoutDays" :key="index">
            <v-btn
              @click="selectDay(day)"
              :color="
                selectedDay.toLowerCase() === day.toLowerCase()
                  ? 'blue'
                  : 'black'
              "
              size="small"
              class="ml-4 mb-4"
            >
              {{ day }}
            </v-btn>
          </v-col>
        </v-row>

        <h4 v-if="selectedDay" class="mt-4 ml-4 mb-4">
          {{ `Treino de: ${selectedDay}` }}
        </h4>

        <div v-if="selectedWorkout[selectedDay]" class="ml-5">
          <p
            v-for="(exercise, index) in selectedWorkout[selectedDay]"
            :key="index"
          >
            <input type="checkbox" class="mb-4" />
            {{ exercise.exercise_description }} | {{ exercise.weight }} kg |
            {{ exercise.repetitions }} repetições |
            {{ exercise.break_time }} min de intervalo
          </p>
        </div>
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
      selectedDay: "",
      selectedWorkout: {},
      workoutDays: [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo",
      ],
      workoutData: [],
      todayWorkout: [],
      currentDay: "",
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
          this.workoutData = response.data.workouts; // Busca na API os treinos
          const todayIndex = new Date().getDay(); // Dia atual
          this.currentDay = this.workoutDays[todayIndex];
          const today = this.workoutDays[todayIndex];
          this.todayWorkout = this.workoutData.filter(
            (data) => data.day.toLowerCase() === today.toLowerCase() // filtra de acordo com o dia
          );
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
        .post("http://localhost:3000/workouts/check", requestBody) // Ao ser concluido envia para a API
        .then(() => {})
        .catch((error) => {
          console.error("Erro ao marcar o exercício como concluído:", error);
        });
    },
    selectDay(day) {
      this.selectedDay = day;
      this.filterWorkoutForDay(day);
    },
    filterWorkoutForDay(day) {
      this.selectedWorkout[day] = this.workoutData.filter(
        (data) => data.day.toLowerCase() === day.toLowerCase()
      );
    },
  },
};
</script>

<style scoped></style>
