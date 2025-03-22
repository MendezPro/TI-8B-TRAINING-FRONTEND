<template>
  <div class="form-container">
    <h1>Agregar Nuevo Expediente Médico</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Nombre:</label>
        <input type="text" v-model="expediente.nombre" required />
      </div>

      <div class="form-group">
        <label>Apellido:</label>
        <input type="text" v-model="expediente.apellido" required />
      </div>

      <div class="form-group">
        <label>Fecha de Nacimiento:</label>
        <input type="date" v-model="expediente.fecha_nacimiento" required />
      </div>

      <div class="form-group">
        <label>Sexo:</label>
        <select v-model="expediente.sexo" required>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div class="form-group">
        <label>CURP:</label>
        <input type="text" v-model="expediente.curp" required maxlength="18" />
      </div>

      <div class="form-group">
        <label>Dirección:</label>
        <input type="text" v-model="expediente.direccion" />
      </div>

      <div class="form-group">
        <label>Teléfono:</label>
        <input type="text" v-model="expediente.telefono" maxlength="15" />
      </div>

      <div class="form-group">
        <label>Correo Electrónico:</label>
        <input type="email" v-model="expediente.correo_electronico" />
      </div>

      <div class="form-group">
        <label>Fecha de Última Evaluación:</label>
        <input type="date" v-model="expediente.fecha_ultima_de_evaluacion" required />
      </div>

      <div class="form-group">
        <label>Antecedentes Médicos:</label>
        <textarea v-model="expediente.antecedentes_medicos"></textarea>
      </div>

      <div class="form-group">
        <label>Lesiones Previas:</label>
        <textarea v-model="expediente.lesiones_previas"></textarea>
      </div>

      <div class="form-group">
        <label>Presión Arterial:</label>
        <input type="text" v-model="expediente.presion_arterial" />
      </div>

      <!-- Nuevos campos -->
      <div class="form-group">
        <label>Peso (kg):</label>
        <input type="number" v-model="expediente.peso" min="0" />
      </div>

      <div class="form-group">
        <label>Estatura (cm):</label>
        <input type="number" v-model="expediente.estatura" min="0" />
      </div>

      <button type="submit">Guardar Expediente</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      expediente: {
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        sexo: '',
        curp: '',
        direccion: '',
        telefono: '',
        correo_electronico: '',
        fecha_ultima_de_evaluacion: '',
        antecedentes_medicos: '',
        lesiones_previas: '',
        presion_arterial: '',
        peso: '',
        estatura: '',
        fecha_registro: new Date().toISOString()
      }
    };
  },
  methods: {
    submitForm() {
      // Convertir la fecha al formato ISO antes de enviarla
      const expedienteData = {
        ...this.expediente,
        fecha_nacimiento: new Date(this.expediente.fecha_nacimiento).toISOString().split('T')[0],
        fecha_ultima_de_evaluacion: new Date(this.expediente.fecha_ultima_de_evaluacion).toISOString().split('T')[0]
      };

      axios.post('http://localhost:8000/api/expedientes', expedienteData)
        .then(response => {
          console.log('Expediente agregado:', response.data);
          this.$router.push('/expediente');
        })
        .catch(error => {
          console.error('Error al agregar expediente:', error);
        });
    }

  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

form .form-group {
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  color: #333;
}

input,
select,
textarea {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
}

button:hover {
  background-color: #45a049;
}
</style>
