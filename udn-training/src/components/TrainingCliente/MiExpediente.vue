<template>
    <div class="expediente">
        <h2>Mi Expediente Médico</h2>
        <div v-if="expediente">
            <p><strong>Nombre:</strong> {{ expediente.nombre }} {{ expediente.apellido }}</p>
            <p><strong>Fecha de nacimiento:</strong> {{ expediente.fecha_nacimiento }}</p>
            <p><strong>Sexo:</strong> {{ expediente.sexo }}</p>
            <p><strong>CURP:</strong> {{ expediente.curp }}</p>
            <p><strong>Dirección:</strong> {{ expediente.direccion }}</p>
            <p><strong>Teléfono:</strong> {{ expediente.telefono }}</p>
            <p><strong>Correo electrónico:</strong> {{ expediente.correo_electronico }}</p>
            <p><strong>Fecha última de evaluación:</strong> {{ expediente.fecha_ultima_de_evaluacion }}</p>
            <p><strong>Antecedentes médicos:</strong> {{ expediente.antecedentes_medicos }}</p>
            <p><strong>Lesiones previas:</strong> {{ expediente.lesiones_previas }}</p>
            <p><strong>Presión arterial:</strong> {{ expediente.presion_arterial }}</p>
            <p><strong>Estatura:</strong> {{ expediente.estatura }} cm</p>
            <p><strong>Peso:</strong> {{ expediente.peso }} kg</p>
            <p><strong>Fecha de registro:</strong> {{ new Date(expediente.fecha_registro).toLocaleString() }}</p>
        </div><br><br>
        <div v-if="expediente">
            <!-- ✅ Mostrar gráfica de presión arterial -->
            <BloodPressureChart :expediente="expediente" />
        </div>
        <div v-else>
            <p v-if="expediente === null">🚨 Aún no tienes asignado un expediente médico.</p>
            <p v-else>Cargando expediente...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BloodPressureChart from '@/components/GraficaExpedientes.vue'
export default {
    name: 'MiExpediente',
    components: { BloodPressureChart },
    
    data() {
        return {
            expediente: null
        };
    },
    async mounted() {
        const token = localStorage.getItem('access_token'); // Token para autenticación
        const usuario_id = localStorage.getItem('usuario_id'); // Obtener el ID del usuario de localStorage
        try {
            const response = await axios.get(`http://localhost:8000/api/expedientes/usuario/${usuario_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.expediente = response.data;
        } catch (error) {
            console.error("Error al obtener el expediente:", error);
        }
    }
};
</script>

<style scoped>
.expediente {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    background-color: #fafafa;
}

h2 {
    color: #2c3e50;
    text-align: center;
}

p {
    margin: 8px 0;
    font-size: 16px;
    color: #34495e;
}

strong {
    color: #2c3e50;
}
</style>
