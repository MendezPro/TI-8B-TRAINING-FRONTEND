<template>
  <div class="container">
    <div class="form-container">
      <h1>Editar Programa Saludable</h1>
      <form @submit.prevent="updatePrograma">
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
          <label for="id_dietas">ID Dietas:</label>
          <input id="id_dietas" type="number" v-model="programa.id_dietas" required />
        </div>
        <div class="form-group">
          <label for="entrenador">Entrenador:</label>
          <select id="entrenador" v-model="programa.id_entrenador" required>
            <option disabled value="">Selecciona un entrenador</option>
            <option v-for="entrenador in entrenadores" :key="entrenador.id" :value="entrenador.id">
              {{ entrenador.nombre_usuario }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="cliente">Cliente:</label>
          <select id="cliente" v-model="programa.id_user" required>
            <option disabled value="">Selecciona un cliente</option>
            <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
              {{ cliente.nombre_usuario }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="fecha_registro">Fecha de Registro:</label>
          <input id="fecha_registro" type="datetime-local" v-model="programa.fecha_registro" required />
        </div>
        <div class="form-group button-container">
          <button type="submit">Actualizar Programa</button>
        </div>
      </form>
    </div>
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
/* Contenedor principal para centrar el contenido */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg,rgb(255, 255, 255),rgb(255, 255, 255));
  padding: 20px;
}

/* Estilos para el contenedor del formulario */
.form-container {
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
}

/* Título principal */
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-weight: 600;
}

/* Grupo de campos del formulario */
.form-group {
  margin-bottom: 20px;
}

/* Etiquetas de los campos */
label {
  display: block;
  font-size: 0.95rem;
  margin-bottom: 6px;
  color: #555;
}

/* Inputs, textarea y selects */
input[type="text"],
input[type="number"],
input[type="datetime-local"],
textarea,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #333;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus,
select:focus {
  border-color:rgb(255, 17, 0);
  outline: none;
}

/* Botón del formulario */
.button-container {
  margin-top: 30px;
}

button {
  width: 100%;
  padding: 12px;
  background-color:rgb(255, 45, 45);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color:rgb(248, 0, 0);
}
</style>
