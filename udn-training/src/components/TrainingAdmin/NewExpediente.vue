<template>
    <div>
      <h1>Agregar Nuevo Expediente Médico</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label>Nombre:</label>
          <input type="text" v-model="expediente.nombre" required />
        </div>
  
        <div>
          <label>Apellido:</label>
          <input type="text" v-model="expediente.apellido" required />
        </div>
  
        <div>
          <label>Fecha de Nacimiento:</label>
          <input type="date" v-model="expediente.fecha_nacimiento" required />
        </div>
  
        <div>
          <label>Sexo:</label>
          <select v-model="expediente.sexo" required>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
  
        <div>
          <label>CURP:</label>
          <input type="text" v-model="expediente.curp" required maxlength="18" />
        </div>
  
        <div>
          <label>Dirección:</label>
          <input type="text" v-model="expediente.direccion" />
        </div>
  
        <div>
          <label>Teléfono:</label>
          <input type="text" v-model="expediente.telefono" maxlength="15" />
        </div>
  
        <div>
          <label>Correo Electrónico:</label>
          <input type="email" v-model="expediente.correo_electronico" />
        </div>
  
        <div>
          <label>Fecha de Última Evaluación:</label>
          <input type="date" v-model="expediente.fecha_ultima_de_evaluacion" required />
        </div>
  
        <div>
          <label>Antecedentes Médicos:</label>
          <textarea v-model="expediente.antecedentes_medicos"></textarea>
        </div>
  
        <div>
          <label>Lesiones Previas:</label>
          <textarea v-model="expediente.lesiones_previas"></textarea>
        </div>
  
        <div>
          <label>Presión Arterial:</label>
          <input type="text" v-model="expediente.presion_arterial" />
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
          fecha_registro: new Date().toISOString() // Generar automáticamente la fecha de registro
        }
      };
    },
    methods: {
      async submitForm() {
        try {
          await axios.post('http://localhost:8000/api/expediente_medico', this.expediente);
          console.log('Expediente guardado correctamente');
          this.$router.push('/expediente');
        } catch (error) {
          console.error('Error al guardar expediente:', error.response.data);
          alert('Error al guardar expediente');
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
  
  label {
    font-weight: bold;
    color: #333;
  }
  
  button {
    background-color: #d32f2f;
    color: white;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #b71c1c;
  }
  
  textarea {
    resize: vertical;
  }
  </style>
  