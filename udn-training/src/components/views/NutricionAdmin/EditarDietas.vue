<template>
    <div class="form-container">
        <h1>Editar Dieta</h1>

        <form @submit.prevent="updateDieta">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input v-model="dieta.nombre" id="nombre" type="text" required />
            </div>
            <div class="form-group">
                <label for="genero">Género</label>
                <select v-model="dieta.genero" id="genero" required>
                    <option value="H">Hombre</option>
                    <option value="M">Mujer</option>
                    <option value="N/B">No Binario</option>
                </select>
            </div>
            <div class="form-group">
                <label for="altura">Altura (cm)</label>
                <input v-model="dieta.altura" id="altura" type="number" required />
            </div>
            <div class="form-group">
                <label for="peso">Peso (kg)</label>
                <input v-model="dieta.peso" id="peso" type="number" required />
            </div>
            <div class="form-group">
                <label for="objetivo">Objetivo</label>
                <select v-model="dieta.objetivo" id="objetivo" required>
                    <option value="Perdida de Peso">Pérdida de Peso</option>
                    <option value="Aumento de masa muscular">Aumento de masa muscular</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                </select>
            </div>
            <div class="form-group">
                <label for="tipo_ejercicio">Tipo de Ejercicio Recomendado</label>
                <select v-model="dieta.tipo_ejercicios_recomendados" id="tipo_ejercicio" required>
                    <option value="Cardio">Cardio</option>
                    <option value="Levantamiento de pesas">Levantamiento de pesas</option>
                    <option value="Ejercicios Tecnicos">Ejercicios Técnicos</option>
                </select>
            </div>
            <div class="form-group">
                <label for="dias_ejercicio">Días de Ejercicio</label>
                <select v-model="dieta.dias_ejercicio" id="dias_ejercicio" required>
                    <option value="1 dia a la semana">1 día a la semana</option>
                    <option value="2 dias a la semana">2 días a la semana</option>
                    <option value="3 dias a la semana">3 días a la semana</option>
                    <option value="4 dias a la semana">4 días a la semana</option>
                    <option value="5 dias a la semana">5 días a la semana</option>
                </select>
            </div>
            <div class="form-group">
                <label for="calorias">Calorías Diarias</label>
                <input v-model="dieta.calorias_diarias" id="calorias" type="number" required />
            </div>
            <div class="form-group">
                <label for="observaciones">Observaciones</label>
                <textarea v-model="dieta.observaciones" id="observaciones" rows="4"></textarea>
            </div>
            <div class="form-group">
                <label for="estatus">Estatus</label>
                <select v-model="dieta.estatus" id="estatus" required>
                    <option :value="true">Activo</option>
                    <option :value="false">Inactivo</option>
                </select>
            </div>
            <button type="submit" class="btn-submit">Actualizar Dieta</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditarDieta',
    data() {
        return {
            dieta: {
                nombre: '',
                genero: '',
                altura: '',
                peso: '',
                objetivo: '',
                tipo_ejercicios_recomendados: '',
                dias_ejercicio: '',
                calorias_diarias: '',
                observaciones: '',
                estatus: true
            }
        };
    },
    mounted() {
        const dietaId = this.$route.params.id;
        const token = localStorage.getItem('access_token');

        axios.get(`http://localhost:8000/api/dietas/${dietaId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.dieta = response.data;
            })
            .catch(error => {
                console.error("Error al cargar la dieta:", error);
                this.showAlert('Error al cargar la dieta', 'error');
            });
    },
    methods: {
        async updateDieta() {
            const dietaId = this.$route.params.id;
            const token = localStorage.getItem('access_token');

            try {
                await axios.put(`http://localhost:8000/api/dietas/${dietaId}`, this.dieta, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // ✅ Alerta de éxito con SweetAlert2
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Dieta actualizada correctamente',
                timer: 2000, // Duración de la alerta (opcional)
                timerProgressBar: true,
                showConfirmButton: false
            });
                this.$router.push('/dietas');
            } catch (error) {
                console.error("Error al actualizar la dieta:", error);
                
            // ❌ Alerta de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Error al actualizar la dieta',
                confirmButtonText: 'OK'
            });
            }
        },
    }
};
</script>

<style scoped>
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h1 {
    color: #c0392b;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 16px;
}

label {
    font-weight: bold;
    color: #333;
    display: block;
    margin-bottom: 6px;
}

input,
select,
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
}

textarea {
    resize: none;
}

.btn-submit {
    background-color: #c0392b;
    color: white;
    border: none;
    padding: 12px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    width: 100%;
    transition: background-color 0.3s;
}

.btn-submit:hover {
    background-color: #a93226;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #e74c3c;
    outline: none;
}

@media (max-width: 768px) {
    .form-container {
        padding: 15px;
    }

    h1 {
        font-size: 22px;
    }

    .btn-submit {
        font-size: 14px;
        padding: 10px;
    }
}
</style>