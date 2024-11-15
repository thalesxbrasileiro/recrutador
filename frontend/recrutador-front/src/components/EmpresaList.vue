<template>
  <div class="list-container">
    <h2>Empresas</h2>
    <ul>
      <li v-for="empresa in empresas" :key="empresa.id" class="empresa-item">
        <span>{{ empresa.nome }}</span>
        <button @click="getCandidatos(empresa.id)">Ver Candidatos</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../services/api';

const empresas = ref([]);
const router = useRouter();

const fetchEmpresas = async () => {
  try {
    const response = await apiClient.get('/empresas');
    empresas.value = response.data;
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
  }
};

const getCandidatos = (empresaId) => {
  router.push({ name: 'CandidatoList', params: { empresaId } });
};

onMounted(fetchEmpresas);
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

h2 {
  color: #007BFF;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.empresa-item {
  background-color: #f9f9f9;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.empresa-item span {
  font-weight: bold;
}

button {
  background-color: #007BFF;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>