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
                    <button @click="editUser(entry.ID)">
                        <i class="fa fa-pencil" style="color: #e74c3c;"></i> Editar
                    </button>
                    <button @click="deleteUser(entry.ID)">
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
    name: 'UsuariosTable',
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
        },
        editUser(id) {
            this.$router.push(`/usuarios/editar/${id}`);
        },
        async deleteUser(id) {
            const token = localStorage.getItem('access_token'); // Obtener el token del almacenamiento local
            // Usar SweetAlert2 para la confirmación
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás recuperar este usuario después de eliminarlo!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                try {
                    // Realizar la solicitud de eliminación
                    await axios.delete(`http://localhost:8000/api/usuarios/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}` // Incluir el token en el header
                        }
                    });

                    // Notificar que el usuario fue eliminado
                    this.$emit('userDeleted', id); 

                    // Mostrar confirmación
                    Swal.fire(
                        '¡Eliminado!',
                        'El usuario ha sido eliminado con éxito.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error al eliminar el usuario:", error.response?.data || error);
                    Swal.fire(
                        'Error',
                        'Hubo un problema al eliminar el usuario.',
                        'error'
                    );
                }
            }
        }

    }
};
</script>

<style scoped>
/* Estilos de tabla */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

th,
td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
    font-family: 'Arial', sans-serif;
    font-size: 12px;
}

th {
    background-color: #34495e;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

th.active {
    background-color: #2c3e50;
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
}

.arrow.asc::after {
    content: '▲';
}

.arrow.dsc::after {
    content: '▼';
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

@media (max-width: 768px) {

    th,
    td {
        padding: 8px;
        font-size: 10px;
    }

    .arrow {
        font-size: 10px;
    }

    table {
        font-size: 10px;
    }
}
</style>