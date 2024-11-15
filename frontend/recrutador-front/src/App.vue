<template>
  <div id="app">
    <h1>Gestão de Empresas e Candidatos</h1>
    <div class="buttons">
      <button @click="goToCandidatoForm">Cadastrar Candidato</button>
      <button @click="goToEmpresaForm">Cadastrar Empresa</button>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToCandidatoForm = () => {
  router.push({ name: 'CandidatoForm' });
};

const goToEmpresaForm = () => {
  router.push({ name: 'EmpresaForm' });
};
</script>