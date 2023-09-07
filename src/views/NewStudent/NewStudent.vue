<template>
  <Header />

  <v-card class="mx-auto mt-4" max-width="700" elevation="10" color="white">
    <!-- Botão para voltar ao dashboard -->
    <router-link to="/dashboard">
      <v-btn color="grey-darken-2" class="mt-6 ml-8" @click="voltar">
        <v-icon left>mdi-arrow-left</v-icon>
      </v-btn>
    </router-link>
    <v-card-title class="text-center font-weight-bold mb-4"
      >Novo aluno</v-card-title
    >

    <div v-if="error" class="error-message">({{ error }})</div>
    <div v-if="success" class="success-message">{{ success }}</div>

    <v-card-text>
      <v-form ref="form" @submit.prevent="handleRegistration">
        <!-- Campo para o nome completo obrigatório -->
        <v-row>
          <v-col cols="12" sm="6" ml-4>
            <v-text-field
              v-model="user.name"
              label="Nome completo"
              placeholder="Nome completo"
              :rules="[(v) => !!v || 'O nome é obrigatório']"
              type="text"
              variant="outlined"
              class="ml-4"
            ></v-text-field>
          </v-col>

          <!-- Campo para o email válido e opcional -->
          <v-col cols="12" sm="6">
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
              class="mr-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Campo para o contato obrigatório -->
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.contact"
              label="Contato"
              placeholder="Contato"
              :rules="[(v) => !!v || 'O contato é obrigatório']"
              type="text"
              variant="outlined"
              class="ml-4"
            ></v-text-field>
          </v-col>

          <!-- Campo para a data de nascimento opcional -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.date_birth"
              label="Data de nascimento"
              placeholder="Data de nascimento"
              :rules="[(v) => !v || v <= getCurrentDate() || 'Data inválida']"
              type="date"
              variant="outlined"
              class="mr-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Campos para o endereço com preenchimento automatico apos busca na API do viaCEP-->
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.cep"
              label="CEP"
              placeholder="CEP"
              :rules="[(v) => !!v || 'O CEP é obrigatório']"
              @blur="buscarEndereco"
              type="text"
              variant="outlined"
              class="ml-4"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="user.street"
              label="Logradouro"
              placeholder="Logradouro"
              :rules="[(v) => !!v || 'O logradouro é obrigatório']"
              type="text"
              variant="outlined"
              class="mr-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="user.number"
              label="Número"
              placeholder="Número"
              :rules="[(v) => !!v || 'O número é obrigatório']"
              type="text"
              variant="outlined"
              class="ml-4"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="user.complement"
              label="Complemento"
              placeholder="Complemento"
              type="text"
              variant="outlined"
              class="mr-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="user.neighborhood"
              label="Bairro"
              placeholder="Bairro"
              :rules="[(v) => !!v || 'O bairro é obrigatório']"
              type="text"
              variant="outlined"
              class="ml-4"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="user.city"
              label="Cidade"
              placeholder="Cidade"
              :rules="[(v) => !!v || 'A cidade é obrigatória']"
              type="text"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4">
            <v-text-field
              v-model="user.province"
              label="Estado"
              placeholder="Estado"
              :rules="[(v) => !!v || 'O estado é obrigatória']"
              type="text"
              variant="outlined"
              class="mr-4"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- Botão de cadastrar -->
        <v-btn type="submit" color="blue" class="ml-4 mt-2 mb-4 mx-auto"
          >Cadastrar</v-btn
        >
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import Header from "../../components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        contact: "",
        date_birth: "",
        cep: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        province: "",
        complement: "",
      },
      endereco: {
        logradouro: "",
      },
      error: "",
      success: "",
    };
  },
  methods: {
    getCurrentDate() {
      const currentDate = new Date();
      return currentDate.toISOString().split("T")[0];
    },

    async buscarEndereco() {
      if (/^[0-9]{8}$/.test(this.user.cep)) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${this.user.cep}/json/`
          );
          this.user.street = response.data.logradouro || "";
          this.user.neighborhood = response.data.bairro;
          this.user.city = response.data.localidade;
          this.user.province = response.data.uf;
        } catch (error) {
          this.error = "";
        }
      }
    },

    async handleRegistration() {
      if (
        !this.user.name ||
        !this.user.contact ||
        !this.user.cep ||
        !this.user.email.match(/.+@.+\..+/)
      ) {
        alert("Preencha todos os dados obrigatorio!");
        this.success = "";
        return;
      }

      const isValid = await this.$refs.form.validate();

      if (isValid) {
        try {
          const response = await axios.post("http://localhost:3000/students", {
            name: this.user.name,
            email: this.user.email,
            contact: this.user.contact,
            date_birth: this.user.date_birth,
            cep: this.user.cep,
            street: this.user.street,
            number: this.user.number,
            neighborhood: this.user.neighborhood,
            city: this.user.city,
            province: this.user.province,
            complement: this.user.complement,
          });

          if (response.status === 200) {
            // Armazena o nome do usuário no Local Storage
            localStorage.setItem("username", this.user.name);
            localStorage.setItem("student-info", JSON.stringify(this.user));
          }

          this.success = alert("Aluno cadastrado com sucesso!");
          this.error = "";
          this.clearFields();
        } catch (error) {
          this.error = "Falha ao concluir cadastro de aluno.";
          this.success = "";
        }
      }
    },
    clearFields() {
      // Define os campos do usuário de volta para vazio
      this.user.name = "";
      this.user.email = "";
      this.user.contact = "";
      this.user.date_birth = "";
      this.user.cep = "";
      this.user.street = "";
      this.user.number = "";
      this.user.neighborhood = "";
      this.user.city = "";
      this.user.province = "";
      this.user.complement = "";
    },
  },
};
</script>

<style>
.error-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
