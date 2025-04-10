<template>
  <div class="grafica-wrapper">
    <div class="grafica-header">
      <h1 class="grafica-title">
        Indicadores <span class="highlight">Nutricionales</span>
      </h1>
    </div>

    <div class="search-container">
      <label for="usuario" class="search-label">Seleccionar usuario:</label>
      <select id="usuario" v-model.number="selectedUser" @change="fetchIndicadores" class="search-select">
        <option value="" disabled>-- Selecciona un usuario --</option>
        <option v-for="user in usuarios" :key="user.id" :value="user.id">
          {{ user.nombre_usuario }}
        </option>
      </select>
      <!-- Opcional: filtro por mes -->
      <label for="mes" class="search-label">Seleccionar mes (opcional):</label>
      <select id="mes" v-model="selectedMonth" @change="fetchIndicadores" class="search-select">
        <option value="">Todos</option>
        <option v-for="(mes, index) in meses" :key="index" :value="index+1">
          {{ mes }}
        </option>
      </select>
    </div>

    <div class="chart-container">
      <canvas id="indicadoresChart"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Chart from 'chart.js/auto';

export default {
  name: 'ProgresoUsuario',
  setup() {
    const selectedUser = ref(null);
    // selectedMonth: si se deja vacío, se muestran todos; de lo contrario se filtrará por ese mes (1-12)
    const selectedMonth = ref('');
    const usuarios = ref([]);
    const chartInstance = ref(null);
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/usuarios/?skip=0&limit=10', {
          headers: { Authorization: `Bearer ${token}` },
        });
        usuarios.value = response.data;
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    const fetchIndicadores = async () => {
      if (!selectedUser.value) return;

      try {
        const token = localStorage.getItem('access_token');
        // Obtenemos todos los indicadores nutricionales.
        const response = await axios.get('http://localhost:8000/api/indicadores_nutricionales/?skip=0&limit=100', {
          headers: { Authorization: `Bearer ${token}` },
        }); console.log("Datos API:", response.data) ;// Verificar datos completos
        const usuarioSeleccionado = usuarios.value.find(u => u.id === selectedUser.value);
if (!usuarioSeleccionado) return;

// Filtrar usando el nombre, o asegurarte de que el backend retorne usuario_id
let indicadores = response.data.filter(ind => 
  ind.usuario_nombre && ind.usuario_nombre === usuarioSeleccionado.nombre_usuario
);
if (selectedMonth.value) {
  indicadores = indicadores.filter(ind => {
    const mesRegistro = new Date(ind.fecha_registro).getMonth() + 1;
    return mesRegistro === Number(selectedMonth.value);
  });
}


        // Ordenamos los indicadores por fecha de registro ascendente.
        indicadores.sort((a, b) => new Date(a.fecha_registro) - new Date(b.fecha_registro));
        // Usamos la fecha de registro como labels y, por ejemplo, los valores de IMC.
        const labels = indicadores.map(ind => new Date(ind.fecha_registro).toLocaleDateString());
        const imcData = indicadores.map(ind => ind.imc);
        updateChart(labels, imcData);
      } catch (error) {
        console.error('Error al obtener indicadores nutricionales:', error);
      }
    };

    const updateChart = (labels, imcData) => {
      if (chartInstance.value) {
        chartInstance.value.destroy();
      }
      const ctx = document.getElementById('indicadoresChart').getContext('2d');
      chartInstance.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'IMC',
              data: imcData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
            },
            // Puedes agregar más datasets para otros indicadores, por ejemplo:
            // {
            //   label: 'Peso',
            //   data: pesoData,
            //   borderColor: 'rgba(192, 75, 75, 1)',
            //   backgroundColor: 'rgba(192, 75, 75, 0.2)',
            //   fill: false,
            // },
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
                text: 'Valor',
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
      selectedMonth,
      usuarios,
      meses,
      fetchIndicadores,
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
  margin-bottom: 15px;
}

.search-select:focus {
  border-color: #ffffff;
}

.chart-container {
  width: 100%;
  max-width: 900px;
  position: relative;
  height: 500px;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
</style>
