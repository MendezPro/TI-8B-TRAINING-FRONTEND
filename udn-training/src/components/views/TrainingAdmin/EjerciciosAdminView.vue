<template>
  <div>
    <h1>Administración de Ejercicios</h1>
    <button @click="$router.push('/ejercicios/nuevo')">Agregar Nuevo Ejercicio</button>
    <form id="search">
      <p>Buscar</p>
      <input v-model="searchInput" placeholder="Buscar ejercicios..." />
    </form>
    <EjerciciosTable 
      :entries="dataset" 
      :columns="dataColumns" 
      :filter-key="searchInput"
    />
  </div>
</template>

<script>
import axios from 'axios';
import EjerciciosTable from '@/components/EjerciciosTable.vue';

export default {
  name: 'EjerciciosAdminView',
  components: {
    EjerciciosTable
  },
  data() {
    return {
      searchInput: "",
      dataColumns: [
        "ID", 
        "Nombre", 
        "Descripcion", 
        "Video", 
        "Tipo", 
        "Estatus", 
        "Dificultad", 
        "Fecha_Registro", 
        "Fecha_Actualizacion", 
        "Recomendaciones", 
        "Restricciones"
      ],
      dataset: []
    };
  },
  mounted() {
    axios.get('http://localhost:8000/api/ejercicios')
      .then(response => {
        this.dataset = response.data.map(ejercicio => ({
          ID: ejercicio.id,
          Nombre: ejercicio.nombre,
          Descripcion: ejercicio.descripcion,
          Video: ejercicio.video,
          Tipo: ejercicio.tipo,
          Estatus: ejercicio.estatus ? 'Activo' : 'Inactivo',
          Dificultad: ejercicio.dificultad,
          Fecha_Registro: ejercicio.fecha_registro,
          Fecha_Actualizacion: ejercicio.fecha_actualizacion,
          Recomendaciones: ejercicio.recomendaciones,
          Restricciones: ejercicio.restricciones,
        }));
      })
      .catch(error => {
        console.error("Error al cargar ejercicios:", error);
      });
  }
};
</script>

<style scoped>
h1 {
  color: #2c3e50;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 16px;
}

button:hover {
  background-color: #2980b9;
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
