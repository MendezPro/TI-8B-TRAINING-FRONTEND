<template>
<div class="indicador-form-wrapper">
  <h1>Editar Indicador Nutricional</h1>
  <form @submit.prevent="submitForm" class="indicador-form">
    <div class="form-group">
          <label for="altura">Altura (m):</label>
          <input id="altura" type="number" step="0.01" v-model="indicador.altura" required />
        </div>
        <div class="form-group">
          <label for="peso">Peso (kg):</label>
          <input id="peso" type="number" step="0.01" v-model="indicador.peso" required />
        </div>
        <div class="form-group">
          <label for="imc">IMC:</label>
          <input id="imc" type="number" step="0.01" v-model="indicador.imc" readonly />
        </div>
        <div class="form-group">
          <label for="porcentaje_grasa">Porcentaje de Grasa:</label>
          <input id="porcentaje_grasa" type="number" step="0.01" v-model="indicador.porcentaje_grasa" required />
        </div>
        <div class="form-group">
          <label for="nivel_actividad">Nivel de Actividad:</label>
          <select id="nivel_actividad" v-model="indicador.nivel_actividad" required>
            <option value="Sedentario">Sedentario</option>
            <option value="Ligero">Ligero</option>
            <option value="Moderado">Moderado</option>
            <option value="Activo">Activo</option>
            <option value="Muy_Activo">Muy Activo</option>
          </select>
        </div>
        <div class="form-footer">
          <button type="submit" class="btn-guardar">Actualizar Indicador</button>
        </div>
      </form>
    </div>
  </template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'IndicadorEdit',
    data() {
        return {
          indicador: {
      altura: 0,
      peso: 0,
      imc: 0,
      porcentaje_grasa: 0,
      nivel_actividad: ''
    }
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
    }, watch: {
        // Calcula automáticamente el IMC cuando cambian el peso o la altura
        'indicador.altura': 'calculateIMC',
        'indicador.peso': 'calculateIMC'
    },
    methods: {
        calculateIMC() {
            if (this.indicador.altura > 0 && this.indicador.peso > 0) {
                this.indicador.imc = (this.indicador.peso / (this.indicador.altura ** 2)).toFixed(2);
            } else {
                this.indicador.imc = 0;
            }
        },
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
.indicador-form-wrapper {
  background-image: url('@/assets/frame1.png');
  background-size: cover;
  background-position: center;
  padding: 40px;
  border-radius: 35px;
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.indicador-form-wrapper h1 {
  color: #fff;
  text-align: center;
  font-size: 2rem;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
  margin-bottom: 20px;
}

.indicador-form {
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
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px;
  background: rgba(255,255,255,0.1);
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
  background: rgba(255,255,255,0.2);
}

textarea {
  resize: vertical;
  min-height: 80px;
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
  box-shadow: 0 4px 12px rgba(255,130,0,0.3);
  transition: transform 0.3s ease, background 0.3s ease;
  margin-top: 10px;
}

.btn-guardar:hover {
  transform: scale(1.05);
  background: linear-gradient(145deg, #f8a545, #f56b00);
}
</style>