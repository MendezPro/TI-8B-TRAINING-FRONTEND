import './styles/global.css'; // Carga primero los estilos globales
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios'; // ✅ Importar axios

const app = createApp(App);

// Verificar conexión con el backend cada 5 segundos
setInterval(async () => {
  try {
    await axios.get('/api/ping'); // Cambia la ruta según tu backend
    console.log('Conexión con el servidor establecida');
  } catch (error) {
    console.error('No se pudo conectar con el servidor:', error);
  }
}, 5000);

app.use(router); // Usa el router en tu aplicación
app.mount('#app'); // Monta la aplicación correctamente

