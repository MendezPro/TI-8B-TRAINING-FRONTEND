<template>
    <div class="expedientes-wrapper">
        <div class="expedientes-header">
            <h1 class="expedientes-title">Mi Expediente Médico</h1>
        </div>
        <table>
            <thead>
                <tr>
                    <th>CURP</th>
                    <th>Fecha Registro</th>
                    <th>Fecha Última Evaluación</th>
                    <th>Antecedentes Médicos</th>
                    <th>Lesiones Previas</th>
                    <th>Presión Sistólica</th>
                    <th>Presión Diastólica</th>
                    <th>Estatura</th>
                    <th>Peso</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="expediente in expedientes" :key="expediente.id">
                    <td>{{ expediente.curp }}</td>
                    <td>{{ new Date(expediente.fecha_registro).toLocaleString() }}</td>
                    <td>
                        <!-- Puede ser que la fecha de última evaluación no venga como fecha completa -->
                        {{ expediente.fecha_ultima_de_evaluacion ? new
                            Date(expediente.fecha_ultima_de_evaluacion).toLocaleDateString() : '---' }}
                    </td>
                    <td>{{ expediente.antecedentes_medicos }}</td>
                    <td>{{ expediente.lesiones_previas }}</td>
                    <td>{{ expediente.presion_sistolica }}</td>
                    <td>{{ expediente.presion_diastolica }}</td>
                    <td>{{ expediente.estatura }}</td>
                    <td>{{ expediente.peso }}</td>
                </tr>
            </tbody>
            <tbody v-if="expedientes.length === 0">
                <tr>
                    <td colspan="11" style="text-align: center; color: #e74c3c; font-weight: bold;">
                        🚨 Aún no tienes expedientes médicos asignados.
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MisExpedientes',
    data() {
        return {
            expedientes: []
        };
    },
    mounted() {
        const token = localStorage.getItem('access_token');
        const usuario_id = localStorage.getItem('usuario_id');

        if (!token || !usuario_id) {
            console.error("❌ No se encontró el token o el ID de usuario en localStorage.");
            return;
        }

        axios.get(`http://localhost:8000/api/expedientes/usuario/${usuario_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("✅ Expedientes cargados:", response.data);
                if (Array.isArray(response.data)) {
                    this.expedientes = response.data;
                } else {
                    console.warn("⚠️ La respuesta no tiene el formato esperado:", response.data);
                    this.expedientes = [];
                }
            })
            .catch(error => {
                console.error("❌ Error al cargar los expedientes:", error);
            });
    }
};
</script>

<style scoped>
.expedientes-wrapper {
    background-image: url('@/assets/frame1.png');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    border-radius: 35px;
    align-items: center;
}

.expedientes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1000px;
    flex-wrap: wrap;
    margin-bottom: 25px;
}

.expedientes-title {
    color: #ffffff;
    font-size: 2.2rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.18);
    overflow: hidden;
}

th,
td {
    padding: 12px;
    text-align: center;
    color: #ffffff;
    font-size: 13px;
    font-family: 'Segoe UI', sans-serif;
}

th {
    background: rgba(255, 255, 255, 0.08);
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
}

th:hover {
    background: rgba(255, 255, 255, 0.15);
}

td {
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: background 0.3s ease;
}

tr:hover td {
    background: rgba(255, 255, 255, 0.07);
}

@media (max-width: 768px) {

    th,
    td {
        font-size: 11px;
        padding: 8px;
    }
}
</style>