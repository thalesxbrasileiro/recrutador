<template>
  <div class="list-container">
    <h1>Candidatos</h1>
    <div v-if="candidatos.length" class="candidato-section">
      <table class="candidato-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nome</th>
            <th>Contatos</th>
            <th>Habilidades</th>
            <th>Status</th>
            <th>Data de Contratação</th>
            <th>LinkedIn</th>
            <th>GitHub</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidato in candidatos" :key="candidato.id">
            <td><img :src="candidato.foto" alt="Foto do candidato" class="candidato-foto" /></td>
            <td>{{ candidato.nome }}</td>
            <td>{{ candidato.contatos }}</td>
            <td>{{ candidato.habilidades.join(', ') }}</td>
            <td>{{ candidato.status }}</td>
            <td>{{ formatDate(candidato.dataContratacao) }}</td>
            <td><a :href="candidato.linkedin" target="_blank">LinkedIn</a></td>
            <td><a :href="candidato.github" target="_blank">GitHub</a></td>
            <td>
              <i class="fas fa-edit" @click="editCandidato(candidato.id)"></i>
              <i class="fas fa-trash" @click="deleteCandidato(candidato.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Nenhum candidato encontrado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '../services/api';

const candidatos = ref([]);
const route = useRoute();
const router = useRouter();
const empresaId = route.params.empresaId;

const fetchCandidatos = async () => {
  try {
    const response = await apiClient.get(`/empresas/${empresaId}`);
    candidatos.value = response.data.candidatos;
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error);
  }
};

const editCandidato = (candidatoId) => {
  router.push({ name: 'CandidatoForm', params: { candidatoId, empresaId } });
};

const deleteCandidato = async (candidatoId) => {
  try {
    console.log(`Tentando deletar candidato com ID: ${candidatoId}`);
    await apiClient.delete(`/empresas/${empresaId}/candidatos/${candidatoId}`);
    console.log(`Candidato com ID: ${candidatoId} deletado com sucesso`);
    fetchCandidatos(); // Atualiza a lista de candidatos após a exclusão
  } catch (error) {
    console.error('Erro ao deletar candidato:', error);
  }
};

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

onMounted(fetchCandidatos);
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

.candidato-section {
  margin-bottom: 30px;
}

.candidato-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.candidato-table th, .candidato-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.candidato-table th {
  background-color: #007BFF;
  color: white;
  font-weight: bold;
}

.candidato-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.candidato-foto {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.links a {
  color: #007BFF;
  text-decoration: none;
  transition: color 0.3s ease;
}

.links a:hover {
  color: #0056b3;
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
</style>