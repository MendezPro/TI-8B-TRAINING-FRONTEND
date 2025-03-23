<template>
    <div class="mis-dietas">
      <h1>Mis Dietas</h1>
      <table class="dietas-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Género</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Objetivo</th>
            <th>Ejercicios Recomendados</th>
            <th>Días Ejercicio</th>
            <th>Calorías Diarias</th>
            <th>Observaciones</th>
            <th>Estatus</th>
            <th>Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dieta in dietas" :key="dieta.id">
            <td>{{ dieta.nombre }}</td>
            <td>{{ dieta.genero }}</td>
            <td>{{ dieta.altura }}</td>
            <td>{{ dieta.peso }}</td>
            <td>{{ dieta.objetivo }}</td>
            <td>{{ dieta.tipo_ejercicios_recomendados }}</td>
            <td>{{ dieta.dias_ejercicio }}</td>
            <td>{{ dieta.calorias_diarias }}</td>
            <td>{{ dieta.observaciones }}</td>
            <td>{{ dieta.estatus ? 'Activo' : 'Inactivo' }}</td>
            <td>{{ new Date(dieta.fecha_registro).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MisDietas',
    data() {
      return {
        dietas: []
      };
    },
    mounted() {
      // Obtener el id del usuario logueado desde localStorage
      const usuario_id = localStorage.getItem("usuario_id");
      // Llamada al nuevo endpoint que filtra las dietas según el user_id
      axios.get(`http://localhost:8000/api/dietas/usuario/${usuario_id}`)
        .then(response => {
          this.dietas = response.data;
        })
        .catch(error => {
          console.error("Error al cargar las dietas:", error);
        });
    }
  };
  </script>
  
  <style scoped>
  .mis-dietas {
    padding: 20px;
    max-width: 1200px;
    margin: auto;
  }
  
  .mis-dietas h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .dietas-table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  .dietas-table th,
  .dietas-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }
  
  .dietas-table th {
    background-color: #f4f4f4;
    color: #333;
  }
  
  .dietas-table tr:nth-child(even) {
    background-color: #fafafa;
  }
  
  .dietas-table tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  