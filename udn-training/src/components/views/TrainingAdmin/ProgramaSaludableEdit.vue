<template>
  <div class="container">
    <h1>Editar Programa Saludable</h1>
    <form @submit.prevent="updatePrograma">
      <div>
        <label>Nombre:</label>
        <input type="text" v-model="programa.nombre" required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea v-model="programa.descripcion"></textarea>
      </div>
      <div>
        <label>Fecha de Inicio:</label>
        <input type="datetime-local" v-model="programa.fecha_inicio" required />
      </div>
      <div>
        <label>Fecha de Finalización:</label>
        <input type="datetime-local" v-model="programa.fecha_finalizacion" />
      </div>
      <div>
        <label>ID Dietas:</label>
        <input type="number" v-model="programa.id_dietas" required />
      </div>
      <div>
        <label>Entrenador:</label>
        <select v-model="programa.id_entrenador" required>
          <option v-for="entrenador in entrenadores" :key="entrenador.id" :value="entrenador.id">
            {{ entrenador.nombre_usuario }}
          </option>
        </select>
      </div>
      <div>
        <label>Cliente:</label>
        <select v-model="programa.id_user" required>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
            {{ cliente.nombre_usuario }}
          </option>
        </select>
      </div>
      <div>
        <label>Fecha de Registro:</label>
        <input type="datetime-local" v-model="programa.fecha_registro" required />
      </div>
      <div>
        <button type="submit">Actualizar Programa</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: 'ProgramaSaludableEdit',
  data() {
    return {
      programa: {},
      entrenadores: [],
      clientes: []
    };
  },
  mounted() {
    const programaId = this.$route.params.id;
    const token = localStorage.getItem('access_token');
    axios.get(`http://localhost:8000/api/programas_saludables/${programaId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.programa = response.data;
    }).catch(error => {
      console.error("Error al cargar el programa:", error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Error al cargar el programa'
      });
    });
    // Cargar entrenadores y clientes
    axios.get('http://localhost:8000/api/usuarios/rol/Entrenador', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.entrenadores = response.data;
    }).catch(error => {
      console.error("Error al cargar entrenadores:", error);
    });
    axios.get('http://localhost:8000/api/usuarios/rol/Cliente', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      this.clientes = response.data;
    }).catch(error => {
      console.error("Error al cargar clientes:", error);
    });
  },
  methods: {
    async updatePrograma() {
      const programaId = this.$route.params.id;
      const token = localStorage.getItem('access_token');
      try {
        await axios.put(`http://localhost:8000/api/programas_saludables/${programaId}`, this.programa, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Programa actualizado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.$router.push('/programas_saludables');
      } catch (error) {
        console.error("Error al actualizar el programa:", error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Error al actualizar el programa'
        });
      }
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