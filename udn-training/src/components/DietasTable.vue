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
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    cursor: pointer;
    background-color: #42b983;
    color: white;
  }
  
  th.active {
    background-color: #2c8c66;
  }
  
  .arrow.asc::after {
    content: '▲';
  }
  
  .arrow.dsc::after {
    content: '▼';
  }
  </style>
  