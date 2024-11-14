<template>
    <div>
      <h2>Candidatos da Empresa</h2>
      <div>
        <h3>Não Contratados</h3>
        <ul>
          <li v-for="candidato in candidatosNaoContratados" :key="candidato.id">
            {{ candidato.nome }} - 
            <a :href="candidato.linkedin" target="_blank">LinkedIn</a> | 
            <a :href="candidato.github" target="_blank">GitHub</a>
          </li>
        </ul>
  
        <h3>Contratados</h3>
        <ul>
          <li v-for="candidato in candidatosContratados" :key="candidato.id">
            {{ candidato.nome }} - 
            <a :href="candidato.linkedin" target="_blank">LinkedIn</a> | 
            <a :href="candidato.github" target="_blank">GitHub</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import apiClient from '../services/api';
  
  const candidatosNaoContratados = ref([]);
  const candidatosContratados = ref([]);
  const route = useRoute();
  const empresaId = route.
  