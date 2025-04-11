<template>
  <div class="rutinas-wrapper">
    <div class="rutinas-header">
      <h1 class="rutinas-title">Mis Rutinas</h1>
    </div>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Ejercicio ID</th>
          <th>Objetivo ID</th>
          <th>Duración</th>
          <th>Frecuencia</th>
          <th>Fecha Inicio</th>
          <th>Fecha Finalización</th>
          <th>Fecha Creación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rutina in rutinas" :key="rutina.id">
          <td>{{ rutina.nombre }}</td>
          <td>{{ rutina.ejercicio_id }}</td>
          <td>{{ rutina.objetivo_id }}</td>
          <td>{{ rutina.duracion }}</td>
          <td>{{ rutina.frecuencia }}</td>
          <td>{{ new Date(rutina.fecha_inicio).toLocaleString() }}</td>
          <td>{{ new Date(rutina.fecha_finalizacion).toLocaleString() }}</td>
          <td>{{ new Date(rutina.fecha_creacion).toLocaleString() }}</td>
        </tr>
      </tbody>
      <tbody v-if="rutinas.length === 0">
        <tr>
          <td colspan="8" style="text-align: center; color: #e74c3c; font-weight: bold;">
            🚨 Aún no tienes rutinas asignadas.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MisRutinas',
  data() {
    return {
      rutinas: []
    };
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    const usuario_id = localStorage.getItem('usuario_id');

    if (!token || !usuario_id) {
      console.error("❌ No se encontró el token o el ID de usuario en localStorage.");
      return;
    }

    // Realiza la petición al endpoint protegido para obtener las rutinas del usuario
    axios.get(`http://localhost:8000/api/rutinas/usuario/${usuario_id}?skip=0&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("✅ Rutinas cargadas:", response.data);
      if (Array.isArray(response.data)) {
        this.rutinas = response.data;
      } else {
        console.warn("⚠️ La respuesta no tiene el formato esperado:", response.data);
        this.rutinas = [];
      }
    })
    .catch(error => {
      console.error("❌ Error al cargar las rutinas:", error);
    });
  }
};
</script>

<style scoped>
.rutinas-wrapper {
  background-image: url('@/assets/frame1.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  border-radius: 35px;
  align-items: center;
}

.rutinas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.rutinas-title {
  color: #ffffff;
  font-size: 2.2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
  overflow: hidden;
}

th, td {
  padding: 12px;
  text-align: center;
  color: #ffffff;
  font-size: 13px;
  font-family: 'Segoe UI', sans-serif;
}

th {
  background: rgba(255, 255, 255, 0.08);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

th:hover {
  background: rgba(255, 255, 255, 0.15);
}

td {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.3s ease;
}

tr:hover td {
  background: rgba(255, 255, 255, 0.07);
}

@media (max-width: 768px) {
  th, td {
    font-size: 11px;
    padding: 8px;
  }
}
</style>
