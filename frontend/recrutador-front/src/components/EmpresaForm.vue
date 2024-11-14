<template>
    <div>
      <h2>{{ isEditing ? "Editar Empresa" : "Adicionar Empresa" }}</h2>
      <form @submit.prevent="handleSubmit">
        <label for="nome">Nome da Empresa:</label>
        <input v-model="empresa.nome" type="text" id="nome" required />
        <button type="submit">{{ isEditing ? "Atualizar" : "Criar" }}</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';
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
  