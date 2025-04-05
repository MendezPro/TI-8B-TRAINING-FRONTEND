<template>
  <div class="rutinas-container">
    <h1 class="title">Asignar Rutinas</h1>
    <form @submit.prevent="submitRoutine" class="form-grid">
      <div class="form-group">
        <label for="nombre">Nombre de la Rutina:</label>
        <input type="text" v-model="rutina.nombre" required />
      </div>
      <div class="form-group">
        <label for="id_user">ID del Usuario:</label>
        <input type="number" v-model="rutina.id_user" required />
      </div>
      <div class="form-group">
        <label for="id_ejercicios">ID de Ejercicio:</label>
        <input type="number" v-model="rutina.id_ejercicios" required />
      </div>
      <div class="form-group">
        <label for="id_objetivo">ID del Objetivo:</label>
        <input type="text" v-model="rutina.id_objetivo" />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea v-model="rutina.descripcion"></textarea>
      </div>
      <div class="form-group">
        <label for="duracion">Duración (horas):</label>
        <input type="number" v-model="rutina.duracion" step="0.1" />
      </div>
      <div class="form-group">
        <label for="frecuencia">Frecuencia (horas):</label>
        <input type="number" v-model="rutina.frecuencia" />
      </div>
      <div class="form-group">
        <label for="fecha_inicio">Fecha de Inicio:</label>
        <input type="datetime-local" v-model="rutina.fecha_inicio" />
      </div>
      <div class="form-group">
        <label for="fecha_finalizacion">Fecha de Finalización:</label>
        <input type="datetime-local" v-model="rutina.fecha_finalizacion" />
      </div>
      <div class="form-group full-width">
        <button type="submit">Asignar Rutina</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RutinasView",
  data() {
    return {
      rutina: {
        nombre: '',
        id_user: null,
        id_ejercicios: null,
        id_objetivo: '',
        descripcion: '',
        duracion: null,
        frecuencia: null,
        fecha_inicio: '',
        fecha_finalizacion: '',
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: null,
      },
    };
  },
  methods: {
    submitRoutine() {
      console.log("Rutina asignada:", this.rutina);
      this.resetForm();
    },
    resetForm() {
      this.rutina = {
        nombre: '',
        id_user: null,
        id_ejercicios: null,
        id_objetivo: '',
        descripcion: '',
        duracion: null,
        frecuencia: null,
        fecha_inicio: '',
        fecha_finalizacion: '',
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: null,
      };
    },
  },
};
</script>

<style scoped>
.rutinas-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: none;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.full-width {
  grid-column: span 2;
}
</style>