<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey === key }">
          {{ capitalize(key) }}
          <span class="arrow" :class="sortColumns[key] > 0 ? 'asc' : 'dsc'"></span>
        </th>
        <th>Operaciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in filteredEntries" :key="index">
        <td v-for="key in columns" :key="key">
          {{ entry[key] }}
        </td>
        <td>
          <button @click="editDieta(entry.ID)">
            <i class="fa fa-pencil" style="color: #e74c3c;"></i> Editar
          </button>
          <button @click="deleteDieta(entry.ID)">
            <i class="fa fa-trash" style="color: #c0392b;"></i> Eliminar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
  name: 'DietasTable',
  props: {
    entries: Array,
    columns: Array,
    filterKey: String
  },
  data() {
    return {
      sortKey: "",
      sortColumns: this.columns.reduce((acc, key) => {
        acc[key] = 1;
        return acc;
      }, {})
    };
  },
  computed: {
    filteredEntries() {
      let entries = this.entries || [];
      const filterKey = this.filterKey?.toLowerCase();

      if (filterKey) {
        entries = entries.filter(entry =>
          Object.keys(entry).some(key =>
            String(entry[key]).toLowerCase().includes(filterKey)
          )
        );
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
  methods: {
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortColumns[key] = this.sortColumns[key] * -1;
    },
    editDieta(id) {
      this.$router.push(`/dietas/editar/${id}`);
    },
    async deleteDieta(id) {
      const token = localStorage.getItem('access_token');

      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#7f8c8d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/dietas/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          this.$emit('dietaDeleted', id);

          // Mostrar alerta de éxito
          Swal.fire({
            title: '¡Eliminado!',
            text: 'La dieta ha sido eliminada correctamente.',
            icon: 'success',
            confirmButtonColor: '#e74c3c'
          });

        } catch (error) {
          console.error("Error al eliminar la dieta:", error.response?.data || error);

          // Mostrar alerta de error
          Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema al eliminar la dieta.',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
          });
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

/* Responsividad para pantallas pequeñas */
@media (max-width: 768px) {

  th,
  td {
    padding: 16px;
    /* Aún más reducido */
    font-size: 10px;
    /* Ajustado para pantallas pequeñas */
  }

  .arrow {
    font-size: 10px;
    /* Tamaño reducido para el icono de flecha */
  }

  table {
    font-size: 10px;
    /* Ajuste de fuente general */
  }
}
</style>