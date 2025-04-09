<template>
  <div class="rutina-form-wrapper">
    <h1>Asignar Rutina</h1>
    <form @submit.prevent="submitRoutine" class="rutina-form">
      <div class="form-group">
        <label for="nombre">Nombre de la Rutina:</label>
        <input id="nombre" type="text" v-model="rutina.nombre" required />
      </div>
      <div class="form-group">
        <label for="user_id">Cliente (ID Usuario):</label>
        <select id="user_id" v-model="rutina.user_id" required>
          <option value="" disabled>Selecciona un cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nombre_usuario }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="ejercicio_id">Ejercicio:</label>
        <select id="ejercicio_id" v-model="rutina.ejercicio_id" required>
          <option value="" disabled>Selecciona un ejercicio</option>
          <option v-for="ejercicio in ejercicios" :key="ejercicio.id" :value="ejercicio.id">
            {{ ejercicio.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="objetivo_id">Objetivo:</label>
        <select id="objetivo_id" v-model="rutina.objetivo_id">
          <option value="" disabled>Selecciona un objetivo</option>
          <option v-for="objetivo in objetivos" :key="objetivo.id" :value="objetivo.id">
            {{ objetivo.nombre }}
          </option>
        </select>
      </div>
      <div class="form-group form-full">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="rutina.descripcion"></textarea>
      </div>
      <div class="form-group">
        <label for="duracion">Duración (horas):</label>
        <input id="duracion" type="number" v-model="rutina.duracion" step="0.1" />
      </div>
      <div class="form-group">
        <label for="frecuencia">Frecuencia (hora):</label>
        <input id="frecuencia" type="time" v-model="rutina.frecuencia" />
      </div>
      <div class="form-group">
        <label for="fecha_inicio">Fecha de Inicio:</label>
        <input id="fecha_inicio" type="datetime-local" v-model="rutina.fecha_inicio" />
      </div>
      <div class="form-group">
        <label for="fecha_finalizacion">Fecha de Finalización:</label>
        <input id="fecha_finalizacion" type="datetime-local" v-model="rutina.fecha_finalizacion" />
      </div>
      <div class="form-group full-width">
        <button type="submit" class="btn-guardar">Asignar Rutina</button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "RutinaForm",
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
.rutina-form-wrapper {
  background-image: url('@/assets/frame1.png');
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 35px;
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.rutina-form-wrapper h1 {
  color: #fff;
  text-align: center;
  font-size: 2rem;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
  margin-bottom: 20px;
}
.rutina-form {
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
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
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
  background: rgba(255,255,255,0.2);
}
textarea {
  resize: vertical;
  min-height: 80px;
}
/* La clase full-width hace que el elemento abarque todas las columnas */
.full-width {
  grid-column: 1 / -1;
}
.rutina-form .form-group.full-width {
  grid-column: 1 / -1;
}
.form-footer, 
.full-width {
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
  box-shadow: 0 4px 12px rgba(255,130,0,0.3);
  transition: transform 0.3s ease, background 0.3s ease;
  margin-top: 10px;
}
.btn-guardar:hover {
  transform: scale(1.05);
  background: linear-gradient(145deg, #f8a545, #f56b00);
}
</style>