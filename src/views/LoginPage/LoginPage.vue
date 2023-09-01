<template>
  <v-card class="mx-auto mt-10" max-width="400" elevation="10" color="black">
    <v-card-title class="text-center font-weight-bold mb-4 mt-8">Login</v-card-title>
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
        ></v-text-field>

        <!-- Campo para a senha com validação do vuetify -->
        <v-text-field
          v-model="user.password"
          label="Password"
          placeholder="Digite sua senha"
          :rules="[(v) => !!v || 'A senha é obrigatória']"
          type="password"
          variant="outlined"
        ></v-text-field>

        <!-- Botão do tipo submit para envio do formulário -->
        <v-btn type="submit" block color="white" class="mt-2 mb-4"
          >Entrar</v-btn
        >
        <!-- Palavra cadastre-se leva para página de cadastro (UserRegistration)-->
        <v-card-text class="mt-2 mb-4"
          >Não tem conta?
          <router-link to="/cadastro">Cadastre-se</router-link></v-card-text
        >
        
        <!-- Exibe erro ao usuário em caso de erro -->
        <div v-if="error" class="error-message">{{ error }}</div>
      </v-form>
    </v-card-text>
  </v-card>
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
      error: "",
    };
  },
  methods: {
    // Transforma a ação em assíncrona
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate();

      // Define mensagem em caso dos campos não serem preenchidos
      if (!valid) {
        alert("Preencha todos os campos!");
        return;
      }

      // Verifica se o usuário é cadastrado
      try {
        const response = await axios.post("http://localhost:3000/sessions", {
          email: this.user.email,
          password: this.user.password,
        });

        if (response.status === 200) {
          // Salvar nome do usuário e token no localStorage
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("token", response.data.token);

          // Caso o login for bem-sucedido, o usuário é direcionado para o Dashboard
          this.$router.push("/dashboard");
        }
      } catch (error) {
        // Exibe mensagem de erro na tela
        if (error.response) {
          this.error = error.response.data.message;
        } else {
          console.error("Erro ao fazer requisição:", error);
        }
      }

      this.$refs.form.reset();
    },
  },
};
</script>

<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
