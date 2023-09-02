<template>
  <v-card class="mx-auto mt-16" max-width="500" elevation="10" color="white">
    <v-card-title class="text-center font-weight-bold ma-8"
      >Crie sua conta</v-card-title
    >
    <v-card-text>
      <!-- Campo para o nome com validação do vuetify -->
      <v-form ref="form" @submit.prevent="handleRegistration">
        <v-text-field
          v-model="user.name"
          label="Nome completo"
          placeholder="Nome completo"
          :rules="[(v) => !!v || 'O nome é obrigatório']"
          type="text"
          variant="outlined"
          class="mr-8 ml-8"
        ></v-text-field>

        <!-- Campo para o email com validação do vuetify -->
        <v-text-field
          v-model="user.email"
          label="Email"
          placeholder="Email"
          :rules="[
            (v) => !!v || 'O email é obrigatório',
            (v) => /.+@.+\..+/.test(v) || 'Email inválido',
          ]"
          type="email"
          variant="outlined"
          class="mr-8 ml-8"
        ></v-text-field>

        <!-- Campo para a senha com validação do vuetify -->
        <v-text-field
          v-model="user.password"
          label="Senha"
          placeholder="Digite sua senha"
          :rules="[
            (v) => !!v || 'A senha é obrigatória',
            (v) =>
              (v && v.length >= 8 && v.length <= 20) ||
              'A senha deve ter entre 8 e 20 caracteres',
          ]"
          type="password"
          variant="outlined"
          class="mr-8 ml-8"
        ></v-text-field>

        <!-- Campo para confirmação de senha com validação do vuetify -->
        <v-text-field
          v-model="user.passwordConfirmation"
          label="Confirme a senha"
          placeholder="Confirme a senha"
          :rules="[
            (v) => !!v || 'A confirmação de senha é obrigatória',
            (v) => v === user.password || 'As senhas não coincidem',
          ]"
          type="password"
          variant="outlined"
          class="mr-8 ml-8"
        ></v-text-field>

        <!-- Campo para escolha do plano com o plano bronze como padrão e com validação do vuetify -->
        <v-select
          v-model="user.plan"
          :items="['Bronze', 'Prata', 'Ouro']"
          label="Tipo de plano"
          variant="outlined"
          class="mr-8 ml-8"
        ></v-select>

        <!-- Botão de cadastrar leva o usuário ao dashboard -->
        <div class="d-flex justify-center">
          <v-btn type="submit" color="blue" class="mt-2 mb-4 mr-4">Cadastrar</v-btn>

          <!-- Botão de voltar leva o usuário de volta à página de login -->
          <v-btn color="grey" class="mt-2 mb-4" @click="$router.push('/')"
            >Voltar</v-btn
          >
        </div>

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
        nome: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        plan: "Bronze",
      },
      error: "",
    };
  },
  methods: {
    async handleRegistration() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/users", {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          type_plan: this.user.plan,
        });

        if (response.status === 201) {
          // Salvar o nome do usuário no Local Storage
          localStorage.setItem("name", this.user.name);
          alert("Usuário cadastrado com sucesso!");
          this.$router.push("/"); // Leva usuario para a pagina de login
        }
      } catch (error) {
        if (error.response) {
          this.error = "Não foi possível criar a conta neste momento.";
        } else {
          console.error("Erro ao fazer requisição:", error);
        }
      }

      if (this.$refs.form) {
        this.$refs.form.reset();
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
