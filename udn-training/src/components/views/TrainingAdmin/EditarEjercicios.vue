<template>
    <div>
        <h1>Editar Ejercicio</h1>
        <form @submit.prevent="updateEjercicio">
            <div>
                <label for="nombre">Nombre</label>
                <input v-model="ejercicio.nombre" id="nombre" type="text" required />
            </div>
            <div>
                <label for="descripcion">Descripción</label>
                <textarea v-model="ejercicio.descripcion" id="descripcion" required></textarea>
            </div>
            <div>
                <label for="video">Video</label>
                <input v-model="ejercicio.video" id="video" type="text" />
            </div>
            <div>
                <label for="tipo">Tipo</label>
                <select v-model="ejercicio.tipo" id="tipo">
                    <option value="Aerobico">Aeróbico</option>
                    <option value="Resistencia">Resistencia</option>
                    <option value="Flexibilidad">Flexibilidad</option>
                    <option value="Fuerza">Fuerza</option>
                </select>
            </div>
            <div>
                <label for="estatus">Estatus</label>
                <select v-model="ejercicio.estatus" id="estatus">
                    <option :value="true">Activo</option>
                    <option :value="false">Inactivo</option>
                </select>
            </div>
            <div>
                <label for="dificultad">Dificultad</label>
                <select v-model="ejercicio.dificultad" id="dificultad">
                    <option value="Basico">Básico</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                </select>
            </div>
            <div>
                <label for="recomendaciones">Recomendaciones</label>
                <textarea v-model="ejercicio.recomendaciones" id="recomendaciones"></textarea>
            </div>
            <div>
                <label for="restricciones">Restricciones</label>
                <textarea v-model="ejercicio.restricciones" id="restricciones"></textarea>
            </div>
            <button type="submit">Actualizar Ejercicio</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'EditarEjercicio',
    data() {
        return {
            ejercicio: {
                nombre: '',
                descripcion: '',
                video: '',
                tipo: 'Aerobico',
                estatus: true,
                dificultad: 'Basico',
                recomendaciones: '',
                restricciones: ''
            }
        };
    },
    mounted() {
        const ejercicioId = this.$route.params.id;
        axios.get(`http://localhost:8000/api/ejercicios/${ejercicioId}`)
            .then(response => {
                const data = response.data;
                console.log(data); // Verifica la respuesta de la API
                // Asigna los valores recibidos a la propiedad 'ejercicio'
                this.ejercicio = { ...data };
            })
            .catch(() => {
                Swal.fire('Error', 'No se pudo cargar el ejercicio.', 'error');
            });
    },
    methods: {
        updateEjercicio() {
            const ejercicioId = this.$route.params.id;
            axios.put(`http://localhost:8000/api/ejercicios/${ejercicioId}`, this.ejercicio)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Ejercicio actualizado',
                        text: 'El ejercicio se actualizó correctamente',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    this.$router.push('/ejercicios'); // Redirige al listado de ejercicios
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo actualizar el ejercicio'
                    });
                });
        }
    }
}
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
    color: #e74c3c;
    font-size: 28px;
    text-align: center;
    margin-bottom: 20px;
}

input, textarea, select {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #e74c3c;
    color: white;
    padding: 12px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    width: 100%;
    margin-top: 20px;
    cursor: pointer;
}

button:hover {
    background-color: #c0392b;
}
</style>
