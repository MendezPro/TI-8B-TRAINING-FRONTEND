<template>
  <div class="form-container">
    <h1>Agregar Nueva Dieta</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="dieta.nombre" required />
      </div>

      <div class="form-group">
        <label for="genero">Género:</label>
        <select id="genero" v-model="dieta.genero" required>
          <option value="M">Masculino</option>
          <option value="H">Femenino</option>
          <option value="N/B">No Binario</option>
        </select>
      </div>

      <div class="form-group">
        <label for="altura">Altura:</label>
        <input type="number" id="altura" v-model="dieta.altura" required />
      </div>

      <div class="form-group">
        <label for="peso">Peso:</label>
        <input type="number" id="peso" v-model="dieta.peso" required />
      </div>

      <div class="form-group">
        <label for="objetivo">Objetivo:</label>
        <select id="objetivo" v-model="dieta.objetivo" required>
          <option value="Perdida de Peso">Perdida de Peso</option>
          <option value="Aumento de masa muscular">Aumento de masa muscular</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>
      </div>

      <div class="form-group">
        <label for="tipo_ejercicio">Tipo de Ejercicio:</label>
        <select id="tipo_ejercicio" v-model="dieta.tipo_ejercicios_recomendados" required>
          <option value="Cardio">Cardio</option>
          <option value="Levantamiento de pesas">Levantamiento de pesas</option>
          <option value="Ejercicios Técnicos">Ejercicios Técnicos</option>
        </select>
      </div>

      <div class="form-group">
        <label for="dias_ejercicio">Días de Ejercicio:</label>
        <select id="dias_ejercicio" v-model="dieta.dias_ejercicio" required>
          <option value="1 dia a la semana">1 día a la semana</option>
          <option value="2 dias a la semana">2 días a la semana</option>
          <option value="3 dias a la semana">3 días a la semana</option>
          <option value="4 dias a la semana">4 días a la semana</option>
          <option value="5 dias a la semana">5 días a la semana</option>
        </select>
      </div>

      <div class="form-group">
        <label for="calorias_diarias">Calorías Diarias:</label>
        <input type="number" id="calorias_diarias" v-model="dieta.calorias_diarias" required />
      </div>

      <div class="form-group">
        <label for="observaciones">Observaciones:</label>
        <textarea id="observaciones" v-model="dieta.observaciones"></textarea>
      </div>

      <div class="form-group">
        <label for="estatus">Estatus:</label>
        <input type="checkbox" id="estatus" v-model="dieta.estatus" />
      </div>

      <button type="submit">Guardar Dieta</button>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      dieta: {
        nombre: '',
        genero: '',
        altura: '',
        peso: '',
        objetivo: '',
        tipo_ejercicios_recomendados: '',
        dias_ejercicio: '',
        calorias_diarias: '',
        observaciones: '',
        estatus: true
      }
    };
  },
  methods: {
    async submitForm() {
      // Convertir los valores de tipo texto en números, si es necesario
      this.dieta.altura = parseFloat(this.dieta.altura);
      this.dieta.peso = parseFloat(this.dieta.peso);
      this.dieta.calorias_diarias = parseFloat(this.dieta.calorias_diarias);

      try {
        await axios.post('http://localhost:8000/api/dietas', this.dieta);
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
