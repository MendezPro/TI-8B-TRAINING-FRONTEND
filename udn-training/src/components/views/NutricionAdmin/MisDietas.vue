<template>
  <div class="mis-dietas">
    <h1>Mis Rutinas</h1>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>User ID</th>
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
          <td>{{ rutina.user_id }}</td>
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
          <td colspan="9" style="text-align: center; color: #e74c3c; font-weight: bold;">
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
  name: 'MisDietas', // Se mantiene el nombre para evitar problemas de ruteo
  data() {
    return {
      rutinas: []
    };
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    const usuario_id = localStorage.getItem("usuario_id");
    // Llamada al endpoint para obtener las rutinas por usuario
    axios.get(`http://localhost:8000/api/rutinas/usuario/${usuario_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        this.rutinas = response.data;
      })
      .catch(error => {
        console.error("Error al cargar las rutinas:", error);
      });
  }
};
</script>

<style scoped>
.mis-dietas {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.18);
}

/* Estilos para la tabla con transparencia */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: background 0.3s ease;
}

tr:hover td {
  background: rgba(255, 255, 255, 0.07);
}

/* Título */
.mis-dietas h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* Responsivo */
@media (max-width: 768px) {
  th, td {
    font-size: 11px;
    padding: 8px;
  }
}
</style>
