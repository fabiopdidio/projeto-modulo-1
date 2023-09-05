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
        <v-row align="center">
          <v-col cols="auto">
            <v-img
              src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              alt="Imagem"
              width="50"
              height="50"
              class="mt-2 ml-2"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <h2 class="mt-3">Treinos - {{ userInfo.name }}</h2>
          </v-col>
        </v-row>

        <!-- Linha para divisão entre título e informações -->
        <hr class="mt-6"/>

        <h2 class="ma-6">Hoje</h2>
        
        <!-- Lugar para aparecer o treino do dia -->
        <p v-if="selectedDay" class="ml-4 mb-8">
          {{ `Eu sou ${selectedDay}` }}
        </p>

        <!-- Botões para selecionar o dia desejado -->
        <v-row>
          <v-col cols="auto" v-for="(day, index) in workoutData" :key="index">
            <v-btn
              @click="displayMessage(day)"
              :color="selectedDay === day ? 'blue' : 'grey'"
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
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("user-info")) || null;
  },
  methods: {
    displayMessage(day) {
      this.selectedDay = day;
    },
  },
};
</script>

<style scoped></style>
