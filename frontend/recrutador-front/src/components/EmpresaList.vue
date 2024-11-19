<template>
  <div class="list-container">
    <h1>Empresas Cadastradas</h1>
    <div v-if="empresas.length" class="empresa-section">
      <table class="empresa-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in empresas" :key="empresa.id">
            <td>
              <span v-if="!empresa.isEditing">{{ empresa.nome }}</span>
              <input v-else type="text" v-model="empresa.nome" class="edit-input" />
            </td>
            <td>
              <i class="fas fa-eye" @click="viewCandidatos(empresa.id)"></i>
              <i class="fas fa-edit" @click="toggleEdit(empresa)"></i>
              <i class="fas fa-trash" @click="deleteEmpresa(empresa.id)"></i>
              <i v-if="empresa.isEditing" class="fas fa-save" @click="saveEmpresa(empresa)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Nenhuma empresa encontrada.</p>
    </div>
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
    empresas.value = response.data.map(empresa => ({ ...empresa, isEditing: false }));
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
  }
};

const viewCandidatos = (empresaId) => {
  router.push({ name: 'CandidatoList', params: { empresaId } });
};

const toggleEdit = (empresa) => {
  empresa.isEditing = !empresa.isEditing;
};

const saveEmpresa = async (empresa) => {
  try {
    await apiClient.put(`/empresas/${empresa.id}`, { nome: empresa.nome });
    empresa.isEditing = false;
    fetchEmpresas();
  } catch (error) {
    console.error('Erro ao salvar empresa:', error);
  }
};

const deleteEmpresa = async (empresaId) => {
  try {
    console.log(`Tentando deletar empresa com ID: ${empresaId}`);
    await apiClient.delete(`/empresas/${empresaId}`);
    console.log(`Empresa com ID: ${empresaId} deletada com sucesso`);
    fetchEmpresas(); 
  } catch (error) {
    console.error('Erro ao deletar empresa:', error);
  }
};

onMounted(fetchEmpresas);
</script>

<style scoped>
.list-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #007BFF;
  margin-bottom: 20px;
  text-align: center;
}

.empresa-section {
  margin-bottom: 30px;
}

.empresa-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.empresa-table th, .empresa-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.empresa-table th {
  background-color: #007BFF;
  color: white;
  font-weight: bold;
}

.empresa-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.edit-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 14px;
}

.edit-input:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.fas {
  cursor: pointer;
  margin: 0 5px;
  color: #007BFF;
  transition: color 0.3s ease;
}

.fas:hover {
  color: #0056b3;
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