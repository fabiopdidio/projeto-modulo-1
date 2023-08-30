<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="3">
            <v-card-title> CADASTRO DE USUÁRIO </v-card-title>
            <v-card-text>
              <v-form lazy-validation @submit.prevent>
                <v-text-field
                  v-model="nome"
                  label="Nome Completo"
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="emailRules"
                  type="email"
                ></v-text-field>
  
                <v-text-field
                  v-model="password"
                  label="Senha"
                  :rules="passwordRules"
                  type="password"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Confirme a senha"
                  :rules="passwordRules"
                  type="password"
                ></v-text-field>
  
                <v-btn type="submit" block color="primary" class="mt-2"
                  >Entrar</v-btn
                >
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data: () => ({
      email: "",
      emailRules: [
        (value) => {
          if (value.includes("@")) return true;
  
          return "Invalid email address.";
        },
      ],
      password: "",
      passwordRules: [
        (value) => {
          if (value?.length >= 6) return true;
  
          return "Password must be at least 6 characters.";
        },
      ],
    }),
  };
  </script>
<style>
    
</style>