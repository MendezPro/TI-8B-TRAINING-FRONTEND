import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import DashboardView from '../components/DashboardView.vue';
import HomeView from '../components/HomeView.vue';
import RegisterView from '../components/RegisterView.vue';
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/register', name: 'Register', component: RegisterView }, // Ruta para registro
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;