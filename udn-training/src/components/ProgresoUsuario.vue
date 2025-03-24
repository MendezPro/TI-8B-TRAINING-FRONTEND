<!-- filepath: c:\Users\soyme\Desktop\8VO CUATRI\DEVGENIUS\TI-8B-TRAINING-FRONTEND\udn-training\src\components\ProgresoUsuario.vue -->
<template>
  <div>
    <h1>Consulta el nivel de progreso del usuario</h1>
    <label for="usuario">Seleccionar usuario:</label>
    <select id="usuario" v-model.number="selectedUser" @change="fetchProgress">
      <option v-for="user in usuarios" :key="user.id" :value="user.id">
        {{ user.nombre_usuario }}
      </option>
    </select>
    <label for="mes">Seleccionar mes:</label>
    <select id="mes" v-model="selectedMonth" @change="fetchProgress">
      <option v-for="(mes, index) in meses" :key="index" :value="index + 1">
        {{ mes }}
      </option>
    </select>
    <p v-if="objetivo">Objetivo del usuario: <strong>{{ objetivo }}</strong></p>
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
      selectedMonth: new Date().getMonth() + 1, // Mes actual
      usuarios: [],
      chart: null,
      hasData: false,
      objetivo: null, // Nuevo campo para el objetivo del usuario
      meses: [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ],
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
        this.updateChart(Array(31).fill(0), 0); // Gráfica vacía
        return;
      }
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `http://localhost:8000/api/ejercicios/progreso/${this.selectedUser}?mes=${this.selectedMonth}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const progressData = response.data.data || Array(31).fill(0);
        const totalCompleted = progressData.reduce((sum, value) => sum + value, 0);
        const percentage = Math.round((totalCompleted / 31) * 100);

        this.hasData = totalCompleted > 0;
        this.objetivo = response.data.objetivo; // Asignar el objetivo del usuario
        this.updateChart(progressData, percentage);
      } catch (error) {
        console.error("Error al obtener progreso:", error);
        this.updateChart(Array(31).fill(0), 0);
      }
    },

    updateChart(data, percentage) {
      if (this.chart) this.chart.destroy();

      const ctx = this.$refs.progressChart.getContext("2d");
      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: Array.from({ length: 31 }, (_, i) => `Día ${i + 1}`),
          datasets: [
            {
              label: `Progreso (${percentage}% completado)`,
              data,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: true, position: "top" } },
          scales: {
            x: { title: { display: true, text: "Días del Mes" } },
            y: { title: { display: true, text: "Ejercicios Completados" }, min: 1, max: 10 }, // Ajustar rango de 1 a 10
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
}

p {
  text-align: center;
  font-size: 14px;
  color: #555;
}
</style>