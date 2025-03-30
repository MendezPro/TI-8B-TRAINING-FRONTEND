<template>
  <div>
    <h2>Gráfica combinada de Expedientes Médicos</h2>
    <label for="usuario">Seleccionar usuario:</label>
    <select id="usuario" v-model="selectedUser" @change="fetchExpedientes">
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

    // Obtener lista de usuarios (de tu API SQL o Mongo, según cómo tengas implementada la consulta)
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

    // Consultar expedientes para el usuario seleccionado en Mongo
    const fetchExpedientes = async () => {
      if (!selectedUser.value) return;
      try {
        const token = localStorage.getItem('access_token');
        // Aquí se le pasa el id del usuario (asegúrate de que sea del mismo tipo que guardas en Mongo, por ejemplo, "2")
        const response = await axios.get(
          `http://localhost:8000/api/expedientes/usuario/${selectedUser.value}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const expedientes = response.data;

        // Extraer las fechas y los parámetros que deseas graficar
        // Por ejemplo, se asume que cada documento tiene 'fecha_registro', 'peso' y 'estatura'
        const labels = expedientes.map(exp => new Date(exp.fecha_registro).toLocaleDateString());
        const pesos = expedientes.map(exp => exp.peso);
        const estaturas = expedientes.map(exp => exp.estatura);

        // Actualizar la gráfica
        updateChart(labels, pesos, estaturas);
      } catch (error) {
        console.error('Error al obtener expedientes:', error);
      }
    };

    const updateChart = (labels, pesos, estaturas) => {
      // Si ya existe una gráfica, destrúyela para evitar solapamientos
      if (chartInstance.value) chartInstance.value.destroy();

      const ctx = document.getElementById('expedientesChart').getContext('2d');
      chartInstance.value = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Peso (kg)',
              data: pesos,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
            },
            {
              label: 'Estatura (cm)',
              data: estaturas,
              borderColor: 'rgba(192, 75, 75, 1)',
              backgroundColor: 'rgba(192, 75, 75, 0.2)',
              fill: false,
            }
          ]
        },
        options: {
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
                text: 'Valor'
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
h2 {
  text-align: center;
  margin-bottom: 20px;
}
label {
  display: block;
  margin: 10px 0;
}
select {
  display: block;
  margin-bottom: 20px;
  padding: 5px;
}
canvas {
  max-width: 100%;
  margin: 0 auto;
  display: block;
}
</style>
