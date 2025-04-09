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
/* Tabla con efecto de transparencia y backdrop */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.18);
  overflow: hidden;
}

th, td {
  padding: 12px;
  text-align: center;
  color: #ffffff;
  font-size: 13px;
  font-family: 'Segoe UI', sans-serif;
}

th {
  background: rgba(255, 255, 255, 0.08);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

th:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

th.active {
  background-color: rgba(255, 255, 255, 0.15);
}

td {
  background-color: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: background 0.3s ease;
}

tr:hover td {
  background-color: rgba(255, 255, 255, 0.07);
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

button {
  padding: 6px 12px;
  font-size: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  background: rgba(231, 76, 60, 0.85);
  color: white;
  margin: 0 4px;
  transition: transform 0.2s ease, background 0.3s;
}

button:hover {
  background: rgba(192, 57, 43, 0.9);
  transform: scale(1.05);
}

@media (max-width: 768px) {
  th, td {
    font-size: 11px;
    padding: 8px;
  }
  button {
    font-size: 10px;
    padding: 5px 8px;
  }
}
</style>
