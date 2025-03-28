<template>
  <div>
    <!-- Se eliminó el input interno, ahora se usa el buscador de la vista principal -->
    <table>
      <thead>
        <tr>
          <th v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey === key }">
            {{ capitalize(key) }}
            <span class="arrow" :class="sortColumns[key] > 0 ? 'asc' : 'dsc'"></span>
          </th>
          <th>Usuario Asignado</th>
          <th>Operaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredEntries" :key="index">
          <td v-for="key in columns" :key="key">
            {{ entry[key] }}
          </td>
          <td>{{ entry.usuario ? entry.usuario.nombre_usuario : 'No asignado' }}</td>
          <td>
            <button @click="editRegistro(entry.curp)">
              <i class="fa fa-pencil" style="color: #e74c3c;"></i> Editar
            </button>
            <button @click="deleteRegistro(entry.curp)">
              <i class="fa fa-trash" style="color: #c0392b;"></i> Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'ExpedienteTable',
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    filterKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      usuarios: [],
      sortKey: "",
      sortColumns: {} // Se inicializará en created()
    };
  },
  computed: {
    // Une cada expediente con su usuario asignado
    dataset() {
      return this.entries.map(exp => {
        const usuario = this.usuarios.find(u => u.id === exp.usuario_id);
        return {
          ...exp,
          usuario: usuario || { nombre_usuario: 'No asignado' }
        };
      });
    },
    // Filtra y ordena la data unida usando filterKey (viene desde la vista principal)
    filteredEntries() {
      let entries = this.dataset;
      const filterKey = this.filterKey ? this.filterKey.toLowerCase() : "";
      if (filterKey) {
        entries = entries.filter(entry => {
          // Se filtra sobre las columnas definidas y sobre el nombre de usuario
          const inDataColumns = this.columns.some(key => {
            return entry[key] && entry[key].toString().toLowerCase().includes(filterKey);
          });
          const inUsuario = entry.usuario &&
            entry.usuario.nombre_usuario &&
            entry.usuario.nombre_usuario.toLowerCase().includes(filterKey);
          return inDataColumns || inUsuario;
        });
      }
      if (this.sortKey) {
        const order = this.sortColumns[this.sortKey];
        entries = entries.slice().sort((a, b) => {
          const x = a[this.sortKey];
          const y = b[this.sortKey];
          return (x === y ? 0 : x > y ? 1 : -1) * order;
        });
      }
      return entries;
    }
  },
  created() {
    // Inicializa sortColumns para cada columna recibida en props
    this.sortColumns = this.columns.reduce((acc, key) => {
      acc[key] = 1;
      return acc;
    }, {});
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    // Carga la información de usuarios
    axios.get('http://localhost:8000/api/usuarios', {
      headers: {
        Authorization: `Bearer ${token}` // Incluir el token en el header
      }
    })
      .then(response => {
        this.usuarios = response.data;
      })
      .catch(error => {
        console.error("Error al cargar usuarios:", error);
      });
  },
  methods: {
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortColumns[key] = this.sortColumns[key] * -1;
    },
    editRegistro(curp) {
      this.$router.push(`/expedientes/editar/${curp}`);
    },
    async deleteRegistro(curp) {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás recuperar este expediente después de eliminarlo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem('access_token');
          await axios.delete(`http://localhost:8000/api/expedientes/${curp}`, {
            headers: {
              Authorization: `Bearer ${token}` // Se añade el token en el header
            }
          })
          this.$emit('entryDeleted', curp); // Permite que la vista principal actualice la lista
          Swal.fire('¡Eliminado!', 'El expediente ha sido eliminado con éxito.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al eliminar el expediente.', 'error');
        }
      }
    }
  }
};
</script>

<style scoped>
/* Estilo para la tabla */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  /* Permite desplazamiento horizontal en pantallas pequeñas */
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin: 0 5px;
  padding: 5px 10px;
}

button i {
  margin-right: 5px;
}

button:hover {
  opacity: 0.7;
}

th,
td {
  padding: 8px;
  /* Reducido para mejor ajuste */
  border: 1px solid #ddd;
  text-align: left;
  font-family: 'Arial', sans-serif;
  font-size: 12px;
  /* Reducido para más ajuste en pantallas pequeñas */
}

th {
  cursor: pointer;
  background-color: #e74c3c;
  /* Rojo */
  color: white;
  font-weight: bold;
  border-bottom: 2px solid #c0392b;
  /* Rojo oscuro */
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
  font-size: 12px;
  /* Reducido para mejor ajuste */
  color: #555;
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 768px) {

  th,
  td {
    padding: 3px;
    /* Aún más reducido */
    font-size: 5px;
    /* Ajustado para pantallas pequeñas */
  }

  .arrow {
    font-size: 10px;
    /* Tamaño reducido para el icono de flecha */
  }

  table {
    font-size: 5px;
    /* Ajuste de fuente general */
    overflow-x: auto;
  }

  button {
    width: 100%;
    max-width: 200px;
    /* Botón ajustado para pantallas pequeñas */
    padding: 10px;
  }

  input {
    width: 100%;
    max-width: 300px;
    /* Ajuste para entradas más estrechas */
  }
}
</style>
