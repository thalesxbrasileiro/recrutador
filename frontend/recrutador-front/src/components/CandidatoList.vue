<template>
  <div class="list-container">
    <h1>Lista de Candidatos</h1>
    <div class="candidato-section">
      <h3>Não Contratados</h3>
      <ul>
        <li v-for="candidato in candidatosNaoContratados" :key="candidato.id" class="candidato-item">
          <span>{{ candidato.nome }}</span>
          <div class="links">
            <a :href="candidato.linkedin" target="_blank">LinkedIn</a> | 
            <a :href="candidato.github" target="_blank">GitHub</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="candidato-section">
      <h3>Contratados</h3>
      <ul>
        <li v-for="candidato in candidatosContratados" :key="candidato.id" class="candidato-item">
          <span>{{ candidato.nome }}</span>
          <div class="links">
            <a :href="candidato.linkedin" target="_blank">LinkedIn</a> | 
            <a :href="candidato.github" target="_blank">GitHub</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiClient from '../services/api';

const candidatosNaoContratados = ref([]);
const candidatosContratados = ref([]);
const route = useRoute();
const empresaId = route.params.empresaId;

const fetchCandidatos = async () => {
  try {
    const response = await apiClient.get(`/empresas/${empresaId}`);
    const candidatos = response.data.candidatos;
    candidatosNaoContratados.value = candidatos.filter(c => c.status === 'não contratado');
    candidatosContratados.value = candidatos.filter(c => c.status === 'contratado');
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error);
  }
};

onMounted(fetchCandidatos);
</script>

<style scoped>
.list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #007BFF;
  margin-bottom: 20px;
}

.candidato-section {
  margin-bottom: 30px;
}

.candidato-section h3 {
  color: #333;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.candidato-item {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.candidato-item span {
  font-weight: bold;
}

.links a {
  color: #007BFF;
  text-decoration: none;
  margin: 0 5px;
  transition: color 0.3s ease;
}

.links a:hover {
  color: #0056b3;
}
</style>