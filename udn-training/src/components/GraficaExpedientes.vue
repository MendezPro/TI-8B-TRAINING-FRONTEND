<template>
  <div class="container">
    <h2>Gráfica de Presión Arterial</h2>
    <label for="usuario">Seleccionar usuario:</label>
    <select id="usuario" v-model="selectedUser" @change="fetchExpedientes">
      <option value="" disabled>-- Selecciona un usuario --</option>
      <option v-for="user in usuarios" :key="user.id" :value="user.id">
        {{ user.nombre_usuario }}
      </option>
    </select>
    <canvas id="expedientesChart"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  name: 'GraficaExpedientes',
  setup() {
    const selectedUser = ref(null);
    const usuarios = ref([]);
    const chartInstance = ref(null);

    // Obtener la lista de usuarios desde la API
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/usuarios', {
          headers: { Authorization: `Bearer ${token}` },
        });
        usuarios.value = response.data;
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    // Consultar expedientes para el usuario seleccionado y extraer datos de presión arterial
    const fetchExpedientes = async () => {
      if (!selectedUser.value) return;
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `http://localhost:8000/api/expedientes/usuario/${selectedUser.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const expedientes = response.data;

        // Extraer las fechas y los valores de presión sistólica y diastólica
        const labels = expedientes.map(exp => new Date(exp.fecha_registro).toLocaleDateString());
        const presionSistolica = expedientes.map(exp => exp.presion_sistolica);
        const presionDiastolica = expedientes.map(exp => exp.presion_diastolica);

        updateChart(labels, presionSistolica, presionDiastolica);
      } catch (error) {
        console.error('Error al obtener expedientes:', error);
      }
    };

    // Actualizar o crear la gráfica usando Chart.js
    const updateChart = (labels, presionSistolica, presionDiastolica) => {
      if (chartInstance.value) chartInstance.value.destroy();
      const ctx = document.getElementById('expedientesChart').getContext('2d');
      chartInstance.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Presión Sistólica',
              data: presionSistolica,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
            },
            {
              label: 'Presión Diastólica',
              data: presionDiastolica,
              borderColor: 'rgba(192, 75, 75, 1)',
              backgroundColor: 'rgba(192, 75, 75, 0.2)',
              fill: false,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Fecha'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Valor (mmHg)'
              }
            }
          }
        }
      });
    };

    onMounted(() => {
      fetchUsuarios();
    });

    return {
      selectedUser,
      usuarios,
      fetchExpedientes,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
  font-size: 18px;
  color: #555;
}

select {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: #888;
}

canvas {
  width: 100% !important;
  height: 500px !important;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin: 0 auto;
}
</style>
