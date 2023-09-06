<template>
  <Header />

  <v-card
    class="mx-auto mt-8"
    max-width="800"
    elevation="10"
    color="white
  "
  >
    <v-card-title class="text-center font-weight-bold mb-4 mt-6"
      >Treino</v-card-title
    >
    <v-card-text>
      <v-form @submit.prevent="handleRegistration" ref="form">
        <!-- Select para selecionar um exercício previamente cadastrado -->
        <v-select
          v-model="user.exercise_id"
          label="Exercício"
          :items="exercises"
          item-title="description"
          item-text="name"
          item-value="id"
          :rules="[(v) => !!v || 'Selecione um exercício']"
          variant="outlined"
          class="ml-4 mr-4"
        ></v-select>

        <!-- Campo para numero de repetições, carga e tempo de pausa -->
        <div class="d-flex justify-space-between">
          <v-text-field
            v-model="user.repetitions"
            label="Repetições"
            placeholder="Repetições"
            :rules="[
              (v) => !!v || 'O número de repetições é obrigatório',
              (v) => v >= 1 || 'Mínimo uma repetição',
            ]"
            type="number"
            variant="outlined"
            class="mr-2 ml-4"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.weight"
            label="Peso (kg)"
            placeholder="Peso (kg)"
            :rules="[(v) => !!v || 'A carga é obrigatória']"
            type="number"
            variant="outlined"
            class="mr-2"
          ></v-text-field>

          <v-text-field
            v-model="user.break_time"
            label="Tempo de Pausa"
            placeholder="Tempo de Pausa"
            :rules="[(v) => !!v || 'O tempo de pausa é obrigatório']"
            type="time"
            variant="outlined"
            class="mr-4"
          ></v-text-field>
        </div>

        <!-- Select para dia da semana -->
        <v-select
          v-model="user.day"
          label="Dia da Semana"
          :items="diasLista"
          :rules="[(v) => !!v || 'Selecione um dia da semana']"
          variant="outlined"
          class="ml-4 mr-4"
        ></v-select>

        <!-- Campo de observações do treino -->
        <v-textarea
          v-model="user.observations"
          label="Observações do Treino"
          placeholder="Observações do Treino"
          variant="outlined"
          class="ml-4 mr-4"
        ></v-textarea>

        <!-- Botão de cadastrar -->
        <v-btn type="submit" color="blue" class="mt-2 mb-4 ml-4"
          >Cadastrar</v-btn
        >
        <v-btn
          type="submit"
          color="grey-darken-2"
          class="mt-2 mb-4 ml-4"
          @click="$router.push('/gerenciamento-de-alunos')"
          >Cancelar</v-btn
        >
      </v-form>

      <div v-if="error" class="error-message">{{ error }}</div>
    </v-card-text>
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
      user: {
        exercise_id: "",
        repetitions: 1,
        weight: "",
        break_time: "",
        observations: "",
        day: "segunda", // Deixa o primeiro dia como segunda
      },
      diasLista: [
        {
          title: "Segunda-feira",
          value: "segunda",
        },
        {
          title: "Terça-feira",
          value: "terca",
        },
        {
          title: "Quarta-feira",
          value: "quarta",
        },
        {
          title: "Quinta-feira",
          value: "quinta",
        },
        {
          title: "Sexta-feira",
          value: "sexta",
        },
        {
          title: "Sábado",
          value: "sabado",
        },
        {
          title: "Domingo",
          value: "domingo",
        },
      ],
      exercises: [],
      error: "",
      success: "",
    };
  },

  methods: {
    async handleRegistration() {
      const isValid = await this.$refs.form.validate();
      if (isValid) {
        try {
          const response = await axios.post("http://localhost:3000/workouts", {
            exercise_id: this.user.exercise_id,
            repetitions: this.user.repetitions,
            weight: this.user.weight,
            break_time: this.user.break_time,
            observations: this.user.observations,
            day: this.user.day,
          });

          if (response.status === 200) {
            alert("Treino cadastrado com sucesso!");
            this.$refs.form.reset();
          }
        } catch (error) {
          console.error("Erro ao cadastrar treino:", error);
          this.error = "Erro ao cadastrar treino.";
        }
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/exercises")
      .then((res) => (this.exercises = res.data))
      .catch((error) => {
        console.log(error);
        this.error = "Erro ao carregar exercícios.";
      });
  },
};
</script>


<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
