<template>
  <div>
    <h1>{{ isEditing ? 'Editar Candidato' : 'Cadastrar Candidato' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" v-model="candidato.nome" required />
      </div>
      <div>
        <label for="foto">Foto:</label>
        <input type="text" id="foto" v-model="candidato.foto" />
      </div>
      <div>
        <label for="contatos">Contatos:</label>
        <input type="text" id="contatos" v-model="candidato.contatos" />
      </div>
      <div>
        <label for="habilidades">Habilidades:</label>
        <input type="text" id="habilidades" v-model="habilidades" required />
      </div>
      <div>
        <label for="linkedin">LinkedIn:</label>
        <input type="text" id="linkedin" v-model="candidato.linkedin" />
      </div>
      <div>
        <label for="github">GitHub:</label>
        <input type="text" id="github" v-model="candidato.github" />
      </div>
      <div>
        <label for="status">Status:</label>
        <select id="status" v-model="candidato.status">
          <option value="não contratado">Não Contratado</option>
          <option value="contratado">Contratado</option>
        </select>
      </div>
      <div>
        <label for="dataContratacao">Data de Contratação:</label>
        <input type="date" id="dataContratacao" v-model="candidato.dataContratacao" />
      </div>
      <div>
        <label for="empresa">Empresa:</label>
        <select v-model="selectedEmpresa" id="empresa">
          <option v-for="empresa in empresas" :key="empresa.id" :value="empresa.id">
            {{ empresa.nome }}
          </option>
        </select>
      </div>
      <button type="submit">{{ isEditing ? 'Salvar' : 'Cadastrar' }}</button>
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
        } else {
          await apiClient.post(`/empresas/${selectedEmpresa.value}/candidatos`, candidato.value);
        }
        router.push({ name: 'CandidatoList' });
      } catch (error) {
        console.error('Erro ao salvar candidato:', error);
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