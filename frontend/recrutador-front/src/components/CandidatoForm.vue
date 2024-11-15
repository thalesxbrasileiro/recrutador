<template>
    <div>
      <h2>{{ isEditing ? "Editar Candidato" : "Adicionar Candidato" }}</h2>
      <form @submit.prevent="handleSubmit">
        <label for="nome">Nome:</label>
        <input v-model="candidato.nome" type="text" id="nome" required />
  
        <label for="foto">Foto (URL):</label>
        <input v-model="candidato.foto" type="text" id="foto" />
  
        <label for="email">Email:</label>
        <input v-model="candidato.contatos.email" type="email" id="email" required />
  
        <label for="telefone">Telefone:</label>
        <input v-model="candidato.contatos.telefone" type="tel" id="telefone" />
  
        <label for="habilidades">Habilidades (separadas por vírgula):</label>
        <input v-model="habilidades" type="text" id="habilidades" />
  
        <label for="linkedin">LinkedIn:</label>
        <input v-model="candidato.linkedin" type="text" id="linkedin" />
  
        <label for="github">GitHub:</label>
        <input v-model="candidato.github" type="text" id="github" />
  
        <label for="status">Status:</label>
        <select v-model="candidato.status" id="status" required>
          <option value="contratado">Contratado</option>
          <option value="não contratado">Não Contratado</option>
        </select>
  
        <button type="submit">{{ isEditing ? "Atualizar" : "Criar" }}</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import apiClient from '../services/api';
  
  const candidato = ref({
    nome: '',
    foto: '',
    contatos: { email: '', telefone: '' },
    habilidades: [],
    linkedin: '',
    github: '',
    status: 'não contratado',
  });
  
  const habilidades = ref('');
  const route = useRoute();
  const router = useRouter();
  const isEditing = ref(false);
  
  const handleSubmit = async () => {
    candidato.value.habilidades = habilidades.value.split(',').map(h => h.trim());
    try {
      if (isEditing.value) {
        await apiClient.put(`/empresas/${route.params.empresaId}/candidatos/${route.params.candidatoId}`, candidato.value);
      } else {
        await apiClient.post(`/empresas/${route.params.empresaId}/candidatos`, candidato.value);
      }
      router.push({ name: 'CandidatoList', params: { empresaId: route.params.empresaId } });
    } catch (error) {
      console.error('Erro ao salvar candidato:', error);
    }
  };
  
  const fetchCandidato = async () => {
    if (route.params.candidatoId) {
      isEditing.value = true;
      const response = await apiClient.get(`/empresas/${route.params.empresaId}/candidatos/${route.params.candidatoId}`);
      candidato.value = response.data;
      habilidades.value = candidato.value.habilidades.join(', ');
    }
  };
  
  onMounted(fetchCandidato);
  </script>
  