import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/index'; // Caminho correto para o seu arquivo de rotas

const app = createApp(App);
app.use(router); // Usando o router na aplicação
app.mount('#app');