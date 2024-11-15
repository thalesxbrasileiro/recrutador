// routes/index.js
import { createRouter, createWebHistory } from 'vue-router';
import EmpresaList from '../components/EmpresaList.vue';
import CandidatoList from '../components/CandidatoList.vue';
import CandidatoForm from '../components/CandidatoForm.vue'; // Importando o componente
import EmpresaForm from '../components/EmpresaForm.vue'; // Importando o componente

const routes = [
  { path: '/', name: 'EmpresaList', component: EmpresaList },
  { path: '/empresas/:empresaId/candidatos', name: 'CandidatoList', component: CandidatoList, props: true },
  { path: '/candidatos/novo', name: 'CandidatoForm', component: CandidatoForm }, // Nova rota
  { path: '/empresas/nova', name: 'EmpresaForm', component: EmpresaForm } // Nova rota
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;