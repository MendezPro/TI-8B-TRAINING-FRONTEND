<template>
  <div class="dashboard-container">
    <div class="overlay"></div>
    <h1 class="title">Mi perfil</h1>
    <div class="data-card">
      <div class="field">
        <label>Nombre de Usuario:</label>
        <span>{{ usuario.nombre_usuario }}</span>
      </div>
      <div class="field">
        <label>Correo Electrónico:</label>
        <span>{{ usuario.correo_electronico }}</span>
      </div>
      <div class="field">
        <label>Número Telefónico:</label>
        <span>{{ usuario.numero_telefonico_movil }}</span>
      </div>
      <div class="field">
        <label>Rol:</label>
        <span>{{ usuario.rol }}</span>
      </div>
      <div class="field">
        <label>Fecha de Registro:</label>
        <span>{{ formattedFechaRegistro }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PerfilView",
  data() {
    return {
      usuario: {}, // Datos del usuario
    };
  },
  computed: {
    formattedFechaRegistro() {
      return this.usuario.fecha_registro
        ? new Date(this.usuario.fecha_registro).toLocaleString()
        : "";
    },
  },
  mounted() {
    const usuario_id = localStorage.getItem("usuario_id");
    const token = localStorage.getItem("access_token"); // Obtener el token

    if (token) {
      axios
        .get(`http://localhost:8000/api/usuarios/${usuario_id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el header
          },
        })
        .then((response) => {
          this.usuario = response.data;
        })
        .catch((error) => {
          console.error(
            "Error al cargar los datos del usuario:",
            error.response?.data || error
          );
        });
    } else {
      console.error("Token no encontrado en el almacenamiento local.");
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
  font-family: 'Poppins', sans-serif;
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

.data-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 20px;
  border-radius: 15px;
  text-align: left;
  color: white;
  width: 80%;
  max-width: 600px;
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.3);
}

.field {
  margin-bottom: 15px;
}

.field label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #fff;
}

.field span {
  font-size: 1.1rem;
  color: #ddd;
}
</style>