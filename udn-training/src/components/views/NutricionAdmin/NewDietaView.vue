<template>
  <div class="container">
    <h1>Agregar Nueva Dieta</h1>
    <br>
    <form @submit.prevent="submitForm" class="form-grid">
      <!-- Primera columna -->
      <div class="column">
        <div>
          <label>Selecciona Usuario:</label>
          <select v-model="dieta.user_id" required>
            <option value="" disabled>Selecciona un usuario</option>
            <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
              {{ usuario.nombre_usuario }}
            </option>
          </select>
        </div>
        
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="dieta.nombre" required />
        </div>
        
        <div>
          <label>Género:</label>
          <select v-model="dieta.genero" required>
            <option value="M">Masculino</option>
            <option value="H">Femenino</option>
            <option value="N/B">No Binario</option>
          </select>
        </div>
        
        <div>
          <label>Altura (cm):</label>
          <input type="number" v-model="dieta.altura" required />
        </div>
        
        <div>
          <label>Peso (kg):</label>
          <input type="number" v-model="dieta.peso" required />
        </div>
      </div>
      
      <!-- Segunda columna -->
      <div class="column">
        <div>
          <label>Objetivo:</label>
          <select v-model="dieta.objetivo" required>
            <option value="Perdida de Peso">Perdida de Peso</option>
            <option value="Aumento de masa muscular">Aumento de masa muscular</option>
            <option value="Mantenimiento">Mantenimiento</option>
          </select>
        </div>
        
        <div>
          <label>Tipo de Ejercicio:</label>
          <select v-model="dieta.tipo_ejercicios_recomendados" required>
            <option value="Cardio">Cardio</option>
            <option value="Levantamiento de pesas">Levantamiento de pesas</option>
            <option value="Ejercicios Técnicos">Ejercicios Técnicos</option>
          </select>
        </div>
        
        <div>
          <label>Días de Ejercicio:</label>
          <select v-model="dieta.dias_ejercicio" required>
            <option value="1 dia a la semana">1 día a la semana</option>
            <option value="2 dias a la semana">2 días a la semana</option>
            <option value="3 dias a la semana">3 días a la semana</option>
            <option value="4 dias a la semana">4 días a la semana</option>
            <option value="5 dias a la semana">5 días a la semana</option>
          </select>
        </div>
        
        <div>
          <label>Calorías Diarias:</label>
          <input type="number" v-model="dieta.calorias_diarias" required />
        </div>
        
        <div>
          <label>Observaciones:</label>
          <textarea v-model="dieta.observaciones"></textarea>
        </div>
      </div>
    </form>
    <div class="full-width">
      <label>Estatus:</label>
      <input type="checkbox" v-model="dieta.estatus" />
      <button type="submit">Guardar Dieta</button>
    </div>
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
        estatus: true,
        user_id: ''
      },
      usuarios: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8000/api/usuarios');
      this.usuarios = response.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  },
  methods: {
    async submitForm() {
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
.container {
  max-width: 800px;
  margin: auto;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: flex;
  gap: 20px;
}

.column {
  flex: 1;
}

.full-width {
  margin-top: 20px;
  text-align: center;
}

input, select, textarea, button {
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
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

button:hover {
  background-color: #b71c1c;
}
</style>
