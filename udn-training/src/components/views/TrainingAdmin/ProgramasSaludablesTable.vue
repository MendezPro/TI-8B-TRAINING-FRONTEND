<template>
    <table>
        <thead>
            <tr>
                <th v-for="key in columns" :key="key">{{ key.toUpperCase() }}</th>
                <th>Operaciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(entry, index) in filteredEntries" :key="index">
                <td v-for="key in columns" :key="key">{{ entry[key] }}</td>
                <td>
                    <button @click="editPrograma(entry.id)">Editar</button>
                    <button @click="deletePrograma(entry.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    name: 'ProgramasSaludablesTable',
    props: {
        entries: Array,
        columns: Array,
        filterKey: String
    },
    computed: {
        filteredEntries() {
            if (!this.filterKey) return this.entries;
            return this.entries.filter(entry =>
                this.columns.some(key =>
                    String(entry[key]).toLowerCase().includes(this.filterKey.toLowerCase())
                )
            );
        }
    },
    methods: {
        editPrograma(id) {
            this.$router.push(`/programas_saludables/editar/${id}`);
        },
        async deletePrograma(id) {
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
                    await axios.delete(`http://localhost:8000/api/programas_saludables/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    this.$emit('programaDeleted', id);
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El programa fue eliminado correctamente.',
                        icon: 'success'
                    });
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar el programa.',
                        icon: 'error'
                    });
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
