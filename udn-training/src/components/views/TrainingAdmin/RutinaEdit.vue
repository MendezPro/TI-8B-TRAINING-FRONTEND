<template>
  <div class="rutinas-container">
    <h1>Editar Rutina</h1>
    <form @submit.prevent="submitRoutine" class="form-grid">
      <div class="form-group">
        <label for="nombre">Nombre de la Rutina:</label>
        <input type="text" v-model="rutina.nombre" required />
      </div>
      <div class="form-group">
        <label for="user_id">Cliente (ID Usuario):</label>
        <select v-model="rutina.user_id" required>
          <option value="" disabled>Selecciona un cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nombre_usuario }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="ejercicio_id">Ejercicio:</label>
        <select v-model="rutina.ejercicio_id" required>
          <option value="" disabled>Selecciona un ejercicio</option>
          <option v-for="ejercicio in ejercicios" :key="ejercicio.id" :value="ejercicio.id">
            {{ ejercicio.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="objetivo_id">Objetivo:</label>
        <select v-model="rutina.objetivo_id">
          <option value="" disabled>Selecciona un objetivo</option>
          <option v-for="objetivo in objetivos" :key="objetivo.id" :value="objetivo.id">
            {{ objetivo.nombre }}
          </option>
        </select>
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
        <label for="frecuencia">Frecuencia (hora):</label>
        <input type="time" v-model="rutina.frecuencia" />
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
  import axios from "axios";
  export default {
    name: "RutinaEdit",
    data() {
      return {
        rutina: {
          nombre: "",
          user_id: "",
          ejercicio_id: "",
          objetivo_id: "",
          descripcion: "",
          duracion: null,
          frecuencia: "",
          fecha_inicio: "",
          fecha_finalizacion: "",
          fecha_creacion: new Date().toISOString(),
          fecha_actualizacion: null
        },
        objetivos: [],
        ejercicios: [],
        clientes: []
      };
    },
    mounted() {
      const token = localStorage.getItem("access_token");
      // Cargar objetivos
      axios
        .get("http://localhost:8000/api/objetivos_programa/?skip=0&limit=10", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.objetivos = response.data;
        })
        .catch(error => {
          console.error("Error al cargar objetivos:", error);
        });
      // Cargar ejercicios
      axios
        .get("http://localhost:8000/api/ejercicios/?skip=0&limit=10", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.ejercicios = response.data;
        })
        .catch(error => {
          console.error("Error al cargar ejercicios:", error);
        });
      // Cargar clientes (usuarios con rol Cliente)
      axios
        .get("http://localhost:8000/api/usuarios/rol/Cliente", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.clientes = response.data;
        })
        .catch(error => {
          console.error("Error al cargar clientes:", error);
        });
    },
    methods: {
      submitRoutine() {
        const token = localStorage.getItem("access_token");
        axios
          .post("http://localhost:8000/api/rutinas", this.rutina, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            console.log("Rutina asignada:", response.data);
            this.$router.push("/rutinas");
          })
          .catch(error => {
            console.error("Error al asignar la rutina:", error);
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .rutinas-container {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
    background-color: #f4f4f4;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  input,
  select,
  textarea {
    padding: 0.7rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  button {
    width: 100%;
    padding: 0.8rem;
    background-color: #2e86de;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2166c2;
  }
  
  .full-width {
    grid-column: span 2;
  }
  </style>