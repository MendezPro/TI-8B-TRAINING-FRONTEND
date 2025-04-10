import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import DashboardView from '../components/DashboardView.vue';
import HomeView from '../components/HomeView.vue';
import RegisterView from '../components/RegisterView.vue';
import DietasView from '../components/views/NutricionAdmin/DietasView.vue';
import EjerciciosAdminView from '../components/views/TrainingAdmin/EjerciciosAdminView.vue';
import ErrorView from "../components/ErrorView.vue";
import NewDietaView from '../components/views/NutricionAdmin/NewDietaView.vue';
import NewEjercicioView from '@/components/TrainingAdmin/NewEjercicioView.vue';
import ExpedienteMedico from '@/components/TrainingAdmin/ExpedienteMedico.vue';
import NewExpediente from '@/components/TrainingAdmin/NewExpediente.vue';
import UsuariosView from '@/components/TrainingAdmin/UsuariosView.vue';
import EditarUsuarioView from '@/components/TrainingAdmin/EditarUsuarioView.vue';
import EditarDietas from '@/components/views/NutricionAdmin/EditarDietas.vue';
import EditarEjercicios from '@/components/views/TrainingAdmin/EditarEjercicios.vue';
import EditarExpediente from '@/components/TrainingAdmin/EditarExpediente.vue';
import PerfilView from '@/components/PerfilView.vue';
import MisDietas from '@/components/views/NutricionAdmin/MisDietas.vue';
import MisEjercicios from '@/components/TrainingAdmin/MisEjercicios.vue';
import MisDatos from '@/components/TrainingCliente/MisDatos.vue';
import MiExpediente from '@/components/TrainingCliente/MiExpediente.vue';
import ViewError from "../components/ViewError.vue";
import ProgresoUsuario from '@/components/ProgresoUsuario.vue';
import IndicadorView from '@/components/views/TrainingAdmin/IndicadorView.vue';
import IndicadorForm from '@/components/views/TrainingAdmin/IndicadorForm.vue';
import IndicadorEdit from '@/components/views/TrainingAdmin/IndicadorEdit.vue';
import GraficaExpedientes from '@/components/GraficaExpedientes.vue';
import RutinasView from '../components/views/TrainingAdmin/RutinasView.vue';

const routes = [
  { path: '/rutinas', name: 'Rutinas', component: RutinasView, meta: { requiresAdmin: true } },
  { path: '/progreso', name: 'ProgresoUsuario', component: ProgresoUsuario },
  { path: '/dietas', name: 'Dietas', component: DietasView, meta: { requiresAdmin: true } },
  { path: '/', name: 'Home', component: HomeView },
  { path: '/error', name: 'Error', component: ErrorView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/ejercicios', name: 'Ejercicios', component: EjerciciosAdminView, meta: { requiresAdmin: true } },
  { path: '/dashboard', name: 'Dashboard', component: DashboardView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/dietas/nueva', name: 'NuevaDieta', component: NewDietaView, meta: { requiresAdmin: true } },
  { path: '/ejercicios/nuevo', name: 'NuevoEjercicio', component: NewEjercicioView, meta: { requiresAdmin: true } },
  { path: '/expediente', name: 'Expediente', component: ExpedienteMedico, meta: { requiresAdmin: true } },
  { path: '/expedientes/nuevo', name: 'NuevoExpediente', component: NewExpediente, meta: { requiresAdmin: true } },
  { path: '/usuarios', name: 'Usuarios', component: UsuariosView },
  { path: '/usuarios/editar/:id', name: 'EditarUsuario', component: EditarUsuarioView, meta: { requiresAdmin: true } },
  { path: '/dietas/editar/:id', name: 'EditarDieta', component: EditarDietas, meta: { requiresAdmin: true } },
  { path: '/ejercicios/editar/:id', name: 'EditarEjercicio', component: EditarEjercicios, meta: { requiresAdmin: true } },
  { path: '/expedientes/editar/:curp', name: 'EditarExpediente', component: EditarExpediente, meta: { requiresAdmin: true } },
  { path: '/perfil', name: 'Perfil', component: PerfilView },
  { path: '/perfil/misdietas', name: 'MisDietas', component: MisDietas },
  { path: '/perfil/misejercicios', name: 'MisEjercicios', component: MisEjercicios },
  { path: '/perfil/misdatos', name: 'MisDatos', component: MisDatos },
  { path: '/perfil/miexpediente', name: 'MiExpediente', component: MiExpediente },
  { path: '/indicadores', name: 'Indicador', component: IndicadorView, meta: { requiresAdmin: true } },
  { path: '/indicadores/nuevo', name: 'IndicadorForm', component: IndicadorForm, meta: { requiresAdmin: true } },
  { path: '/indicadores/editar/:id', name: 'IndicadorEdit', component: IndicadorEdit, meta: { requiresAdmin: true } },
  { path: '/error', name: 'Error', component: ViewError },
  { path: '/grafica', name: 'GraficaExpedientes', component: GraficaExpedientes, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Lógica de redirección directamente en router.beforeEach
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Verifica si hay un token en localStorage

  if (to.path === '/dashboard' && !isAuthenticated) {
    console.warn('Acceso denegado: Usuario no autenticado');
    next('/register'); // Redirige al registro
  } else {
    next(); // Permite el acceso a otras rutas
  }
});

export default router;