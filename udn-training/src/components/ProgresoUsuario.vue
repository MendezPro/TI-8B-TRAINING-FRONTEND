<template>
  <div>
    <h1>Consulta el nivel de progreso del usuario</h1>
    <label for="usuario">Seleccionar usuario:</label>
    <select id="usuario" v-model.number="selectedUser" @change="fetchProgress">
      <option v-for="user in usuarios" :key="user.id" :value="user.id">
        {{ user.nombre_usuario }}
      </option>
    </select>
    <canvas ref="progressChart" width="400" height="200"></canvas>
    <p v-if="!hasData">No hay datos para mostrar en la gráfica.</p>
    <p v-else>Datos recopilados de acuerdo a su nivel de ejercicios completados.</p>
  </div>
</template>

<script>
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import axios from "axios";

// Registrar los módulos necesarios de Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement,
  Filler
);

export default {
  name: "ProgresoUsuario",
  data() {
    return {
      selectedUser: null,
      usuarios: [],
      chart: null,
      hasData: false,
    };
  },
  mounted() {
    this.fetchUsuarios();
  },
  methods: {
  async fetchUsuarios() {
    try {
      const token = localStorage.getItem('access_token'); // Obtener el token
      const response = await axios.get("http://localhost:8000/api/usuarios", {
        headers: {
          Authorization: `Bearer ${token}` // Incluir el token en los encabezados
        }
      });
      this.usuarios = response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  },

  async fetchProgress() {
    if (!this.selectedUser) {
      this.updateChart(Array(31).fill(0)); // Mostrar gráfica vacía si no hay usuario seleccionado
      return;
    }
    try {
      const token = localStorage.getItem('access_token'); // Obtener el token
      const response = await axios.get(
        `http://localhost:8000/api/ejercicios/progreso/${this.selectedUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en los encabezados
          }
        }
      );
      const progressData = response.data.data || Array(31).fill(0); // Asegurarse de que siempre haya datos
      this.hasData = progressData.some((value) => value > 0); // Verifica si hay datos
      this.updateChart(progressData);
    } catch (error) {
      console.error("Error al obtener progreso:", error);
      this.updateChart(Array(31).fill(0)); // Mostrar gráfica vacía en caso de error
    }
  },
    processData(data) {
      const days = Array(31).fill(0);
      if (Array.isArray(data)) {
        data.forEach((ejercicio) => {
          const day = new Date(ejercicio.fecha_registro).getDate();
          days[day - 1]++;
        });
      }
      return days;
    },
    updateChart(data) {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.progressChart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line", // Tipo de gráfico
        data: {
          labels: Array.from({ length: 31 }, (_, i) => `Día ${i + 1}`),
          datasets: [
            {
              label: "Ejercicios Completados",
              data,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              pointBackgroundColor: data.map((value) =>
                value > 0 ? "green" : "red"
              ),
            },
          ],
        },
        options: {
          responsive: true,
          animation: { duration: 1000 },
          plugins: { legend: { display: true, position: "top" } },
          scales: {
            x: { title: { display: true, text: "Días del Mes" } },
            y: { title: { display: true, text: "Ejercicios Completados" }, beginAtZero: true },
          },
        },
      });
    },
  },
};

</script>

<style scoped>
/* Cambié la tipografía a 'Montserrat' */
body, div {
  font-family: 'Montserrat', sans-serif;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

select {
  display: block;
  margin: 0 auto 20px;
  padding: 10px;
  font-size: 16px;
}

canvas {
  max-width: 100%;
  width: 400px;
  height: 200px;
  margin: 0 auto;
  border: 1px solid red;
}

p {
  text-align: center;
  font-size: 14px;
  color: #555;
}
</style>
