<template>
    <div>
        <h1>Editar Expediente Médico</h1>
        <form @submit.prevent="updateExpediente">
            <div>
                <label for="curp">CURP</label>
                <input v-model="expediente.curp" id="curp" type="text" required />
            </div>
            <div>
                <label for="antecedentes_medicos">Antecedentes Médicos</label>
                <textarea v-model="expediente.antecedentes_medicos" id="antecedentes_medicos" required></textarea>
            </div>
            <div>
                <label for="lesiones_previas">Lesiones Previas</label>
                <textarea v-model="expediente.lesiones_previas" id="lesiones_previas" required></textarea>
            </div>
            <div>
                <label for="presion_arterial">Presión Sistolica</label>
                <input v-model="expediente.presion_sistolica" id="presion_sistolica" type="text" required />
            </div>
            <div>
                <label for="presion_diastolica">Presión Diastolica</label>
                <input v-model="expediente.presion_diastolica" id="presion_diastolica" type="text" required />
            </div>
            <div>
                <label for="estatura">Estatura (cm)</label>
                <input v-model="expediente.estatura" id="estatura" type="number" required step="any"/>
            </div>
            <div>
                <label for="peso">Peso (kg)</label>
                <input v-model="expediente.peso" id="peso" type="number" required step="any" />
            </div>
            <button type="submit">Actualizar Expediente</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditarExpediente',
    data() {
        return {
            expediente: {
                curp: '',
                antecedentes_medicos: '',
                lesiones_previas: '',
                presion_sistolica: '',
                presion_diastolica: '',
                estatura: '',
                peso: ''
            }
        };
    },
    mounted() {
        const expedienteCurp = this.$route.params.curp;
        const token = localStorage.getItem('access_token'); // Obtener el token
        axios.get(`http://localhost:8000/api/expedientes/${expedienteCurp}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            this.expediente = { ...response.data };
        })
            .catch(() => {
                Swal.fire('Error', 'No se pudo cargar el expediente.', 'error');
            });
    },
    methods: {
        updateExpediente() {
            const token = localStorage.getItem('access_token'); // Obtener el token
            const expedienteCurp = this.$route.params.curp;
            axios.put(`http://localhost:8000/api/expedientes/${expedienteCurp}`, this.expediente, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Expediente actualizado',
                    text: 'El expediente se actualizó correctamente',
                    timer: 2000,
                    showConfirmButton: false
                });
                this.$router.push('/expediente');
            })
                .catch(() => {
                    Swal.fire('Error', 'No se pudo actualizar el expediente', 'error');
                });
        }

    }
};
</script>

<style scoped>
form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #ff0000;
}

label {
    display: block;
    margin-bottom: 8px;
    color: #d9534f;
}

input,
textarea,
select {
    width: 100%;
    padding: 10px;
    margin-bottom: 16px;
    border-radius: 4px;
    border: 1px solid #d9534f;
    background-color: #f2f2f2;
}

input:focus,
textarea:focus,
select:focus {
    outline: none;
    border-color: #c9302c;
}

button {
    padding: 10px 20px;
    background-color: #d9534f;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
}

button:hover {
    background-color: #c9302c;
}
</style>
