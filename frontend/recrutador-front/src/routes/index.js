import { createRouter, createWebHistory } from 'vue-router';
import EmpresaList from '../components/EmpresaList.vue';
import CandidatoList from '../components/CandidatoList.vue';
import CandidatoForm from '../components/CandidatoForm.vue'; 
import EmpresaForm from '../components/EmpresaForm.vue'; 

const routes = [
  { path: '/', name: 'EmpresaList', component: EmpresaList },
  { path: '/empresas/:empresaId/candidatos', name: 'CandidatoList', component: CandidatoList, props: true },
  { path: '/candidatos/novo', name: 'CandidatoForm', component: CandidatoForm }, 
  { path: '/empresas/nova', name: 'EmpresaForm', component: EmpresaForm }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;