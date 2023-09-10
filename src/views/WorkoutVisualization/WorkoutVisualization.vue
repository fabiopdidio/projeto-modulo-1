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
            <h2 class="mt-3">Treinos - {{ this.$route.params.name }}</h2>
          </v-col>
        </v-row>

        <hr class="mt-6" />

        <h2 class="ma-6">Hoje</h2>

        <h3 class="ma-6">{{ exerciseDescription }} |  {{ weight }}kg | {{ repetitions }} repetições | {{break_time}} min de pausa  </h3>


        <!-- <h3 class="mb-4 ml-4">{{ workoutData }}</h3> -->

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

        <p v-if="selectedDay" class="mt-4 ml-4 mb-4">
          {{ `Treino de ${selectedDay}` }}
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
      student_id: this.$route.params.id,
      selectedDay: "",
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
  computed: {
    exerciseDescription() {
    if (this.workoutData && this.workoutData.length > 0) {
      return this.workoutData[0].exercise_description;
      return this.workoutData[0].repetitions;
    }
    return "";
    },
    repetitions() {
    if (this.workoutData && this.workoutData.length > 0) {
      return this.workoutData[0].repetitions;
    }
    return "";
    },
    weight() {
    if (this.workoutData && this.workoutData.length > 0) {
      return this.workoutData[0].weight;
    }
    return "";
    },
    break_time() {
    if (this.workoutData && this.workoutData.length > 0) {
      return this.workoutData[0].break_time;
    }
    return "";
    },
  },
  mounted() {
    this.fetchWorkoutData();
  },
  methods: {
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
    markExercise(workoutId, dayOfWeek) {
      const requestBody = {
        workout_id: workoutId,
        student_id: this.userInfo.id,
        day_of_week: dayOfWeek,
      };

      axios
        .post("http://localhost:3000/workouts/check", requestBody)
        .then(() => {})
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
