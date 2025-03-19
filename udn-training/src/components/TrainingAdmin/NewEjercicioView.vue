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
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f1f1f1;
  font-size: 14px;
}

input:focus, select:focus, textarea:focus {
  border-color: #e53935;
  outline: none;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  color: white;
  background-color: #e53935;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d32f2f;
}
</style>