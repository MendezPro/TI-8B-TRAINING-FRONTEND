<template>
  <div class="dashboard-container">
    <div class="overlay"></div>
    <h1 class="title">Bienvenido al Dashboard</h1>
    <div class="cards-container">
      <div v-if="esAdmin" class="card" @click="$router.push('/dietas')">
        <i class="fas fa-apple-alt"></i>
        <h2>Nutrición</h2>
        <p>Planif ica tus dietas y mejora tu alimentación.</p>
      </div>
      
      <div v-if="esAdmin" class="card" @click="$router.push('/ejercicios')">
        <i class="fas fa-dumbbell"></i>
        <h2>Training</h2>
        <p>Descubre rutinas de ejercicios personalizadas.</p>
      </div>
      <div class="card" @click="$router.push('/progreso')">
        <i class="fas fa-chart-line"></i>
        <h2>Progreso</h2>
        <p>Monitorea tu avance y establece nuevas metas.</p>
      </div>
      <div class="card" @click="$router.push('/expedientes')">
        <i class="fas fa-file-medical"></i>
        <h2>Expedientes</h2>
        <p>Consulta y gestiona tus expedientes médicos.</p>
      </div>
      <div class="card" @click="$router.push('/grafica')">
        <i class="fas fa-chart-pie"></i>
        <h2>Gráficas</h2>
        <p>Visualiza tus datos de salud de manera efectiva.</p>
      </div>
      <div class="card" @click="$router.push('/perfil')">
        <i class="fas fa-user"></i>
        <h2>Perfil</h2>
        <p>Gestiona tu información personal y preferencias.</p>
      </div>
      <div v-if="esAdmin" class="card error-card" @click="$router.push('/usuarios')">
        <i class="fas fa-exclamation-triangle"></i>
        <h2>Usuarios</h2>
        <p>Accede a la gestión de usuarios (prueba de error).</p>
      </div>
      <div v-if="esAdmin" class="card" @click="$router.push('/indicadores')">
        <i class="fas fa-chart-line"></i>
        <h2>Indicadores</h2>
        <p>Consulta y administra los indicadores nutricionales.</p>
      </div>
      <div v-if="esAdmin" class="card" @click="$router.push('/rutinas')">
        <i class="fas fa-list-alt"></i>
        <h2>Rutinas</h2>
        <p>Asigna rutinas a los usuarios.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      esAdmin: false, // 👈 Inicializa la variable
    };
  },
  created() {
    const rol = localStorage.getItem("rol"); // Retrieve role from localStorage
    if (rol === "Administrador") {
      this.esAdmin = true; // Set to true if the user is an admin
    } // 👈 Si el rol es 'admin', mostrará las cards de admin
  },
  mounted() {
    // Insertar el script de Chatbase al cargar el componente
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") return target.q;
          return (...args) => target(prop, ...args);
        },
      });

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "TBKXBmpzMfuXHiMXs3nIG";
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    }
  },
};

</script>

<style scoped>
.dashboard-container {
  position: relative;
  height: 100vh;
  background: url("@/assets/fondodash.jpg") no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
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
  backdrop-filter: blur(10px);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  z-index: 1;
  margin-bottom: 20px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  z-index: 1;
  width: 80%;
  max-width: 1200px;
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

/* Estilos específicos para la card de error */
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
