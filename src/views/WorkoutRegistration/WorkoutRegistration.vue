<template>
  <Header />

  <!-- Botão de voltar para a página de gerenciamento de alunos -->
  <v-card class="mx-auto mt-8" max-width="800" elevation="10" color="white">
    <router-link to="/gerenciamento-de-alunos">
          <v-btn color="grey-darken-2" class="ml-6 mt-6" @click="voltar">
            <v-icon left>mdi-arrow-left</v-icon>
          </v-btn>
        </router-link>

    <v-card-title class="text-center font-weight-bold mb-4"
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

        <!-- Campos para número de repetições, carga e tempo de pausa -->
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
            required
          ></v-text-field>

          <v-text-field
            v-model="user.break_time"
            label="Tempo de Pausa"
            placeholder="Tempo de Pausa"
            :rules="[(v) => !!v || 'O tempo de pausa é obrigatório']"
            type="time"
            variant="outlined"
            class="mr-4"
            required
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
          required
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
          type="button"
          color="grey-darken-2"
          class="mt-2 mb-4 ml-4"
          @click="cancelRegistration"
          >Cancelar</v-btn
        >
        <v-btn
          type="button"
          color="grey-darken-2"
          class="mt-2 mb-4 ml-4"
          @click="resetForm"
          >Limpar</v-btn
        >
      </v-form>
      
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
        student_id: this.$route.params.id,
        exercise_id: "",
        repetitions: 1,
        weight: "",
        break_time: "",
        observations: "",
        day: "segunda",
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
    };
  },

  methods: {
    async handleRegistration() {
      const isValid = await this.$refs.form.validate();
      if (isValid) {
        try {
          const response = await axios.post("http://localhost:3000/workouts", {
            student_id: this.user.student_id,
            exercise_id: this.user.exercise_id,
            repetitions: this.user.repetitions,
            weight: this.user.weight,
            break_time: this.user.break_time,
            observations: this.user.observations,
            day: this.user.day,
          });

          if (response.status >= 200 && response.status < 300) {
            this.success = alert("Treino cadastrado com sucesso!"); // Alert ao usuário em caso de sucesso
            this.resetForm();

            setTimeout(() => {
              this.success = ""; // Limpa a mensagem de sucesso após 2 segundos
            }, 2000);
          }
        } catch (error) {
          console.error("Erro ao cadastrar treino:", error);
          this.error = alert("Erro ao cadastrar treino."); // Alert ao usuário em caso de erro

          setTimeout(() => {
            this.error = ""; // Limpa a mensagem de erro após 2 segundos
          }, 2000);
        }
      }
    },

    resetForm() {
      this.$refs.form.reset();
    },

    cancelRegistration() {
      this.resetForm();
      this.$router.push("/gerenciamento-de-alunos"); // cancel volta para página anterior
    },

    async fetchExercises() {
      try {
        const response = await axios.get("http://localhost:3000/exercises"); // Busca exercícios na API
        this.exercises = response.data;
      } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
        this.error = "Erro ao carregar exercícios.";
      }
    },
  },

  mounted() {
    this.fetchExercises();
  },
};
</script>

<style>
</style>
