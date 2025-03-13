<template>
  <div>
    <h1>Bienvenido a Dietas</h1>
    <form id="search">
      <p>Buscar</p>
      <input v-model="searchInput" />
    </form>
    
    <DietasTable 
      :entries="dataset" 
      :columns="dataColumns" 
      :filter-key="searchInput"
    />
  </div>
</template>

<script>
import axios from 'axios';
import DietasTable from '@/components/DietasTable.vue';

export default {
  name: 'DietasView',
  components: {
    DietasTable
  },
  data() {
    return {
      searchInput: "",
      dataColumns: ["ID", "Nombre", "Detalle", "Descripcion", "Objetivo", "Estatus", "Fecha_Registro", "Fecha_Actualizacion"],
      dataset: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/api/dietas')
      .then(response => {
        this.dataset = response.data;
      })
      .catch(error => {
        console.error("Error al cargar dietas:", error);
      });
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}

form {
  margin-bottom: 20px;
}

input {
  padding: 8px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
