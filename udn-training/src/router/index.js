import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import DashboardView from '../components/DashboardView.vue';
import HomeView from '../components/HomeView.vue';
import RegisterView from '../components/RegisterView.vue';
import DietasView from '../components/views/NutricionAdmin/DietasView.vue';
import EjerciciosAdminView from '../components/views/TrainingAdmin/EjerciciosAdminView.vue';
const routes = [
  { path: '/dietas', name: 'Dietas', component: DietasView }, // Ruta para dietas
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/ejercicios', name: 'Ejercicios', component: EjerciciosAdminView }, // Ruta para ejercicios en administración de entrenamiento
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/register', name: 'Register', component: RegisterView }, // Ruta para registro
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;