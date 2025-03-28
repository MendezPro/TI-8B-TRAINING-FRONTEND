<template>
  <div class="form-container">
    <h1>Agregar Nuevo Indicador Nutricional</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label>Altura (m):</label>
        <input type="number" step="0.01" v-model="indicador.altura" required />
      </div>
      <div class="form-group">
        <label>Peso (kg):</label>
        <input type="number" step="0.01" v-model="indicador.peso" required />
      </div>
      <div class="form-group">
        <label>IMC:</label>
        <input type="number" step="0.01" v-model="indicador.imc" readonly />
      </div>
      <div class="form-group">
        <label>Porcentaje de Grasa:</label>
        <input type="number" step="0.01" v-model="indicador.porcentaje_grasa" required />
      </div>
      <div class="form-group">
        <label>Nivel de Actividad:</label>
        <select v-model="indicador.nivel_actividad" required>
          <option value="Sedentario">Sedentario</option>
          <option value="Ligero">Ligero</option>
          <option value="Moderado">Moderado</option>
          <option value="Activo">Activo</option>
          <option value="Muy_Activo">Muy Activo</option>
        </select>
      </div>
      <div class="form-group">
        <label>Usuario:</label>
        <select v-model="indicador.usuario_id" required>
          <option value="" disabled>Seleccione un usuario</option>
          <option v-for="user in usuarios" :key="user.id" :value="user.id">
            {{ user.nombre_usuario }}
          </option>
        </select>
      </div>
      <button type="submit">Guardar Indicador</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'IndicadorForm',
  data() {
    return {
      indicador: {
        altura: 0,
        peso: 0,
        imc: 0,
        porcentaje_grasa: 0,
        nivel_actividad: '',
        usuario_id: ''
      },
      usuarios: []
    };
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    axios.get('http://localhost:8000/api/usuarios', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.usuarios = response.data;
      })
      .catch(error => {
        console.error("Error al cargar usuarios:", error);
      });
  },
  watch: {
    // Calcula automáticamente el IMC cuando cambian el peso o la altura
    'indicador.altura': 'calculateIMC',
    'indicador.peso': 'calculateIMC'
  },
  methods: {
    calculateIMC() {
      if (this.indicador.altura > 0 && this.indicador.peso > 0) {
        this.indicador.imc = (this.indicador.peso / (this.indicador.altura ** 2)).toFixed(2);
      } else {
        this.indicador.imc = 0;
      }
    },
    submitForm() {
      const token = localStorage.getItem('access_token');
      axios.post('http://localhost:8000/api/indicadores_nutricionales', this.indicador, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          Swal.fire('¡Éxito!', 'El indicador se agregó correctamente.', 'success');
          this.$router.push('/indicadores');
        })
        .catch(error => {
          console.error("Error al agregar indicador:", error);
          Swal.fire('Error', 'Hubo un problema al agregar el indicador.', 'error');
        });
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 16px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input,
select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    background-color: #388e3c;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
}

button:hover {
    background-color: #2c6f29;
}
</style>