import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';


// Importa el archivo global.css
import './styles/global.css'; // Asegúrate de que la ruta sea correctaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

const app = createApp(App);
app.use(router);  // Usa el router en tu aplicación
app.mount('#app');  // Monta la aplicación correctamente
