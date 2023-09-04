<template>
  <div>    
    <!-- Configuração do card e título-->
    <v-card class="mx-auto mt-16" max-width="500" elevation="10" color="white">
      <v-card-title class="text-center font-weight-bold mb-4 mt-12"
        >Login</v-card-title
      >
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <!-- Campo para o email com validação do vuetify -->
          <v-text-field
            v-model="user.email"
            label="Email"
            placeholder="Digite seu email"
            :rules="[(v) => !!v || 'O email é obrigatório']"
            type="email"
            variant="outlined"
            class="mr-6 ml-6 mb-2"
          ></v-text-field>

          <!-- Campo para a senha com validação do vuetify -->
          <v-text-field
            v-model="user.password"
            label="Senha"
            placeholder="Digite sua senha"
            :rules="[(v) => !!v || 'A senha é obrigatória']"
            type="password"
            variant="outlined"
            class="mr-6 ml-6"
          ></v-text-field>

          <!-- Botão do tipo submit para envio do formulário -->
          <div class="d-flex justify-center">
            <v-btn type="submit" color="blue" class="mt-2">Entrar</v-btn>
          </div>

          <!-- Linha para divisão -->
          <hr class="mt-16" />
          
          <!-- Palavra cadastre-se leva para página de cadastro (UserRegistration)-->
          <v-card-text
            class="mt-2 mb-8 text-h8 d-flex justify-center align-center"
            >Ainda não tem conta?
            <router-link to="/cadastro" class="ml-1">Cadastre-se</router-link></v-card-text
          >

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        alert("Preencha todos os dados!"); // alert em caso de deixar 1 ou 2 campos vazios
        return;
      }

      try {
        const result = await axios.post( // requisicao para /sessions -POST
          "http://localhost:3000/sessions",
          this.user
        );

        if (result.status == 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data)); // guarda os dados do usuario no Local Storage
          this.$router.push("/dashboard"); // apos cadastro, direciona o usuario para o dashboard
        }

        console.log(result); // mostra o status code no console

      } catch (error) {
        console.log(error.response.data.error);
        alert("Usuário não cadastrado!"); // mostra mensagem ao usuario
      }
    },
  },
};
</script>

<style>
</style>