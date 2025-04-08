<template>
  <div class="grafica-wrapper">
    <div class="grafica-header">
      <h1 class="grafica-title">
        Presión <span class="highlight">Sistólica y</span> Diastólica
      </h1>
    </div>

    <div class="search-container">
      <label for="usuario" class="search-label">Seleccionar usuario:</label>
      <select id="usuario" v-model="selectedUser" @change="fetchExpedientes" class="search-select">
        <option value="" disabled>-- Selecciona un usuario --</option>
        <option v-for="user in usuarios" :key="user.id" :value="user.id">
          {{ user.nombre_usuario }}
        </option>
      </select>
    </div>

    <div class="chart-container">
      <canvas id="expedientesChart"></canvas>
    </div>
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

    const fetchExpedientes = async () => {
      if (!selectedUser.value) return;
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `http://localhost:8000/api/expedientes/usuario/${selectedUser.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const expedientes = response.data;

        const labels = expedientes.map(exp => new Date(exp.fecha_registro).toLocaleDateString());
        const presionSistolica = expedientes.map(exp => exp.presion_sistolica);
        const presionDiastolica = expedientes.map(exp => exp.presion_diastolica);

        updateChart(labels, presionSistolica, presionDiastolica);
      } catch (error) {
        console.error('Error al obtener expedientes:', error);
      }
    };

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
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Fecha',
                color: '#ffffff',
              },
              ticks: {
                color: '#ffffff',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Valor (mmHg)',
                color: '#ffffff',
              },
              ticks: {
                color: '#ffffff',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: '#ffffff',
              },
            },
          },
        },
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
.grafica-wrapper {
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

.grafica-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 25px;
}

.grafica-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  text-align: center;
}

.grafica-title .highlight {
  color: #ff914d;
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-bottom: 20px;
}

.search-label {
  color: #ffffff;
  font-size: 16px;
  margin-bottom: 10px;
}

.search-select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-select:focus {
  border-color: #ffffff;
}

.chart-container {
  width: 100%;
  max-width: 900px;
}

canvas {
  width: 100% !important;
  height: 500px !important;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>