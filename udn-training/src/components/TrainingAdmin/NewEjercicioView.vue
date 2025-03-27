<template>
  <div>
    <h1>Agregar Nuevo Ejercicio</h1>
    <form @submit.prevent="submitForm" class="form-container">
      <div class="form-grid">
        <div class="form-group">
          <label>Nombre:</label>
          <input type="text" v-model="ejercicio.nombre" required />
        </div>

        <div class="form-group">
          <label>Descripción:</label>
          <input type="text" v-model="ejercicio.descripcion" required />
        </div>

        <div class="form-group">
          <label>Video URL:</label>
          <input type="text" v-model="ejercicio.video" />
        </div>

        <div class="form-group">
          <label>Tipo:</label>
          <select v-model="ejercicio.tipo" required>
            <option value="Aerobico">Aeróbico</option>
            <option value="Resistencia">Resistencia</option>
            <option value="Flexibilidad">Flexibilidad</option>
            <option value="Fuerza">Fuerza</option>
          </select>
        </div>

        <div class="form-group">
          <label>Dificultad:</label>
          <select v-model="ejercicio.dificultad" required>
            <option value="Basico">Básico</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>

        <div class="form-group">
          <label>Recomendaciones:</label>
          <input type="text" v-model="ejercicio.recomendaciones" />
        </div>

        <div class="form-group">
          <label>Restricciones:</label>
          <input type="text" v-model="ejercicio.restricciones" />
        </div>

        <div class="form-group">
          <label>Estatus:</label>
          <input type="checkbox" v-model="ejercicio.estatus" />
        </div>

<div class="form-group">
  <label>Fecha Personalizada:</label>
  <div class="date-picker">
    <select v-model="fecha.dia" required>
      <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
    </select>
    <select v-model="fecha.mes" required>
      <option v-for="(mes, index) in meses" :key="index" :value="index + 1">{{ mes }}</option>
    </select>
    <select v-model="fecha.anio" required>
      <option v-for="anio in anios" :key="anio" :value="anio">{{ anio }}</option>
    </select>
  </div>
</div>
      
        <!-- Nuevo campo para 'objetivo' -->
        <div class="form-group">
          <label>Objetivo:</label>
          <input type="text" v-model="ejercicio.objetivo" placeholder="Ej: Aumentar resistencia" />
        </div>

        <div class="form-group">
          <label>Selecciona Usuario:</label>
          <select v-model="ejercicio.user_id" required>
            <option value="" disabled>Selecciona un usuario</option>
            <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
              {{ usuario.nombre_usuario }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit">Guardar Ejercicio</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: 'NewEjercicio',
  data() {
    return {
      ejercicio: {
        nombre: '',
        descripcion: '',
        video: '',
        tipo: 'Aerobico',
        estatus: true,
        dificultad: 'Basico',
        recomendaciones: '',
        restricciones: '',
        user_id: null,
        completado: false,    // Inicialmente en false
        objetivo: '',
        fecha_personalizada: null,
      },
      fecha: {
      dia: new Date().getDate(),
      mes: new Date().getMonth() + 1,
      anio: new Date().getFullYear(),
    },
    meses: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ],
      usuarios: [],
      anios: Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i),
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/api/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.usuarios = response.data;
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  },
  methods: {
    async submitForm() {
  this.ejercicio.fecha_personalizada = `${this.fecha.anio}-${String(this.fecha.mes).padStart(2, '0')}-${String(this.fecha.dia).padStart(2, '0')}`;
  try {
    const token = localStorage.getItem('access_token');
    await axios.post('http://localhost:8000/api/ejercicios', this.ejercicio, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Swal.fire('Éxito', 'Ejercicio guardado correctamente', 'success');
    this.$router.push('/ejercicios');
  } catch (error) {
    console.error('Error al guardar ejercicio:', error.response.data);
    Swal.fire('Error', 'Error al guardar ejercicio', 'error');
  }
},
  },
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f1f1f1;
  font-size: 14px;
}

button {
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 16px;
  color: white;
  background-color: #e53935;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color: #d32f2f;
}
</style>