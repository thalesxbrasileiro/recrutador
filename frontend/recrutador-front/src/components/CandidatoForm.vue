<template>
  <div class="form-container">
    <h1>{{ isEditing ? 'Editar Candidato' : 'Cadastrar Candidato' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="candidato.nome" required />
      </div>
      <div class="form-group">
        <label for="foto">Foto:</label>
        <input type="text" id="foto" v-model="candidato.foto" />
      </div>
      <div class="form-group">
        <label for="contatos">Contatos:</label>
        <input type="text" id="contatos" v-model="candidato.contatos" />
      </div>
      <div class="form-group">
        <label for="habilidades">Habilidades:</label>
        <input type="text" id="habilidades" v-model="habilidades" required />
      </div>
      <div class="form-group">
        <label for="linkedin">LinkedIn:</label>
        <input type="text" id="linkedin" v-model="candidato.linkedin" />
      </div>
      <div class="form-group">
        <label for="github">GitHub:</label>
        <input type="text" id="github" v-model="candidato.github" />
      </div>
      <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" v-model="candidato.status">
          <option value="não contratado">Não Contratado</option>
          <option value="contratado">Contratado</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dataContratacao">Data de Contratação:</label>
        <input type="date" id="dataContratacao" v-model="candidato.dataContratacao" />
      </div>
      <div class="form-group">
        <label for="empresa">Empresa:</label>
        <select v-model="selectedEmpresa" id="empresa">
          <option v-for="empresa in empresas" :key="empresa.id" :value="empresa.id">
            {{ empresa.nome }}
          </option>
        </select>
      </div>
      <button type="submit" class="submit-button">{{ isEditing ? 'Salvar' : 'Cadastrar' }}</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiClient from '@/services/api';

export default {
  setup() {
    const candidato = ref({
      nome: '',
      foto: '',
      contatos: '',
      habilidades: [],
      linkedin: '',
      github: '',
      status: 'não contratado',
      dataContratacao: '',
      empresaId: '' // Adiciona o campo empresaId
    });

    const habilidades = ref('');
    const empresas = ref([]);
    const selectedEmpresa = ref('');
    const route = useRoute();
    const router = useRouter();
    const isEditing = ref(false);

    const handleSubmit = async () => {
      candidato.value.habilidades = habilidades.value.split(',').map(h => h.trim());
      candidato.value.empresaId = selectedEmpresa.value; // Define o ID da empresa selecionada
      try {
        if (isEditing.value) {
          await apiClient.put(`/empresas/${selectedEmpresa.value}/candidatos/${route.params.candidatoId}`, candidato.value);
          alert('Candidato atualizado com sucesso!');
        } else {
          await apiClient.post(`/empresas/${selectedEmpresa.value}/candidatos`, candidato.value);
          alert('Candidato cadastrado com sucesso!');
          resetForm();
        }
        router.push({ name: 'CandidatoList' });
      } catch (error) {
        // console.error('Erro ao salvar candidato:', error);
        // alert('Erro ao salvar candidato.');
      }
    };

    const fetchCandidato = async () => {
      if (route.params.candidatoId) {
        isEditing.value = true;
        const response = await apiClient.get(`/candidatos/${route.params.candidatoId}`);
        candidato.value = response.data;
        habilidades.value = candidato.value.habilidades.join(', ');
        selectedEmpresa.value = candidato.value.empresaId; // Define o ID da empresa selecionada
      }
    };

    const fetchEmpresas = async () => {
      try {
        const response = await apiClient.get('/empresas');
        empresas.value = response.data;
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    };

    const resetForm = () => {
      candidato.value = {
        nome: '',
        foto: '',
        contatos: '',
        habilidades: [],
        linkedin: '',
        github: '',
        status: 'não contratado',
        dataContratacao: '',
        empresaId: ''
      };
      habilidades.value = '';
      selectedEmpresa.value = '';
    };

    onMounted(() => {
      fetchEmpresas();
      fetchCandidato();
    });

    return {
      candidato,
      habilidades,
      empresas,
      selectedEmpresa,
      isEditing,
      handleSubmit
    };
  }
};
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

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

input:focus, select:focus {
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