<template>
  <Header />

  <!-- Botão para voltar para o dashboard -->
  <v-card class="mx-auto mt-10" max-width="800" elevation="10" color="white">
    <v-container>
      <router-link to="/dashboard">
        <v-btn color="grey-darken-2" class="mt-4 mb-4 ml-10" @click="voltar">
          <v-icon left>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>

      <h1 class="text-center mb-4">Alunos</h1>

      <!-- Campo para buscar aluno -->
      <v-form ref="form" @submit.prevent="handleRegistration">
        <v-row class="text-center">
          <v-text-field
            v-model="searchStudent"
            label="Digite o nome do aluno"
            placeholder="Digite o nome do aluno"
            type="text"
            variant="outlined"
            class="mt-4 ml-12"
            required
          ></v-text-field>

          <v-btn type="submit" color="blue" class="mt-6 mr-2 ml-6"
            >Buscar</v-btn
          >

          <v-btn
            color="grey-darken-2"
            class="mt-6 mr-8"
            @click="$router.push('/cadastro-novo-aluno')"
          >
            Novo
          </v-btn>
        </v-row>
      </v-form>

      <v-list class="ml-16">
        <v-list-item>
          <v-row align="center" justify="center">
            <v-col cols="2">
              <strong>Nome</strong>
            </v-col>
            <v-col cols="8">
              <strong>Ações</strong>
            </v-col>
          </v-row>
        </v-list-item>
        <!-- Busca aluno na API -->
        <v-list-item v-for="(student, index) in displayedStudents" :key="index">
          <v-row align="center" justify="center">
            <v-col cols="2">
              <v-list-item-title>{{ student.name }}</v-list-item-title>
            </v-col>

            <!-- Botões de ação -->
            <v-col cols="4">
              <v-btn small color="success" @click="montarTreino(student.id)"
                >Montar treino</v-btn
              >
            </v-col>

            <v-col cols="4">
              <v-btn
                small
                color="grey-darken-2"
                @click="verTreino(student.id, student.name)"
                >Ver</v-btn
              >
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>

      <!-- Paginação no máximo 4 alunos por página -->
      <v-pagination
        v-model="currentPage"
        :length="Math.ceil(filteredStudents.length / itemsPerPage)"
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
      searchStudent: "",
      students: [],
      currentPage: 1,
      itemsPerPage: 4,
      studentName: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        this.students = res.data.students;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    montarTreino(id) {
      this.$router.push({ name: "cadastro-de-treino", params: { id } }); // Envia os dados para a próxima página
    },
    verTreino(id, name) { // Envia os dados para a próxima página
      localStorage.setItem("studentSelectedName", name);
      this.studentName = name;
      this.$router.push(`visualizacao-de-treino/${id}/${name}`);
    },
  },
  computed: {
    // Filtra os alunos com base no valor do searchStudent
    filteredStudents() {
      return this.students.filter((student) =>
        student.name.toLowerCase().includes(this.searchStudent.toLowerCase())
      );
    },
    // Retorna apenas os alunos filtrados que estão na página atual
    displayedStudents() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredStudents.slice(startIndex, endIndex);
    },
  },
};
</script>

<style></style>
