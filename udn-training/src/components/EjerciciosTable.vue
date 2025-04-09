<template>
  <div class="table-container">
    <table class="ejercicios-admin-table">
      <thead>
        <tr>
          <th
            v-for="key in columns"
            :key="key"
            @click="sortBy(key)"
            :class="{ active: sortKey === key }"
          >
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
            <button @click="editEjercicio(entry.ID)">
              <i class="fa fa-pencil"></i> Editar
            </button>
            <button @click="deleteEjercicio(entry.ID)">
              <i class="fa fa-trash"></i> Eliminar
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
  name: "EjerciciosTable",
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
      let entries = this.entries || [];
      const filterKey = this.filterKey ? this.filterKey.toLowerCase() : "";
      if (filterKey) {
        entries = entries.filter(entry =>
          this.columns.some(key =>
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
    editEjercicio(id) {
      this.$router.push(`/ejercicios/editar/${id}`);
    },
    async deleteEjercicio(id) {
      const token = localStorage.getItem('access_token');
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás recuperar este ejercicio después de eliminarlo!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/ejercicios/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.$emit('entryDeleted', id);
          Swal.fire('¡Eliminado!', 'El ejercicio ha sido eliminado con éxito.', 'success');
          this.$router.push(`/ejercicios`);
        } catch (error) {
          Swal.fire('Error', 'Hubo un problema al eliminar el ejercicio.', 'error');
        }
      }
    }
  }
};
</script>

<style scoped>
.table-container {
  margin: 20px auto;
  max-width: 1200px;
  overflow-x: auto;
}
.ejercicios-admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: rgba(255,255,255,0.05);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.18);
  overflow: hidden;
}
.ejercicios-admin-table th,
.ejercicios-admin-table td {
  padding: 12px;
  text-align: center;
  color: #ffffff;
  font-size: 13px;
  font-family: 'Segoe UI', sans-serif;
}
.ejercicios-admin-table th {
  background: rgba(255,255,255,0.08);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}
.ejercicios-admin-table th:hover {
  background-color: rgba(255,255,255,0.15);
}
.ejercicios-admin-table th.active {
  background-color: rgba(255,255,255,0.15);
}
.ejercicios-admin-table td {
  background-color: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  transition: background 0.3s ease;
}
.ejercicios-admin-table tr:hover td {
  background-color: rgba(255,255,255,0.07);
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
  background: rgba(231,76,60,0.85);
  color: white;
  margin: 0 4px;
  transition: transform 0.2s ease, background 0.3s;
}
button:hover {
  background: rgba(192,57,43,0.9);
  transform: scale(1.05);
}
@media (max-width: 768px) {
  .ejercicios-admin-table th,
  .ejercicios-admin-table td {
    font-size: 11px;
    padding: 8px;
  }
  button {
    font-size: 10px;
    padding: 5px 8px;
  }
}
</style>
