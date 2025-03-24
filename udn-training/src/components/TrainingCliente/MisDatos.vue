<template>
    <div class="mis-datos">
      <h1>Mis Datos</h1>
      <div class="card">
        <div class="field">
          <label>Nombre de Usuario:</label>
          <span>{{ usuario.nombre_usuario }}</span>
        </div>
        <div class="field">
          <label>Correo Electrónico:</label>
          <span>{{ usuario.correo_electronico }}</span>
        </div>
        <div class="field">
          <label>Número Telefónico:</label>
          <span>{{ usuario.numero_telefonico_movil }}</span>
        </div>
        <div class="field">
          <label>Rol:</label>
          <span>{{ usuario.rol }}</span>
        </div>
        <div class="field">
          <label>Fecha de Registro:</label>
          <span>{{ formattedFechaRegistro }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MisDatos',
    data() {
      return {
        usuario: {}
      };
    },
    computed: {
      formattedFechaRegistro() {
        return this.usuario.fecha_registro
          ? new Date(this.usuario.fecha_registro).toLocaleString()
          : '';
      }
    },
    mounted() {
      const usuario_id = localStorage.getItem("usuario_id");
      const token = localStorage.getItem("access_token"); // Obtener el token
  
      if (token) {
        axios.get(`http://localhost:8000/api/usuarios/${usuario_id}`, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en el header
          }
        })
        .then(response => {
          this.usuario = response.data;
        })
        .catch(error => {
          console.error("Error al cargar los datos del usuario:", error.response?.data || error);
        });
      } else {
        console.error("Token no encontrado en el almacenamiento local.");
      }
    }
  };
</script>
  
<style scoped>
.mis-datos {
    padding: 20px;
    max-width: 800px;
    margin: auto;
}

.mis-datos h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #222; /* Un gris oscuro para el título */
}

.card {
    background: #d9d9d9; /* Un gris claro */
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Sombra más notoria */
    padding: 20px;
    text-align: center; /* Centra el contenido */
}

.field label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    color: #444; /* Un gris medio */
}

.field span {
    font-size: 1.1rem;
    color: #222; /* Gris oscuro para el contenido */
    display: block; /* Hace que el span ocupe todo el ancho y se centre */
}


.field span {
    font-size: 1.1rem;
    color: #222; /* Gris oscuro para el contenido */
}

</style>
  