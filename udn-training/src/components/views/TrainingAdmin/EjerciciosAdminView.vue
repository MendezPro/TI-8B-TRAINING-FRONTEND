<template>
  <div>
    <h1>Administración de Ejercicios</h1>
    <button @click="$router.push('/ejercicios/nuevo')">Agregar Nuevo Ejercicio</button>
    <form id="search">
      <p>Buscar</p>
      <input v-model="searchInput" placeholder="Buscar ejercicios..." />
    </form>
    <div>
      <button @click="activeTab = 'ejercicios'" :class="{ active: activeTab === 'ejercicios' }">Ejercicios</button>
      <button @click="activeTab = 'completados'" :class="{ active: activeTab === 'completados' }">Completados</button>
    </div>
    <EjerciciosTable
  v-if="activeTab === 'ejercicios'"
  :entries="dataset.filter(e => !e.completado)" 
  :columns="dataColumns"
  :filter-key="searchInput"
  @toggleCompleted="handleToggleCompleted"
/>
<EjerciciosTable
  v-if="activeTab === 'completados'"
  :entries="dataset.filter(e => e.completado)" 
  :columns="dataColumns"
  :filter-key="searchInput"
  @toggleCompleted="handleToggleCompleted"
/>
  </div>
</template>

<script>
import axios from 'axios';
import EjerciciosTable from '@/components/EjerciciosTable.vue';

export default {
  name: 'EjerciciosAdminView',
  components: {
    EjerciciosTable,
  },
  data() {
    return {
      searchInput: '',
      activeTab: 'ejercicios', // Pestaña activa
      dataColumns: [
        'ID',
        'Nombre',
        'Descripcion',
        'Video',
        'Tipo',
        'Estatus',
        'Dificultad',
        'Fecha_Registro',
        'Recomendaciones',
        'Restricciones',
      ],
      dataset: [],
    };
  },
  mounted() {
    this.fetchEjercicios();
  },
  methods: {
    fetchEjercicios() {
  const token = localStorage.getItem('access_token');
  axios
    .get('http://localhost:8000/api/ejercicios', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      this.dataset = response.data.map((ejercicio) => ({
        ID: ejercicio.id,
        Nombre: ejercicio.nombre,
        Descripcion: ejercicio.descripcion,
        Video: ejercicio.video,
        Tipo: ejercicio.tipo,
        Estatus: ejercicio.estatus ? 'Activo' : 'Inactivo',
        Dificultad: ejercicio.dificultad,
        Fecha_Registro: new Date(ejercicio.fecha_registro).toLocaleDateString(),
        Recomendaciones: ejercicio.recomendaciones || 'N/A',
        Restricciones: ejercicio.restricciones || 'N/A',
        completado: ejercicio.completado,
        usuario: ejercicio.usuario || { nombre_usuario: 'No asignado' },
      }));
    })
    .catch((error) => {
      console.error('Error al cargar ejercicios:', error);
    });
},
  },
};
</script>

<style scoped>
button.active {
  background-color: #388e3c;
  color: white;
}
/* Contenedor principal */
div {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Título principal */
h1 {
  color: #388e3c; /* Verde oscuro */
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
}

/* Botón para agregar nueva dieta */
button {
  background-color: #388e3c;
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
  background-color: #2c6f29;
}

/* Estilo para el formulario de búsqueda */
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
  border-color: #388e3c; /* Verde para el foco */
  outline: none;
}

/* Contenedor principal */
div {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Botón para agregar nueva dieta */
button {
  background-color: #e74c3c;
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
  background-color: #c0392b;
}
</style>
