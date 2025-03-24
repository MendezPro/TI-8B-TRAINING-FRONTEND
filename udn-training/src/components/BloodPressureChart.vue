<template>
    <div>
      <LineChart :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
  
  Chart.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BloodPressureChart',
    components: { LineChart: Line },
    props: {
      expediente: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        pressureHistory: []
      }
    },
    computed: {
      chartData() {
        const labels = this.pressureHistory.map(p => p.date)
        const systolicData = this.pressureHistory.map(p => p.systolic)
        const diastolicData = this.pressureHistory.map(p => p.diastolic)
  
        return {
          labels,
          datasets: [
            {
              label: 'Presión Sistólica (mmHg)',
              data: systolicData,
              borderColor: '#36A2EB',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Presión Diastólica (mmHg)',
              data: diastolicData,
              borderColor: '#FF6384',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              tension: 0.4,
              fill: true
            }
          ]
        }
      },
      chartOptions() {
        return {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Evolución de la Presión Arterial'
            }
          },
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
                text: 'Presión (mmHg)'
              },
              suggestedMin: 60,
              suggestedMax: 200
            }
          }
        }
      }
    },
    methods: {
      // Simula una llamada de backend o WebSocket que actualiza los datos en tiempo real
      async fetchData() {
        try {
          const token = localStorage.getItem('access_token')
          const usuario_id = localStorage.getItem('usuario_id')
          const response = await this.$axios.get(`http://localhost:8000/api/expedientes/usuario/${usuario_id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
  
          const expediente = response.data
          if (expediente.presion_arterial) {
            const [systolic, diastolic] = expediente.presion_arterial.split('/').map(Number)
  
            // Añadir nuevo valor si no existe
            this.pressureHistory.push({
              date: new Date().toLocaleTimeString(), // Mostrar la hora actual
              systolic,
              diastolic
            })
  
            // Limitar los datos a las últimas 10 mediciones
            if (this.pressureHistory.length > 10) {
              this.pressureHistory.shift()
            }
          }
        } catch (error) {
          console.error('Error al obtener datos de presión arterial:', error)
        }
      }
    },
    mounted() {
      // Llamada inicial
      this.fetchData()
  
      // Polling cada 5 segundos para obtener nuevos datos
      setInterval(this.fetchData, 5000)
    }
  }
  </script>
  