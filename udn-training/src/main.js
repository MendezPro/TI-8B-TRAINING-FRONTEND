import './styles/global.css'; // Carga primero los estilos globales
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';


// Importa el archivo global.css

const app = createApp(App);
app.use(router);  // Usa el router en tu aplicación
app.mount('#app');  // Monta la aplicación correctamente
