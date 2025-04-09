<template>
  <div class="ejercicio-form-wrapper">
    <h1>Agregar Nuevo Ejercicio</h1>
    <form @submit.prevent="submitForm" class="ejercicio-form">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="ejercicio.nombre" id="nombre" required />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input type="text" v-model="ejercicio.descripcion" id="descripcion" required />
      </div>
      <div class="form-group">
        <label for="video">Video URL:</label>
        <input type="text" v-model="ejercicio.video" id="video" />
      </div>
      <div class="form-group">
        <label for="tipo">Tipo:</label>
        <select v-model="ejercicio.tipo" id="tipo" required>
          <option value="Aerobico">Aeróbico</option>
          <option value="Resistencia">Resistencia</option>
          <option value="Flexibilidad">Flexibilidad</option>
          <option value="Fuerza">Fuerza</option>
        </select>
      </div>
      <div class="form-group">
        <label for="dificultad">Dificultad:</label>
        <select v-model="ejercicio.dificultad" id="dificultad" required>
          <option value="Basico">Básico</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzado">Avanzado</option>
        </select>
      </div>
      <div class="form-group">
        <label for="recomendaciones">Recomendaciones:</label>
        <input type="text" v-model="ejercicio.recomendaciones" id="recomendaciones" />
      </div>
      <div class="form-group">
        <label for="restricciones">Restricciones:</label>
        <input type="text" v-model="ejercicio.restricciones" id="restricciones" />
      </div>
      <div class="form-group">
        <label for="estatus">Estatus:</label>
        <input type="checkbox" v-model="ejercicio.estatus" id="estatus" />
      </div>
      <div class="form-footer">
        <button type="submit" class="btn-guardar">Guardar Ejercicio</button>
      </div>
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
        tipo: '',
        estatus: '',
        dificultad: '',
        recomendaciones: '',
        restricciones: '',
      },
    };
  },
  methods: {
    async submitForm() {
  try {
    const token = localStorage.getItem('access_token');
    await axios.post('http://localhost:8000/api/ejercicios/', this.ejercicio, {
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
.ejercicio-form-wrapper {
  background-image: url('@/assets/frame1.png');
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 35px;
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.ejercicio-form-wrapper h1 {
  color: #fff;
  text-align: center;
  font-size: 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  margin-bottom: 20px;
}

.ejercicio-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #fff;
  font-weight: 600;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease, background 0.3s ease;
}

.form-group select {
  background-color: #333;
  color: #fff;
}

.form-group select option {
  background-color: #333;
  color: #fff;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #ff4d4d;
  background: rgba(255, 255, 255, 0.2);
}

textarea {
  resize: vertical;
  min-height: 80px;
}

.form-footer {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn-guardar {
  background: linear-gradient(145deg, #f79f43, #f27e1b);
  border: none;
  padding: 12px 24px;
  color: #fff;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 130, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;
  margin-top: 10px;
}

.btn-guardar:hover {
  transform: scale(1.05);
  background: linear-gradient(145deg, #f8a545, #f56b00);
}
</style>