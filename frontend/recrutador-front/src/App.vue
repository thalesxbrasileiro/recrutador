<template>
  <div id="app">
    <header>
      <h1>Gestão de Empresas e Candidatos</h1>
    </header>
    <div class="buttons">
      <button @click="goToHome">Home</button>
      <button @click="goToCandidatoForm">Cadastrar Candidato</button>
      <button @click="goToEmpresaForm">Cadastrar Empresa</button>
    </div>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};

const goToCandidatoForm = () => {
  router.push({ name: 'CandidatoForm' });
};

const goToEmpresaForm = () => {
  router.push({ name: 'EmpresaForm' });
};
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

header {
  background-color: #007BFF;
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.clickable-title {
  cursor: pointer;
  transition: color 0.3s ease;
}

.clickable-title:hover {
  color: #0056b3;
}

.buttons {
  margin-bottom: 20px;
}

button {
  background-color: #007BFF;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

main {
  padding: 20px;
  background-color: #f1f1f1;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>