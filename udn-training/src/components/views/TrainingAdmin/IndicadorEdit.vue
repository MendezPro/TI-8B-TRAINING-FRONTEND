<template>
    <div class="form-container">
        <h1>Editar Indicador Nutricional</h1>
        <form v-if="indicador" @submit.prevent="submitForm">
            <div class="form-group">
                <label>Nombre:</label>
                <input type="text" v-model="indicador.nombre" required />
            </div>
            <div class="form-group">
                <label>Descripción:</label>
                <input type="text" v-model="indicador.descripcion" required />
            </div>
            <div class="form-group">
                <label>Unidad:</label>
                <input type="text" v-model="indicador.unidad" required />
            </div>
            <div class="form-group">
                <label>Valor de Referencia:</label>
                <input type="number" v-model="indicador.valor_referencia" required />
            </div>
            <div class="form-group">
                <label>Usuario ID:</label>
                <input type="text" v-model="indicador.usuario_id" placeholder="Opcional" />
            </div>
            <button type="submit">Actualizar Indicador</button>
        </form>
        <div v-else>
            Cargando...
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'IndicadorEdit',
    data() {
        return {
            indicador: null
        };
    },
    mounted() {
        const token = localStorage.getItem('access_token');
        const id = this.$route.params.id;
        console.log("ID recibido en el componente de edición:", id); // Verifica el ID recibido
        axios.get(`http://localhost:8000/api/indicadores_nutricionales/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.indicador = response.data;
            })
            .catch(error => {
                console.error("Error al cargar el indicador:", error);
            });
    },
    methods: {
        submitForm() {

            const token = localStorage.getItem('access_token');
            const id = this.$route.params.id;
            axios.put(`http://localhost:8000/api/indicadores_nutricionales/${id}`, this.indicador, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(() => {
                    Swal.fire('¡Éxito!', 'El indicador se actualizó correctamente.', 'success');
                    this.$router.push('/indicadores');
                })
                .catch(error => {
                    console.error("Error al actualizar el indicador:", error);
                    Swal.fire('Error', 'Hubo un problema al actualizar el indicador.', 'error');
                });
        }

    }
};
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 16px;
}

label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    background-color: #388e3c;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
}

button:hover {
    background-color: #2c6f29;
}
</style>