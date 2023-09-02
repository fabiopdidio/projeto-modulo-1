<template>
  <div class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card style="width: 400px;" elevation="12" color="white">
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
        <v-btn type="submit" block color="blue" class="mt-2 mb-4 pa-5"
          >Entrar</v-btn
        >
        <!-- Palavra cadastre-se leva para página de cadastro (UserRegistration)-->
        <v-card-text class="mt-2 mb-4 text-h8 d-flex justify-center align-center"
          >Não tem conta?
          <router-link to="/cadastro">Cadastre-se</router-link></v-card-text
        >

        <!-- Exibe erro ao usuário em caso de erro -->
        <div v-if="error" class="error-message">{{ error }}</div>
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
        alert("Preencha todos os dados!");
        return;
      }

      try {
        const result = await axios.post(
          "http://localhost:3000/sessions",
          this.user
        );

        if (result.status == 200) {
          debugger;
          localStorage.setItem("user-info", JSON.stringify(result.data));
          this.$router.push("/dashboard");
        }

        console.log(result);
      } catch (error) {
        console.log(error.response.data.error);
        alert("Usuário não cadastrado!");
      }
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
