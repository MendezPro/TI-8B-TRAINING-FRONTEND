<template>
  <div class="rutina-form-wrapper">
    <h1>Editar Rutina</h1>
    <form @submit.prevent="submitRoutine" class="rutina-form">
      <div class="form-group">
        <label for="nombre">Nombre de la Rutina:</label>
        <input id="nombre" type="text" v-model="rutina.nombre" required />
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
        <button type="submit" class="btn-guardar">Editar Rutina</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "RutinaEdit",
  data() {
    return {
      rutina: {
        id: null,
        nombre: "",
        ejercicio_id: "",
        objetivo_id: "",
        descripcion: "",
        duracion: null,
        frecuencia: "",
        fecha_inicio: "",
        fecha_finalizacion: "",
        // Se incluyen otros campos si es necesario
      },
      objetivos: [],
      ejercicios: [],
    };
  },
  mounted() {
    const token = localStorage.getItem("access_token");
    const rutinaId = this.$route.params.id; // Suponiendo que en la ruta se pasa el ID

    // Cargar la rutina a editar
    axios
      .get(`http://localhost:8000/api/rutinas/${rutinaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.rutina = response.data;

        // Formatear las fechas para que sean compatibles con el input datetime-local
        if (this.rutina.fecha_inicio) {
          this.rutina.fecha_inicio = this.rutina.fecha_inicio.slice(0, 16);
        }
        if (this.rutina.fecha_finalizacion) {
          this.rutina.fecha_finalizacion = this.rutina.fecha_finalizacion.slice(0, 16);
        }
      })
      .catch((error) => {
        console.error("Error al cargar la rutina:", error);
        Swal.fire("Error", "No se pudo cargar la rutina para editar", "error");
      });

    // Cargar objetivos
    axios
      .get("http://localhost:8000/api/objetivos_programa/?skip=0&limit=10", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.objetivos = response.data;
      })
      .catch((error) => {
        console.error("Error al cargar objetivos:", error);
        Swal.fire("Error", "No se pudieron cargar los objetivos", "error");
      });

    // Cargar ejercicios
    axios
      .get("http://localhost:8000/api/ejercicios/?skip=0&limit=10", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.ejercicios = response.data;
      })
      .catch((error) => {
        console.error("Error al cargar ejercicios:", error);
        Swal.fire("Error", "No se pudieron cargar los ejercicios", "error");
      });
  },
  methods: {
    submitRoutine() {
      const token = localStorage.getItem("access_token");
      // Utilizar PUT para actualizar la rutina existente
      axios
        .put(`http://localhost:8000/api/rutinas/${this.rutina.id}`, this.rutina, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire("Éxito", "Rutina actualizada exitosamente", "success");
          this.$router.push("/rutinas");
        })
        .catch((error) => {
          console.error("Error al actualizar la rutina:", error);
          Swal.fire("Error", "No se pudo actualizar la rutina", "error");
        });
    },
  },
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.rutina-form-wrapper h1 {
  color: #fff;
  text-align: center;
  font-size: 2rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
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
  box-shadow: 0 4px 12px rgba(255, 130, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;
  margin-top: 10px;
}

.btn-guardar:hover {
  transform: scale(1.05);
  background: linear-gradient(145deg, #f8a545, #f56b00);
}
</style>