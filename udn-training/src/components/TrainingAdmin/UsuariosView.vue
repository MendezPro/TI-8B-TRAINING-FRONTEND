<template>
    <div>
      <h1>Usuarios</h1>
      <button @click="$router.push('/usuarios/nuevo')">Agregar Nuevo Usuario</button>
      <form id="search">
        <p>Buscar</p>
        <input v-model="searchInput" />
      </form>
  
      <UsuariosTable
        :entries="dataset"
        :columns="dataColumns"
        :filter-key="searchInput"
        @userDeleted="handleUserDeleted"
      />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import UsuariosTable from '@/components/TrainingAdmin/UsuariosTable.vue';
  
  export default {
    name: 'UsuariosView',
    components: {
      UsuariosTable
    },
    data() {
      return {
        searchInput: "",
        dataColumns: ["ID", "Nombre_Usuario", "Correo_Electronico","Numero_Telefonico_Movil" , "Estatus", "Fecha_Registro","Rol"],
        dataset: []
      };
    },
    mounted() {
      axios.get('http://localhost:8000/api/usuarios')
        .then(response => {
          this.dataset = response.data.map(usuario => ({
            ID: usuario.id,
            Nombre_Usuario: usuario.nombre_usuario,
            Correo_Electronico: usuario.correo_electronico,
            Rol: usuario.rol,
            Numero_Telefonico_Movil: usuario.numero_telefonico_movil,
            Estatus: usuario.estatus, 
            Fecha_Registro: usuario.fecha_registro,
            Fecha_Actualizacion: usuario.fecha_actualizacion,
          }));
        })
        .catch(error => {
          console.error("Error al cargar usuarios:", error);
        });
    },
    methods: {
      handleUserDeleted(userId) {
        this.dataset = this.dataset.filter(user => user.ID !== userId);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilo general */
  div {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #34495e;
    text-align: center;
    font-size: 32px;
    margin-bottom: 20px;
  }
  
  button {
    background-color: #34495e;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 250px;
    transition: background-color 0.3s;
    margin-left: auto;
    margin-right: auto;
  }
  
  button:hover {
    background-color: #2c3e50;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  form p {
    font-size: 16px;
    color: #333;
    margin-bottom: 8px;
  }
  
  input {
    padding: 10px;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f1f1f1;
    font-size: 14px;
    margin-bottom: 15px;
    transition: border-color 0.3s;
  }
  
  input:focus {
    border-color: #34495e;
    outline: none;
  }
  </style>
  