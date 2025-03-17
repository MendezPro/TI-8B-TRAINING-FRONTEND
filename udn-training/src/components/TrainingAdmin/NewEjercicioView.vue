<template>
    <div>
      <h1>Agregar Nuevo Ejercicio</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="ejercicio.nombre" required />
        </div>
  
        <div>
          <label>Descripción:</label>
          <input type="text" v-model="ejercicio.descripcion" required />
        </div>
  
        <div>
          <label>Video URL:</label>
          <input type="text" v-model="ejercicio.video" />
        </div>
  
        <div>
          <label>Tipo:</label>
          <select v-model="ejercicio.tipo" required>
            <option value="Aerobico">Aeróbico</option>
            <option value="Resistencia">Resistencia</option>
            <option value="Flexibilidad">Flexibilidad</option>
            <option value="Fuerza">Fuerza</option>
          </select>
        </div>
  
        <div>
          <label>Dificultad:</label>
          <select v-model="ejercicio.dificultad" required>
            <option value="Basico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
  
        <div>
          <label>Recomendaciones:</label>
          <input type="text" v-model="ejercicio.recomendaciones" />
        </div>
  
        <div>
          <label>Restricciones:</label>
          <input type="text" v-model="ejercicio.restricciones" />
        </div>
  
        <div>
          <label>Estatus:</label>
          <input type="checkbox" v-model="ejercicio.estatus" />
        </div>
  
        <button type="submit">Guardar Ejercicio</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NewEjercicio',
    data() {
      return {
        ejercicio: {
          nombre: '',
          descripcion: '',
          video: '',
          tipo: 'Aerobico', // Valor por defecto
          estatus: true,
          dificultad: 'Basico', // Valor por defecto
          recomendaciones: '',
          restricciones: ''
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          await axios.post('http://localhost:8000/api/ejercicios', this.ejercicio);
          console.log('Ejercicio guardado correctamente');
          this.$router.push('/ejercicios'); // Redirige a la vista de administración
        } catch (error) {
          console.error('Error al guardar ejercicio:', error);
          alert('Error al guardar ejercicio');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  h1 {
    color: #2c3e50;
  }
  
  form div {
    margin-bottom: 12px;
  }
  
  input, select, button {
    display: block;
    width: 100%;
    padding: 8px;
    margin-top: 4px;
  }
  
  label {
    font-weight: bold;
    color: #333;
  }
  
  button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 15px;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  form {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  input, select {
    background-color: #e0e0e0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  input:focus, select:focus {
    border-color: #3498db;
    outline: none;
  }
  </style>
  