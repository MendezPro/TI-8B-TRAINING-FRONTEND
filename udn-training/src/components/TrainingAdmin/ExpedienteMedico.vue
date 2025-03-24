<template>
    <div>
      <h1>Expedientes Médicos</h1>
      <button @click="$router.push('/expedientes/nuevo')">Agregar Nuevo Expediente</button>
      
      <form id="search">
        <p>Buscar</p>
        <input v-model="searchInput" />
      </form>
      
      <ExpedienteTable 
        :entries="dataset" 
        :columns="dataColumns" 
        :filter-key="searchInput"
      />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ExpedienteTable from '@/components/ExpedienteTable.vue';
  
  export default {
    name: 'ExpedienteView',
    components: {
      ExpedienteTable
    },
    data() {
      return {
        searchInput: "",
        dataColumns: [
          "nombre", "apellido",
          "fecha_nacimiento", "sexo", "curp", "fecha_registro", 
          "direccion", "telefono", "correo_electronico", 
          "fecha_ultima_de_evaluacion", "antecedentes_medicos","lesiones_previas", "presion_arterial",
          "estatura", "peso"
        ],
        dataset: []
      };
    },
    mounted() {
      const token = localStorage.getItem('access_token'); 
      axios.get('http://localhost:8000/api/expedientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
        .then(response => {
          this.dataset = response.data.map(exp => ({
            _id: exp._id,
            nombre: exp.nombre,
            apellido: exp.apellido, 
            fecha_nacimiento: exp.fecha_nacimiento,
            sexo: exp.sexo,
            curp: exp.curp,
            fecha_registro: exp.fecha_registro,
            direccion: exp.direccion || "N/A",
            telefono: exp.telefono || "N/A",
            correo_electronico: exp.correo_electronico || "N/A",
            fecha_ultima_de_evaluacion: exp.fecha_ultima_de_evaluacion,
            antecedentes_medicos: exp.antecedentes_medicos || "N/A",
            lesiones_previas: exp.lesiones_previas || "N/A",
            presion_arterial: exp.presion_arterial || "N/A",
            estatura: exp.estatura || "N/A",
            peso: exp.peso || "N/A"
          }));
        })
        .catch(error => {
          console.error("Error al cargar expedientes:", error);
        });
    }
  };
  </script>
  
  <style scoped>
/* Elimina el contenedor */
div {
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

/* Botón para agregar nuevo expediente */
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

/* Estilo para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto; /* Permite desplazamiento horizontal en pantallas pequeñas */
}

th, td {
  padding: 8px; /* Reducido para mejor ajuste */
  border: 1px solid #ddd;
  text-align: left;
  font-family: 'Arial', sans-serif;
  font-size: 12px; /* Reducido para más ajuste en pantallas pequeñas */
}

th {
  cursor: pointer;
  background-color: #e74c3c; /* Rojo */
  color: white;
  font-weight: bold;
  border-bottom: 2px solid #c0392b; /* Rojo oscuro */
}

th.active {
  background-color: #c0392b;
}

tr:nth-child(even) {
  background-color: #f4f4f4;
}

tr:hover {
  background-color: #ecf0f1;
}

.arrow {
  margin-left: 10px;
  font-size: 12px;
  color: #bbb;
}

.arrow.asc::after {
  content: '▲';
}

.arrow.dsc::after {
  content: '▼';
}

tbody td {
  font-size: 12px; /* Reducido para mejor ajuste */
  color: #555;
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 768px) {
  th, td {
    padding: 6px; /* Aún más reducido */
    font-size: 10px; /* Ajustado para pantallas pequeñas */
  }

  .arrow {
    font-size: 10px; /* Tamaño reducido para el icono de flecha */
  }

  table {
    font-size: 10px; /* Ajuste de fuente general */
    overflow-x: auto;
  }

  button {
    width: 100%;
    max-width: 200px; /* Botón ajustado para pantallas pequeñas */
    padding: 10px;
  }

  input {
    width: 100%;
    max-width: 300px; /* Ajuste para entradas más estrechas */
  }
}
</style>