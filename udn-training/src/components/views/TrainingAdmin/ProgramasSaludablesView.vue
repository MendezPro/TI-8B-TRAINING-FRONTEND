<template>
    <div>
        <h1>Programas Saludables</h1>
        <button @click="$router.push('/programas_saludables/nuevo')">Agregar Nuevo Programa</button>
        <form id="search">
            <p>Buscar</p>
            <input v-model="searchInput" />
        </form>
        <ProgramasSaludablesTable :entries="dataset" :columns="dataColumns" :filter-key="searchInput"
            @programaDeleted="removePrograma" />
    </div>
</template>

<script>
import axios from 'axios';
import ProgramasSaludablesTable from '@/components/views/TrainingAdmin/ProgramasSaludablesTable.vue';

export default {
    name: 'ProgramasSaludablesView',
    components: {
        ProgramasSaludablesTable
    },
    data() {
        return {
            searchInput: "",
            dataColumns: ["id", "nombre", "descripcion", "fecha_inicio", "fecha_finalizacion", "id_dietas", "id_entrenador", "id_user", "fecha_registro"],
            dataset: []
        };
    },
    mounted() {
        const token = localStorage.getItem('access_token');
        axios.get('http://localhost:8000/api/programas_saludables', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.dataset = response.data;
            })
            .catch(error => {
                console.error("Error al cargar los programas:", error);
            });
    },
    methods: {
        removePrograma(id) {
            this.dataset = this.dataset.filter(item => item.id !== id);
        }
    }
};
</script>

<style scoped>
div {
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

form p {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}
input {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f1f1f1;
  font-size: 14px;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

input:focus {
  border-color:rgb(255, 25, 25); /* Verde para el foco */
  outline: none;
}

button {
  background-color:rgb(252, 9, 9);
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
}

button:hover {
  background-color: #2c6f29;
}
</style>