<template>
  <header>
    <div class="app-bar">
    <div class="brand">TrainSys</div>
    <router-link to="/dashboard">Home</router-link>
    <router-link to="/gerenciamento-de-alunos">Alunos</router-link>
    <router-link to="/gerenciamento-de-exercicios">Exercícios</router-link>
    <router-link to="/" @click="sair">Sair</router-link>
  </div>
  </header>
</template>

<script>

export default {
  name: "Header",
};
</script>

<style scoped>
.app-bar {
  background-color: #2196F3;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  font-size: 24px;
  font-weight: bolder;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-right: auto;
  margin-left: 20px;
}

.app-bar a {
  text-decoration: none;
  color: white;
  margin-left: 10px;
  margin-right: 20px;
  font-weight: bold;

}

</style>
