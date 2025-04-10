<template>
  <div class="rutina-form-wrapper">
    <h1>Agregar Nuevo Programa Saludable</h1>
    <form @submit.prevent="submitForm" class="rutina-form">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input id="nombre" type="text" v-model="programa.nombre" required />
      </div>
      
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" v-model="programa.descripcion"></textarea>
      </div>
      
      <div class="form-group">
        <label for="fecha_inicio">Fecha de Inicio:</label>
        <input id="fecha_inicio" type="datetime-local" v-model="programa.fecha_inicio" required />
      </div>
      
      <div class="form-group">
        <label for="fecha_finalizacion">Fecha de Finalización:</label>
        <input id="fecha_finalizacion" type="datetime-local" v-model="programa.fecha_finalizacion" />
      </div>
      
      <div class="form-group">
        <label for="dieta">Dieta:</label>
        <select id="dieta" v-model="programa.id_dietas" required>
          <option value="" disabled>Selecciona una dieta</option>
          <option v-for="dieta in dietas" :key="dieta.id" :value="dieta.id">
            {{ dieta.nombre }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="entrenador">Entrenador:</label>
        <select id="entrenador" v-model="programa.id_entrenador" required>
          <option value="" disabled>Selecciona un entrenador</option>
          <option v-for="entrenador in entrenadores" :key="entrenador.id" :value="entrenador.id">
            {{ entrenador.nombre_usuario }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="cliente">Cliente:</label>
        <select id="cliente" v-model="programa.id_user" required>
          <option value="" disabled>Selecciona un cliente</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nombre_usuario }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="fecha_registro">Fecha de Registro:</label>
        <input id="fecha_registro" type="datetime-local" v-model="programa.fecha_registro" required />
      </div>
      
      <div class="form-group full-width">
        <button type="submit" class="btn-guardar">Guardar Programa</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ProgramaSaludableForm',
  data() {
    return {
      programa: {
        nombre: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_finalizacion: "",
        id_dietas: "",
        id_entrenador: null,
        id_user: null,
        fecha_registro: ""
      },
      // Listados para los select
      entrenadores: [],
      clientes: [],
      dietas: []  // Cargará las dietas disponibles
    };
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    
    // Cargar entrenadores (endpoint de usuarios con rol "Entrenador")
    axios.get('http://localhost:8000/api/usuarios/rol/Entrenador', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => { this.entrenadores = response.data; })
      .catch(error => { console.error("Error al cargar entrenadores:", error); });
    
    // Cargar clientes (endpoint de usuarios con rol "Cliente")
    axios.get('http://localhost:8000/api/usuarios/rol/Cliente', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => { this.clientes = response.data;  })
      .catch(error => { console.error("Error al cargar clientes:", error); });
      
    // Cargar dietas disponibles
    axios.get('http://localhost:8000/api/dietas/?skip=0&limit=10', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => { this.dietas = response.data;  console.log("Dietas cargadas:", this.dietas);  })
      .catch(error => { console.error("Error al cargar dietas:", error); });
  },
  methods: {
    async submitForm() {
      const token = localStorage.getItem('access_token');
      try {
        await axios.post('http://localhost:8000/api/programas_saludables', this.programa, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.$router.push('/programas_saludables');
      } catch (error) {
        console.error("Error al guardar el programa:", error);
        alert("Error al guardar el programa");
      }
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