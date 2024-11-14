<template>
    <div>
      <h2>Empresas</h2>
      <ul>
        <li v-for="empresa in empresas" :key="empresa.id">
          {{ empresa.nome }}
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
  