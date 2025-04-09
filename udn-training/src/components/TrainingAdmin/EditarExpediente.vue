<template>
  <div class="expediente-form-wrapper">
    <h1>Editar Expediente Médico</h1>
    <form @submit.prevent="submitForm" class="expediente-form">
      <div class="form-group">
        <label for="curp">CURP:</label>
        <input id="curp" type="text" v-model="expediente.curp" required maxlength="18" />
      </div>

      <div class="form-group">
        <label for="fecha">Fecha de Última Evaluación:</label>
        <input id="fecha" type="date" v-model="expediente.fecha_ultima_de_evaluacion" required />
      </div>

      <div class="form-group form-full">
        <label for="antecedentes">Antecedentes Médicos:</label>
        <textarea id="antecedentes" v-model="expediente.antecedentes_medicos"></textarea>
      </div>

      <div class="form-group form-full">
        <label for="lesiones">Lesiones Previas:</label>
        <textarea id="lesiones" v-model="expediente.lesiones_previas"></textarea>
      </div>

      <div class="form-group">
        <label for="presion_sistolica">Presión Sistolica:</label>
        <input id="presion_sistolica" type="number" v-model="expediente.presion_sistolica" />
      </div>

      <div class="form-group">
        <label for="presion_diastolica">Presión Diastolica:</label>
        <input id="presion_diastolica" type="number" v-model="expediente.presion_diastolica" />
      </div>

      <div class="form-group">
        <label for="peso">Peso (kg):</label>
        <input id="peso" type="number" v-model="expediente.peso" min="0" step="any"/>
      </div>

      <div class="form-group">
        <label for="estatura">Estatura:</label>
        <input id="estatura" type="number" v-model="expediente.estatura" min="0" step="any" />
      </div>

      <div class="form-group">
        <label for="usuario_id">Usuario:</label>
        <select id="usuario_id" v-model="expediente.usuario_id" required>
          <option v-for="user in usuarios" :key="user.id" :value="user.id">
            {{ user.nombre_usuario }}
          </option>
        </select>
      </div>

      <div class="form-footer">
        <button type="submit" class="btn-guardar">Editar Expediente</button>
      </div>
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
.expediente-form-wrapper {
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

.expediente-form-wrapper h1 {
    color: #fff;
    text-align: center;
    font-size: 2rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
    margin-bottom: 20px;
}

.expediente-form {
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
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: border 0.3s ease, background 0.3s ease;
}

.form-group select {
    background-color: #333;
    color: #fff;
}

.form-group select option {
    background-color: #333;
    color: #fff;
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

/* Hace que ciertos campos abarquen la fila completa */
.form-full {
    grid-column: 1 / -1;
}

.form-footer {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    margin-top: 20px;
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