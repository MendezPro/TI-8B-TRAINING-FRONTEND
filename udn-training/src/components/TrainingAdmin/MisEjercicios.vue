<template>
    <div class="mis-ejercicios">
      <h1>Mis Ejercicios</h1>
      <table class="ejercicios-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Video</th>
            <th>Tipo</th>
            <th>Estatus</th>
            <th>Dificultad</th>
            <th>Fecha Registro</th>
            <th>Recomendaciones</th>
            <th>Restricciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ejercicio in ejercicios" :key="ejercicio.id">
            <td>{{ ejercicio.nombre }}</td>
            <td>{{ ejercicio.descripcion }}</td>
            <td>{{ ejercicio.video }}</td>
            <td>{{ ejercicio.tipo }}</td>
            <td>{{ ejercicio.estatus ? 'Activo' : 'Inactivo' }}</td>
            <td>{{ ejercicio.dificultad }}</td>
            <td>{{ new Date(ejercicio.fecha_registro).toLocaleString() }}</td>
            <td>{{ ejercicio.recomendaciones }}</td>
            <td>{{ ejercicio.restricciones }}</td>
          </tr>
        </tbody>
        <tbody v-if="ejercicios.length === 0">
          <tr>
            <td colspan="9" style="text-align: center; color: #e74c3c; font-weight: bold;">
              🚨 Aún no tienes ejercicios asignados.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MisEjercicios',
    data() {
      return {
        ejercicios: []
      };
    },
    mounted() {
      // Obtener el id del usuario logueado desde localStorage
      const usuario_id = localStorage.getItem("usuario_id");
      // Llamada al endpoint que filtra los ejercicios según el user_id
      axios.get(`http://localhost:8000/api/ejercicios/usuario/${usuario_id}`)
        .then(response => {
          this.ejercicios = response.data;
        })
        .catch(error => {
          console.error("Error al cargar los ejercicios:", error);
        });
    }
  };
  </script>
  
  <style scoped>
  .mis-ejercicios {
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  .mis-ejercicios h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .ejercicios-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .ejercicios-table th,
  .ejercicios-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .ejercicios-table th {
    background-color: #f4f4f4;
    color: #333;
  }
  
  .ejercicios-table tr:nth-child(even) {
    background-color: #fafafa;
  }
  
  .ejercicios-table tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  