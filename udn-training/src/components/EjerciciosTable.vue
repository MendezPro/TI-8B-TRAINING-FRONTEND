<template>
  <div class="admin-container">
    <div class="table-container">
      <table class="ejercicios-admin-table">
        <thead>
          <tr>
            <th>Completado</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Video</th>
            <th>Tipo</th>
            <th>Estatus</th>
            <th>Dificultad</th>
            <th>Fecha Registro</th>
            <th>Recomendaciones</th>
            <th>Restricciones</th>
            <th>Usuario Asignado</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in entries" :key="index">
            <td>{{ entry.completado ? 'Sí' : 'No' }}</td>
            <td>{{ entry.ID }}</td>
            <td>{{ entry.Nombre }}</td>
            <td>{{ entry.Descripcion }}</td>
            <td>{{ entry.Video }}</td>
            <td>{{ entry.Tipo }}</td>
            <td>{{ entry.Estatus }}</td>
            <td>{{ entry.Dificultad }}</td>
            <td>{{ entry.Fecha_Registro }}</td>
            <td>{{ entry.Recomendaciones }}</td>
            <td>{{ entry.Restricciones }}</td>
            <td>{{ entry.usuario ? entry.usuario.nombre_usuario : 'No asignado' }}</td>
            <td>
              <button @click="editEjercicio(entry.ID)">Editar</button>
              <button @click="deleteEjercicio(entry.ID)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
      const token = localStorage.getItem('access_token');
      axios
        .put(`http://localhost:8000/api/ejercicios/${id}/completar`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
          const token = localStorage.getItem('access_token');
          await axios.delete(`http://localhost:8000/api/ejercicios/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
/* Contenedor de la tabla */
.table-container {
  margin: 20px auto;
  max-width: 1200px;
  overflow-x: auto;
}

/* Tabla de ejercicios */
.ejercicios-admin-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.ejercicios-admin-table th,
.ejercicios-admin-table td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

.ejercicios-admin-table th {
  background-color: #388e3c;
  color: white;
  font-weight: bold;
}

.ejercicios-admin-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.ejercicios-admin-table tr:hover {
  background-color: #f1f1f1;
}

/* Responsividad */
@media (max-width: 768px) {
  .ejercicios-admin-table th,
  .ejercicios-admin-table td {
    font-size: 12px;
    padding: 8px;
  }
}
</style>
