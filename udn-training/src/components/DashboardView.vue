<template>
  <div class="dashboard-container">
    <div class="overlay"></div>
    <h1 class="title">Bienvenido al Dashboard</h1>
    <div class="cards-scroll-container">
      <div class="cards-container">
        <!-- Tarjetas visibles para usuarios estándar -->
        <template v-if="!esAdmin">
          <div class="card" @click="$router.push('/dietas')">
            <i class="fas fa-apple-alt"></i>
            <h2>Mis dietas</h2>
            <p>Consulta tus dietas personalizadas.</p>
          </div>
          <div class="card" @click="$router.push('/ejercicios')">
            <i class="fas fa-dumbbell"></i>
            <h2>Mis ejercicios</h2>
            <p>Consulta tus ejercicios personalizados.</p>
          </div>
          <div class="card" @click="$router.push('/expedientes')">
            <i class="fas fa-file-medical"></i>
            <h2>Mi Expediente Médico</h2>
            <p>Consulta tu expediente médico.</p>
          </div>
        </template>

        <!-- Tarjetas exclusivas para administradores -->
        <template v-else>
          <div class="card" @click="$router.push('/progreso')">
            <i class="fas fa-chart-line"></i>
            <h2>Progreso</h2>
            <p>Monitorea tu avance.</p>
          </div>
          <div class="card" @click="$router.push('/expedientes')">
            <i class="fas fa-file-medical"></i>
            <h2>Expedientes</h2>
            <p>Consulta y gestiona expedientes médicos.</p>
          </div>
          <div class="card" @click="$router.push('/grafica')">
            <i class="fas fa-chart-pie"></i>
            <h2>Presión Arterial</h2>
            <p>Visualiza datos de salud de manera efectiva.</p>
          </div>
          <div class="card error-card" @click="$router.push('/usuarios')">
            <i class="fas fa-exclamation-triangle"></i>
            <h2>Usuarios</h2>
            <p>Accede a la gestión de usuarios.</p>
          </div>
          <div class="card" @click="$router.push('/indicadores')">
            <i class="fas fa-seedling"></i>
            <h2>Indicadores</h2>
            <p>Consulta y administra los indicadores nutricionales.</p>
          </div>
          <div class="card" @click="$router.push('/rutinas')">
            <i class="fas fa-list-alt"></i>
            <h2>Rutinas</h2>
            <p>Asigna rutinas con ejercicios.</p>
          </div>
          <div class="card" @click="$router.push('/programas_saludables')">
            <i class="fas fa-utensils"></i>
            <h2>Programas Saludables</h2>
            <p>Planifica y asigna dietas.</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      esAdmin: false, // Determina si el usuario es administrador
    };
  },
  created() {
    const rol = localStorage.getItem("rol"); // Obtiene el rol del usuario desde localStorage
    if (rol === "Administrador") {
      this.esAdmin = true; // Si es administrador, habilita las tarjetas de admin
    }
  },
};
</script>

<style scoped>
.dashboard-container {
  position: relative;
  height: 100vh;
  background: url("@/assets/newback2.jpg") no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  overflow: hidden;
  color: white;
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(0px);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  z-index: 1;
  margin-bottom: 20px;
}

.cards-scroll-container {
  max-height: 100vh;
  overflow-y: auto;
  padding: 10px;
  z-index: 1;
  width: 100%;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  z-index: 1;
  width: 100%;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.3);
}

.card i {
  font-size: 2rem;
  color: red;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card p {
  font-size: 1rem;
  opacity: 0.8;
}

.error-card {
  background: rgba(255, 0, 0, 0.2);
  color: white;
}

.error-card:hover {
  box-shadow: 0px 4px 10px rgba(255, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>