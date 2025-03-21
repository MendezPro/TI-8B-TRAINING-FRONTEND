<template>
  <div>
    <h1>Bienvenido a Dietas</h1>
    <button @click="$router.push('/dietas/nueva')">Agregar Nueva Dieta</button>
    <form id="search">
      <p>Buscar</p>
      <input v-model="searchInput" />
    </form>

    <DietasTable 
      :entries="dataset" 
      :columns="dataColumns" 
      :filter-key="searchInput"
    />
  </div>
</template>

<script>
import axios from 'axios';
import DietasTable from '@/components/DietasTable.vue';

export default {
  name: 'DietasView',
  components: {
    DietasTable
  },
  data() {
    return {
      searchInput: "",
      dataColumns: ["ID", "Nombre", "Genero", "Altura", "Peso", "Objetivo","Tipo_Ejercicios_Recomendados", "Dias_Ejercicio", "Calorias_Diarias", "Observaciones","Estatus", "Fecha_Registro"],
      dataset: []
    };
  },
  mounted() {
    axios.get('http://localhost:8000/api/dietas')
    .then(response => {
      this.dataset = response.data.map(dieta => ({
        ID: dieta.id,
        Nombre: dieta.nombre,
        Genero: dieta.genero,
        Altura: dieta.altura,
        Peso: dieta.peso,
        Objetivo: dieta.objetivo,
        Tipo_Ejercicios_Recomendados: dieta.tipo_ejercicios_recomendados,
        Dias_Ejercicio: dieta.dias_ejercicio,
        Calorias_Diarias: dieta.calorias_diarias,
        Observaciones: dieta.observaciones,
        Estatus: dieta.estatus ? 'Activo' : 'Inactivo',
        Fecha_Registro: dieta.fecha_registro,
      }));
    })
      .catch(error => {
        console.error("Error al cargar dietas:", error);
      });
  }
};
</script>

<style scoped>
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
  max-width: 1500px;
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
