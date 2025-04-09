<template>
  <div class="dashboard-container">
    <div class="overlay"></div>
    <h1 class="title">Mi perfil</h1>
    <div class="cards-container">
      <div class="card" @click="$router.push('/perfil/misdietas/')">
        <i class="fas fa-apple-alt"></i>
        <h2>Mis dietas</h2>
        <p>Consulta tus dietas personalizadas.</p>
      </div>
      <div class="card" @click="$router.push('/perfil/ejercicios')">
        <i class="fas fa-dumbbell"></i>
        <h2>Mis ejercicios</h2>
        <p>Consulta tus ejercicios personalizados.</p>
      </div>
      <div class="card" @click="$router.push('/perfil/misdatos')">
        <i class="fas fa-user"></i>
        <h2>Perfil</h2>
        <p>Mi información personal</p>
      </div>
      <div class="card" @click="$router.push('/perfil/miexpediente')">
        <i class="fas fa-notes-medical"></i>
        <h2>Mi Expediente Médico</h2>
        <p>Consulta tu expediente médico</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PerfilView",
  mounted() {
    // Extraer el token de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Almacenar el token en localStorage
      localStorage.setItem("token", token);
      console.log("Token almacenado en localStorage:", token);

      // Limpiar la URL eliminando el parámetro 'token'
      window.history.replaceState({}, document.title, "/perfil");
    } else {
      console.error("Token no encontrado en la URL");
    }
  },
  methods: {
    irADietas() {
      const usuario_id = localStorage.getItem("usuario_id");
      this.$router.push({ path: '/dietas', query: { user_id: usuario_id } });
    },
    irAEjercicios() {
      const usuario_id = localStorage.getItem("usuario_id");
      this.$router.push({ path: '/ejercicios', query: { user_id: usuario_id } });
    }
  },
};
</script>

<style scoped>
/* Establecer una tipografía general */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

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
  font-family: 'Poppins', sans-serif; /* Tipografía cambiada */
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
  font-weight: 600;
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
