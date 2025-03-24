<template>
  <table>
    <thead>
      <tr>
        <th>Completado</th> <!-- Nueva columna -->
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
  <td>
    <button v-if="!entry.completado" @click="markAsCompleted(entry.ID)">
      Marcar como Completado
    </button>
    <span v-else>Completado</span>
  </td>
  <td v-for="key in columns" :key="key">
    {{ entry[key] || 'N/A' }} <!-- Manejar valores nulos -->
  </td>
  <td>{{ entry.usuario ? entry.usuario.nombre_usuario : 'No asignado' }}</td>
  <td>
    <button @click="editEjercicio(entry.ID)">
      <i class="fa fa-pencil" style="color: #e74c3c;"></i> Editar
    </button>
    <button @click="deleteEjercicio(entry.ID)">
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
  name: 'EjerciciosTable',
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
    toggleCompleted(id, currentStatus) {
      // Enviar solicitud al backend para actualizar el estado de "completado"
      axios
        .put(`http://localhost:8000/api/ejercicios/${id}`, { completado: !currentStatus })
        .then(() => {
          // Actualizar el estado localmente
          const ejercicio = this.entries.find((entry) => entry.ID === id);
          if (ejercicio) ejercicio.completado = !currentStatus;
        })
        .catch((error) => {
          console.error("Error al actualizar el estado de completado:", error);
        });
    },
    markAsCompleted(id) {
    axios
      .put(`http://localhost:8000/api/ejercicios/${id}/completar`)
      .then(() => {
        const ejercicio = this.entries.find((entry) => entry.ID === id);
        if (ejercicio) ejercicio.completado = true;
        this.$emit('entryUpdated'); // Emitir evento para actualizar la tabla
      })
      .catch((error) => {
        console.error('Error al marcar como completado:', error);
      });
  },
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
          await axios.delete(`http://localhost:8000/api/ejercicios/${id}`);
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