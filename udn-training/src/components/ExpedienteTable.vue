<template>
  <table>
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
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in filteredEntries" :key="index">
        <td v-for="key in columns" :key="key">
          {{ entry[key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ExpedienteTable',
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

      // Filtrar resultados
      if (filterKey) {
        entries = entries.filter(entry =>
          Object.keys(entry).some(key =>
            String(entry[key]).toLowerCase().includes(filterKey)
          )
        );
      }

      // Ordenar resultados
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
    overflow-x: auto; /* Permite desplazamiento horizontal en pantallas pequeñas */
  }

  th, td {
    padding: 8px;  /* Reducido para mejor ajuste */
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
      padding: 3px; /* Aún más reducido */
      font-size: 5px; /* Ajustado para pantallas pequeñas */
    }

    .arrow {
      font-size: 10px; /* Tamaño reducido para el icono de flecha */
    }

    table {
      font-size: 5px; /* Ajuste de fuente general */
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
