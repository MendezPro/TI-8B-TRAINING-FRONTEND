<template>
  <div>
    <h1>Indicadores Nutricionales</h1>
    <button @click="$router.push('/indicadores/nuevo')">Agregar Nuevo Indicador</button>
    <form id="search">
      <p>Buscar</p>
      <input v-model="searchInput" placeholder="Buscar indicadores..." />
    </form>
    <IndicadorTable :entries="dataset" :columns="dataColumns" :filter-key="searchInput"
      @entryDeleted="fetchIndicadores" />
  </div>
</template>

<script>
import axios from 'axios';
import IndicadorTable from '@/components/views/TrainingAdmin/IndicadorTable';

export default {
  name: 'IndicadorView',
  components: {
    IndicadorTable
  },
  data() {
    return {
      searchInput: "",
      dataColumns: ["altura", "peso", "imc", "porcentaje_grasa", "nivel_actividad", "fecha_registro"],
      dataset: []
    };
  },
  mounted() {
    this.fetchIndicadores();
  },
  methods: {
    fetchIndicadores() {
      const token = localStorage.getItem('access_token');
      axios.get('http://localhost:8000/api/indicadores_nutricionales', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          this.dataset = response.data;
        })
        .catch(error => {
          console.error("Error al cargar indicadores:", error);
        });
    }
  }
};
</script>

<style scoped>
div {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

form p {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}
input {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f1f1f1;
  font-size: 14px;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #388e3c; /* Verde para el foco */
  outline: none;
}

button {
  background-color: #388e3c;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
}

button:hover {
  background-color: #2c6f29;
}
</style>