<template>
  <div class="indicadores-wrapper">
    <div class="indicadores-header">
      <h1 class="indicadores-title">Mis Indicadores</h1>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Altura</th>
          <th>Peso</th>
          <th>IMC</th>
          <th>Porcentaje Grasa</th>
          <th>Nivel Actividad</th>
          <th>Fecha Registro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="indicador in indicadores" :key="indicador.id">
          <td>{{ indicador.id }}</td>
          <td>{{ indicador.altura }}</td>
          <td>{{ indicador.peso }}</td>
          <td>{{ indicador.imc }}</td>
          <td>{{ indicador.porcentaje_grasa }}</td>
          <td>{{ indicador.nivel_actividad }}</td>
          <td>{{ new Date(indicador.fecha_registro).toLocaleString() }}</td>
        </tr>
      </tbody>
      <tbody v-if="indicadores.length === 0">
        <tr>
          <td colspan="7" style="text-align: center; color: #e74c3c; font-weight: bold;">
            🚨 Aún no tienes indicadores asignados.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MisEjercicios',
  data() {
    return {
      indicadores: []
    };
  },
  mounted() {
    // Se obtiene el id del usuario logueado (guardado en localStorage)
    const usuario_id = localStorage.getItem("usuario_id");
    const token = localStorage.getItem("access_token"); // Asegúrate de que el token está guardado

    // Realiza la llamada a la API para obtener los indicadores del usuario
    axios.get(`http://localhost:8000/api/indicadores_nutricionales/usuario/${usuario_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        this.indicadores = response.data;
      })
      .catch(error => {
        console.error("Error al cargar los indicadores:", error);
      });
  }
};
</script>

<style scoped>
/* Estilos generales para el wrapper y cabecera */
.indicadores-wrapper {
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

.indicadores-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.indicadores-title {
  color: #ffffff;
  font-size: 2.2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

/* Botón para agregar indicador */
.btn-agregar-indicador {
  background: linear-gradient(145deg, #f79f43, #f27e1b);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  padding: 12px 26px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 130, 0, 0.3);
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;
}

.btn-agregar-indicador::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #f8a545, #f56b00);
  border-radius: 50px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-agregar-indicador:hover::before {
  opacity: 1;
}

.btn-agregar-indicador:hover {
  transform: scale(1.05);
}

/* Buscador (si deseas agregarlo similar al de Dietas) */
.search-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 12px 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}

.search-container:hover {
  box-shadow: 0 6px 25px rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.search-icon {
  font-size: 1.5rem;
  color: #fff;
  margin-right: 10px;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  width: 100%;
  font-family: inherit;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #ccc;
  opacity: 0.7;
}

/* Estilos para la tabla con efecto de transparencia y backdrop */
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

th,
td {
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
  background-color: rgba(255, 255, 255, 0.15);
}

th.active {
  background-color: rgba(255, 255, 255, 0.15);
}

td {
  background-color: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.3s ease;
}

tr:hover td {
  background-color: rgba(255, 255, 255, 0.07);
}

/* Estilos responsivos */
@media (max-width: 768px) {

  th,
  td {
    font-size: 11px;
    padding: 8px;
  }

  .btn-agregar-indicador {
    font-size: 10px;
    padding: 5px 8px;
  }
}
</style>
