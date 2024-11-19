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
            <td>
              <img v-if="!candidato.isEditing" :src="candidato.foto" alt="Foto do candidato" class="candidato-foto" />
              <input v-else type="text" v-model="candidato.foto" class="edit-input" />
            </td>
            <td>
              <span v-if="!candidato.isEditing">{{ candidato.nome }}</span>
              <input v-else type="text" v-model="candidato.nome" class="edit-input" />
            </td>
            <td>
              <span v-if="!candidato.isEditing">{{ candidato.contatos }}</span>
              <input v-else type="text" v-model="candidato.contatos" class="edit-input" />
            </td>
            <td>
              <span v-if="!candidato.isEditing">{{ candidato.habilidades.join(', ') }}</span>
              <input v-else type="text" v-model="candidato.habilidades" class="edit-input" />
            </td>
            <td>
              <span v-if="!candidato.isEditing">{{ candidato.status }}</span>
              <select v-else v-model="candidato.status" class="edit-input">
                <option value="não contratado">Não Contratado</option>
                <option value="contratado">Contratado</option>
              </select>
            </td>
            <td>
              <span v-if="!candidato.isEditing">{{ formatDate(candidato.dataContratacao) }}</span>
              <input v-else type="date" v-model="candidato.dataContratacao" class="edit-input" />
            </td>
            <td>
              <a v-if="!candidato.isEditing" :href="candidato.linkedin" target="_blank">LinkedIn</a>
              <input v-else type="text" v-model="candidato.linkedin" class="edit-input" />
            </td>
            <td>
              <a v-if="!candidato.isEditing" :href="candidato.github" target="_blank">GitHub</a>
              <input v-else type="text" v-model="candidato.github" class="edit-input" />
            </td>
            <td>
              <i v-if="!candidato.isEditing" class="fas fa-edit" @click="toggleEdit(candidato)"></i>
              <i v-else class="fas fa-save" @click="saveCandidato(candidato)"></i>
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
    candidatos.value = response.data.candidatos.map(candidato => ({ ...candidato, isEditing: false }));
  } catch (error) {
    console.error('Erro ao buscar candidatos:', error);
  }
};

const toggleEdit = (candidato) => {
  candidato.isEditing = !candidato.isEditing;
};

const saveCandidato = async (candidato) => {
  try {
    console.log(`Tentando salvar candidato com ID: ${candidato.id}`);
    await apiClient.put(`/empresas/${empresaId}/candidatos/${candidato.id}`, candidato);
    console.log(`Candidato com ID: ${candidato.id} salvo com sucesso`);
    candidato.isEditing = false;
    fetchCandidatos(); // Atualiza a lista de candidatos após a edição
  } catch (error) {
    console.error('Erro ao salvar candidato:', error);
  }
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
  width: 90%;
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

.nome-column {
  width: 20%;
}

.contatos-column {
  width: 20%;
}

.data-column {
  width: 10%;
}

.edit-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 14px;
  margin-bottom: 5px;
}

.edit-input:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
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