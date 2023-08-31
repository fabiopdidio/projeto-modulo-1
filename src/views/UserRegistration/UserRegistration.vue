<template>
  <v-card class="mx-auto mt-10" max-width="400" elevation="10" color="black">
    <v-card-title class="text-center font-weight-bold mb-4"
      >Crie sua conta</v-card-title
    >

    <v-card-text>
      <!-- Campo para o nome com validação do vuetify -->
      <v-form ref="form" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="user.nome"
          label="Nome completo"
          placeholder="Nome completo"
          :rules="[(v) => !!v || 'O nome é obrigatório']"
          type="text"
          variant="outlined"
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
        ></v-text-field>

        <!-- Campo para escolha do plano com o plano bronze como padrão e com validação do vuetify -->
        <v-select
          v-model="user.plan"
          :items="['Bronze', 'Prata', 'Ouro']"
          label="Tipo de plano"
          variant="outlined"
        ></v-select>

        <!-- Botão de cadastrar leva o usuário ao dashboard -->
        <v-btn
          type="submit"
          color="blue"
          class="mt-2 mb-4 ml-12"
          @click="$router.push('/dashboard')"
          >Cadastrar</v-btn
        >
        <!-- Botão de voltar leva o usuário de volta à página de login -->
        <v-btn color="white" class="mt-2 mb-4 ml-4" @click="$router.push('/')"
          >Voltar</v-btn
        >

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
    async handleSubmit() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/users", {
          name: this.user.nome,
          email: this.user.email,
          password: this.user.password,
          type_plan: this.user.plan,
        });

        if (response.status === 201) {
          alert("Usuário cadastrado com sucesso!");
          this.$router.push("/dashboard");
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
