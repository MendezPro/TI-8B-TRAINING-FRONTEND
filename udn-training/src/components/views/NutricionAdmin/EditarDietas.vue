<template>
    <div class="dieta-form-wrapper">
        <h1>Editar Dieta</h1>
        <form @submit.prevent="submitForm" class="dieta-form">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input id="nombre" type="text" v-model="dieta.nombre" required />
            </div>

            <div class="form-group">
                <label for="objetivo">Objetivo:</label>
                <select id="objetivo" v-model="dieta.objetivo" required>
                    <option value="Perdida de Peso">Perdida de Peso</option>
                    <option value="Aumento de masa muscular">Aumento de masa muscular</option>
                    <option value="Mantenimiento">Mantenimiento</option>
                </select>
            </div>

            <div class="form-group">
                <label for="ejercicio">Tipo de Ejercicio:</label>
                <select id="ejercicio" v-model="dieta.tipo_ejercicios_recomendados" required>
                    <option value="Cardio">Cardio</option>
                    <option value="Levantamiento de pesas">Levantamiento de pesas</option>
                    <option value="Ejercicios Técnicos">Ejercicios Técnicos</option>
                </select>
            </div>

            <div class="form-group">
                <label for="dias">Días de Ejercicio:</label>
                <select id="dias" v-model="dieta.dias_ejercicio" required>
                    <option value="1 dia a la semana">1 día a la semana</option>
                    <option value="2 dias a la semana">2 días a la semana</option>
                    <option value="3 dias a la semana">3 días a la semana</option>
                    <option value="4 dias a la semana">4 días a la semana</option>
                    <option value="5 dias a la semana">5 días a la semana</option>
                </select>
            </div>

            <div class="form-group">
                <label for="calorias">Calorías Diarias:</label>
                <input id="calorias" type="number" v-model="dieta.calorias_diarias" required />
            </div>

            <div class="form-group form-full">
                <label for="observaciones">Observaciones:</label>
                <textarea id="observaciones" v-model="dieta.observaciones"></textarea>
            </div>

            <div class="form-footer">
                <div class="estatus-group">
                    <label for="estatus">Estatus:</label>
                    <input id="estatus" type="checkbox" v-model="dieta.estatus" />
                    <span>{{ dieta.estatus ? 'Activo' : 'Inactivo' }}</span>
                </div>
                <button type="submit" class="btn-guardar">Editar Dieta</button>
            </div>
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
                console.error("Error al cargar la dieta:", error);
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Error al cargar la dieta',
                    confirmButtonText: 'OK'
                });
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
.dieta-form-wrapper {
    background-image: url('@/assets/frame1.png');
    background-size: cover;
    background-position: center;
    padding: 40px;
    border-radius: 35px;
    max-width: 600px;
    margin: 40px auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}

.dieta-form-wrapper h1 {
    color: #fff;
    text-align: center;
    font-size: 2rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
}

.dieta-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    color: #fff;
    font-weight: 600;
    margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: #fcf5f5;
    font-size: 1rem;
    outline: none;
    transition: border 0.3s ease, background 0.3s ease;
}
.dieta-form select option {
    background-color: #333; /* Mismo color de fondo para las opciones */
    color: #fff; /* Texto en blanco */
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #ff4d4d;
    background: rgba(255, 255, 255, 0.2);
}

textarea {
    resize: vertical;
    min-height: 80px;
}

/* Abarca la fila completa */
.form-full {
    grid-column: 1 / -1;
}

.form-footer {
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    flex-wrap: wrap;
}

.estatus-group {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-weight: 600;
}

.btn-guardar {
    background: linear-gradient(145deg, #f79f43, #f27e1b);
    border: none;
    padding: 12px 24px;
    color: #fff;
    font-size: 1rem;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(255, 130, 0, 0.3);
    transition: transform 0.3s ease, background 0.3s ease;
    margin-top: 10px;
}

.btn-guardar:hover {
    transform: scale(1.05);
    background: linear-gradient(145deg, #f8a545, #f56b00);
}
</style>