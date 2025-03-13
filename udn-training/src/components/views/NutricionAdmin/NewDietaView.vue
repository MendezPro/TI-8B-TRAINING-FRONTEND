<template>
    <div>
      <h1>Agregar Nueva Dieta</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="dieta.Nombre" required />
        </div>
  
        <div>
          <label>Género:</label>
          <select v-model="dieta.Genero" required>
            <option value="M">Masculino</option>
            <option value="H">Femenino</option>
            <option value="N/B">No Binario</option>
          </select>
        </div>
  
        <div>
          <label>Altura:</label>
          <input type="number" v-model="dieta.Altura" required />
        </div>
  
        <div>
          <label>Peso:</label>
          <input type="number" v-model="dieta.Peso" required />
        </div>
  
        <div>
          <label>Objetivo:</label>
          <select v-model="dieta.Objetivo" required>
            <option value="Perdida de Peso">Perdida de Peso</option>
            <option value="Aumento de masa muscular">Aumento de masa muscular</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>
  
        <div>
          <label>Tipo de Ejercicio:</label>
          <select v-model="dieta.Tipo_Ejercicios_Recomendados" required>
            <option value="Cardio">Cardio</option>
            <option value="Levantamiento de pesas">Levantamiento de pesas</option>
            <option value="Ejercicios Tecnicos">Ejercicios Técnicos</option>
          </select>
        </div>
  
        <div>
          <label>Días de Ejercicio:</label>
          <select v-model="dieta.Dias_Ejercicio" required>
            <option value="1 dia a la semana">1 día a la semana</option>
            <option value="2 dias a la semana">2 días a la semana</option>
            <option value="3 dias a la semana">3 días a la semana</option>
            <option value="4 dias a la semana">4 días a la semana</option>
            <option value="5 dias a la semana">5 días a la semana</option>
          </select>
        </div>
  
        <div>
          <label>Calorías Diarias:</label>
          <input type="number" v-model="dieta.Calorias_Diarias" required />
        </div>
  
        <div>
          <label>Observaciones:</label>
          <textarea v-model="dieta.Observaciones"></textarea>
        </div>
  
        <div>
          <label>Estatus:</label>
          <input type="checkbox" v-model="dieta.Estatus" />
        </div>
  
        <button type="submit">Guardar Dieta</button>
      </form>
    </div><br><br>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dieta: {
          Nombre: '',
          Genero: '',
          Altura: '',
          Peso: '',
          Objetivo: '',
          Tipo_Ejercicios_Recomendados: '',
          Dias_Ejercicio: '',
          Calorias_Diarias: '',
          Observaciones: '',
          Estatus: true
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          await axios.post('http://localhost:3000/api/dietas', this.dieta);
          console.log('Dieta guardada correctamente');
          this.$router.push('/dietas');
        } catch (error) {
          console.error('Error al guardar dieta:', error);
          alert('Error al guardar dieta');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  form div {
    margin-bottom: 12px;
  }
  
  input, select, textarea, button {
    display: block;
    width: 100%;
    padding: 8px;
    margin-top: 4px;
  }
  </style>
  