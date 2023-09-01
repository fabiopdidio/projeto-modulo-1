<template>
  <v-card class="mx-auto mt-10" max-width="400" elevation="10" color="black">
    <v-card-title class="text-center font-weight-bold mb-4 mt-4"
      >Alunos</v-card-title
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
        ></v-text-field>

        <!-- Campo para o email com validação do vuetify -->
        <v-text-field
          v-model="user.email"
          label="Email"
          placeholder="Email"
          :rules="[(v) => /.+@.+\..+/.test(v) || 'Email inválido']"
          type="email"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="user.phone"
          label="Contato"
          placeholder="Contato"
          :rules="[(v) => !!v || 'O telefone é obrigatório']"
          type="phone"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="user.phone"
          label="Data de nascimento"
          placeholder="Contato"
          type="date"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="user.cep"
          label="CEP"
          placeholder="CEP"
          :rules="[(v) => /^[0-9]{8}$/.test(v) || 'CEP inválido']"
          @input="buscarEndereco"
          type="text"
          variant="outlined"
        ></v-text-field>

        <v-text-field
          v-model="endereco.logradouro"
          label="Logradouro"
          type="text"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="endereco.estado"
          label="Estado"
          type="text"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="endereco.bairro"
          label="Bairro"
          type="text"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="endereco.cidade"
          label="Cidade"
          type="text"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-model="endereco.complemento"
          label="Complemento"
          type="text"
          variant="outlined"
        ></v-text-field>

        <!-- Botão de cadastrar leva o usuário ao dashboard -->
        <v-btn type="submit" color="blue" class="mt-2 mb-4">Cadastrar</v-btn>

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
          .get(`https://viacep.com.br/ws/${this.user.cep}/json/`)
          .then((res) => {
            this.endereco = {
              logradouro: res.data.logradouro,
              estado: res.data.uf,
              bairro: res.data.bairro,
              cidade: res.data.localidade,
              complemento: res.data.complemento,
            };
          })
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
Agora, quando o usuário digitar um CEP válido, os campos de logradouro, estado,
bairro, cidade e complemento serão preenchidos automaticamente com os dados
obtidos da API do ViaCEP. Certifique-se de ajustar os campos e validações de
acordo com sua necessidade.
