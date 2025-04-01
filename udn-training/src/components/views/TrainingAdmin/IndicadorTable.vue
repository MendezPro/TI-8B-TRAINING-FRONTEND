<template>
  <div>
    <table>
      <thead>
        <tr>
          <!-- Ajusta las columnas según los campos que quieras mostrar -->
          <th v-for="key in columns" :key="key" @click="sortBy(key)" :class="{ active: sortKey === key }">
            {{ capitalize(key) }}
            <span class="arrow" :class="sortColumns[key] > 0 ? 'asc' : 'dsc'"></span>
          </th>
          <th>Asignado a</th>
          <th>Operaciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in filteredEntries" :key="index">
          <td v-for="key in columns" :key="key">
            {{ entry[key] }}
          </td>
          <td>
            {{ entry.usuario_nombre ? entry.usuario_nombre : 'No asignado' }}
          </td>
          <td>
            <button @click="editIndicador(entry.id)">
              <i class="fa fa-pencil" style="color: #e74c3c;"></i> Editar
            </button>
            <button @click="deleteIndicador(entry.id)">
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
  name: 'IndicadorTable',
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
      sortKey: "",
      sortColumns: {}
    };
  },
  computed: {
    filteredEntries() {
      let entries = this.entries;
      const filterKey = this.filterKey ? this.filterKey.toLowerCase() : "";
      if (filterKey) {
        entries = entries.filter(entry => {
          return this.columns.some(key =>
            entry[key] && entry[key].toString().toLowerCase().includes(filterKey)
          );
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
    this.sortColumns = this.columns.reduce((acc, key) => {
      acc[key] = 1;
      return acc;
    }, {});
  },
  methods: {
    capitalize(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortColumns[key] = this.sortColumns[key] * -1;
    },
    editIndicador(id) {
      this.$router.push(`/indicadores/editar/${id}`);
    },
    async deleteIndicador(id) {
      const token = localStorage.getItem('access_token');
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás recuperar este indicador después de eliminarlo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/indicadores_nutricionales/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.$emit('entryDeleted', id);
          Swal.fire('¡Eliminado!', 'El indicador ha sido eliminado con éxito.', 'success');
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al eliminar el indicador.', 'error');
        }
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #e74c3c;
  color: white;
  cursor: pointer;
}

.arrow {
  margin-left: 10px;
  font-size: 12px;
}

.arrow.asc::after {
  content: '▲';
}

.arrow.dsc::after {
  content: '▼';
}
</style>
