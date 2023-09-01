<template>
  <v-card class="mx-auto mt-10" max-width="800" elevation="10" color="black">
    <v-card-title class="text-center font-weight-bold mb-4 mt-4"
      >Alunos</v-card-title
    >
    <v-card-text>
      <!-- Campo para o nome completo obrigatorio -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="user.name"
            label="Nome completo"
            placeholder="Nome completo"
            :rules="[(v) => !!v || 'O nome é obrigatório']"
            type="text"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <!-- Campo para o email valido opcional -->
        <v-col cols="6">
          <v-text-field
            v-model="user.email"
            label="Email"
            placeholder="Email"
            :rules="[(v) => /.+@.+\..+/.test(v) || 'Email inválido']"
            type="email"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Campo para o telefone obrigatorio -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="user.phone"
            label="Contato"
            placeholder="Contato"
            :rules="[(v) => !!v || 'O telefone é obrigatório']"
            type="phone"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <!-- Campo para o telefone obrigatorio -->
        <v-col cols="6">
          <v-text-field
            v-model="user.birthdate"
            label="Data de nascimento"
            placeholder="Data de nascimento"
            type="date"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Campos para CEP obrigatorio com verificacao na API do viacep -->
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="user.cep"
            label="CEP"
            placeholder="CEP"
            :rules="[(v) => /^[0-9]{8}$/.test(v) || 'CEP inválido']"
            @input="buscarEndereco"
            type="text"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="endereco.logradouro"
            label="Logradouro"
            type="text"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Campos para estado, bairro, cidade obrigatorios e complemento opcional -->
      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model="endereco.estado"
            label="Estado"
            type="text"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="endereco.bairro"
            label="Bairro"
            type="text"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="endereco.cidade"
            label="Cidade"
            type="text"
            variant="outlined"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="endereco.complemento"
            label="Complemento"
            type="text"
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Botão de cadastrar leva o usuário ao dashboard -->
      <v-btn type="submit" color="blue" class="mt-2 mb-4">Cadastrar</v-btn>

      <div v-if="error" class="error-message">{{ error }}</div>
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
        cep: "",
      },
      endereco: {
        logradouro: "",
        estado: "",
        bairro: "",
        cidade: "",
        complemento: "",
      },
      error: "",
    };
  },
  methods: {
    async handleRegistration() {
      try {
        this.user.endereco = this.endereco;
      } catch (error) {}
    },
    buscarEndereco() {
      if (/^[0-9]{8}$/.test(this.user.cep)) {
        axios
          .get(`https://viacep.com.br/ws/${this.user.cep}/json/`) // Busca na API do viaCEP
          .then((res) => {
            this.endereco = {
              logradouro: res.data.logradouro,
              estado: res.data.uf,
              bairro: res.data.bairro,
              cidade: res.data.localidade,
              complemento: res.data.complemento,
            };
          }) // Retorna os dados do viaCEP
          .catch((error) => console.log(error));
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
