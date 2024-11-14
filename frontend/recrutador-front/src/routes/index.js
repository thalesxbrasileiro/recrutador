import { createRouter, createWebHistory } from 'vue-router';
import EmpresaList from '../components/EmpresaList.vue';
import CandidatoList from '../components/CandidatoList.vue';

const routes = [
  { path: '/', name: 'EmpresaList', component: EmpresaList },
  { path: '/empresas/:empresaId/candidatos', name: 'CandidatoList', component: CandidatoList, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
