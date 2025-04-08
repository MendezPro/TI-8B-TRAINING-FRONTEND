<template>
  <div class="container">
    <h1>Agregar Nuevo Programa Saludable</h1>
    <form @submit.prevent="submitForm" class="form-grid">
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
        <!-- Se carga a través del endpoint GET /api/dietas -->
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
        <button type="submit">Guardar Programa</button>
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
.container {
  max-width: 800px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #555;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color:red;
}

.full-width {
  grid-column: span 2;
  text-align: center;
}

button {
  background-color:red;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color:rgb(250, 13, 13);
}
</style>
