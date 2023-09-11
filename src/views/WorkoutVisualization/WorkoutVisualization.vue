<template>
  <div>
    <Header />

    <v-card
      class="mx-auto my-auto mt-10"
      max-width="900"
      elevation="10"
      color="white"
    >
      <!-- Botão para voltar à tela de gerenciamento de alunos-->
      <v-container>
        <router-link to="/gerenciamento-de-alunos">
          <v-btn color="grey-darken-2" class="mt-2 mb-4 ml-4">
            <v-icon left>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>

        <!-- ícone de usuário -->
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

          <!-- Busca dados do aluno e mostra o nome -->
          <v-col cols="auto">
            <h2 class="mt-4">Treinos - {{ this.$route.params.name }}</h2>
          </v-col>
        </v-row>

        <hr class="mt-5 ml-4 mr-4" />

        <h3 class="mt-4 ml-5">Hoje</h3>

        <!-- Treino do dia -->
        <p
          class="mt-2 ml-5"
          v-for="(exercise, index) in exerciseDescriptions"
          :key="index"
        >
          <!-- Checkbox seguido do treino ao do dia-->
          <input type="checkbox" class="mr-2" />
          {{ exercise }} | {{ weights[index] }} kg |
          {{ repetitions[index] }} repetições | {{ breakTimes[index] }} min de
          intervalo
        </p>

        <!-- Botões para selecionar o dia -->
        <v-row class="mt-4">
          <v-col cols="auto" v-for="(day, index) in workoutDays" :key="index">
            <v-btn
              @click="selectDay(day)"
              :color="selectedDay === day ? 'blue' : 'grey-darken-4'"
              size="small"
              class="ml-4 mb-4"
            >
              {{ day }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- Mostra o treino correspondente ao dia clicado -->
        <p v-if="selectedDay" class="mt-4 ml-4 mb-4 font-weight-bold">
          {{ `Treino de ${selectedDay}` }}
        </p>

        <div v-if="selectedWorkout[selectedDay]" class="ml-5 mb-4">
          <p
            v-for="(exercise, index) in selectedWorkout[selectedDay]"
            :key="index"
          >
            <input type="checkbox" class="mb-4 mr-2" />
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
      workoutData: {},
    };
  },
  // Faz um map para buscar as informações específicas na API
  computed: {
    exerciseDescriptions() {
      if (this.workoutData && this.workoutData.length > 0) {
        return this.workoutData.map((item) => item.exercise_description);
      }
    },
    repetitions() {
      if (this.workoutData && this.workoutData.length > 0) {
        return this.workoutData.map((item) => item.repetitions);
      }
    },
    weights() {
      if (this.workoutData && this.workoutData.length > 0) {
        return this.workoutData.map((item) => item.weight);
      }
    },
    breakTimes() {
      if (this.workoutData && this.workoutData.length > 0) {
        return this.workoutData.map((item) => item.break_time);
      }
    },
  },
  // Mostra o treino do dia
  mounted() {
    this.fetchWorkoutData();
  },
  methods: {
    // Busca respostas na API
    fetchWorkoutData() {
      axios
        .get(`http://localhost:3000/workouts?student_id=${this.student_id}`)
        .then((response) => {
          this.workoutData = response.data.workouts;
        })
        .catch((error) => {
          console.error("Erro ao buscar os dados do treino:", error);
        });
    },
    // Marca exercicio como concluido
    markExercise(workoutId, dayOfWeek) {
      const requestBody = {
        workout_id: workoutId,
        student_id: this.userInfo.id,
        day_of_week: dayOfWeek,
      };
      // Envia corpo para a API atraves do metodo POST
      axios
        .post("http://localhost:3000/workouts/check", requestBody)
        .then(() => {})
        .catch((error) => {
          console.error("Erro ao marcar o exercício como concluído:", error);
        });
    },
    selectDay(day) {
      this.selectedDay = day;
      if (!this.selectedWorkout[day]) {
        this.fetchWorkoutForDay(day);
      }
    },

    // Busca o treino de acordo com a data
    fetchWorkoutForDay(day) {
      axios
        .get(
          `http://localhost:3000/workouts?student_id=${this.student_id}&day=${day}`
        )
        .then((response) => {
          this.selectedWorkout[day] = response.data.workouts;
        })
        .catch((error) => {
          console.error(`Erro ao buscar o treino de ${day}:`, error);
        });
    },
  },
};
</script>

<style scoped></style>
