<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Editar Empresa' : 'Cadastrar Empresa' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="empresa.nome" required />
      </div>
      <button type="submit" class="submit-button">{{ isEditing ? 'Salvar' : 'Cadastrar' }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../services/api';

const empresa = ref({ nome: '' });
const route = useRoute();
const router = useRouter();
const isEditing = ref(false);

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      await apiClient.put(`/empresas/${route.params.empresaId}`, empresa.value);
    } else {
      await apiClient.post('/empresas', empresa.value);
    }
    router.push('/');
  } catch (error) {
    console.error('Erro ao salvar empresa:', error);
  }
};

const fetchEmpresa = async () => {
  if (route.params.empresaId) {
    isEditing.value = true;
    const response = await apiClient.get(`/empresas/${route.params.empresaId}`);
    empresa.value = response.data;
  }
};

onMounted(fetchEmpresa);
</script>

<style scoped>
.form-container {
  max-width: 600px;
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

input:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-button {
  background-color: #007BFF;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background-color: #0056b3;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>