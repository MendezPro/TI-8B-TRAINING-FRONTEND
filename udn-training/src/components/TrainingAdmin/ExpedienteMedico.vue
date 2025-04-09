<template>
  <div class="expedientes-wrapper">
    <div class="expedientes-header">
      <h1 class="expedientes-title">Expedientes Médicos</h1>
      <button @click="$router.push('/expedientes/nuevo')" class="btn-agregar-expediente">
        <i class="fas fa-folder-plus"></i> Agregar Nuevo Expediente
      </button>
    </div>

    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input v-model="searchInput" placeholder="Buscar expedientes..." class="search-input" />
    </div>

    <ExpedienteTable 
      :entries="dataset" 
      :columns="dataColumns" 
      :filter-key="searchInput"
    />
  </div>
</template>

  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import ExpedienteTable from '@/components/ExpedienteTable.vue';
  
  export default {
    name: 'ExpedienteView',
    components: {
      ExpedienteTable
    },
    data() {
      return {
        searchInput: "",
        dataColumns: [
          "curp", "fecha_registro", "fecha_ultima_de_evaluacion", "antecedentes_medicos","lesiones_previas", "presion_sistolica", "presion_diastolica",
          "estatura", "peso"
        ],
        dataset: []
      };
    },
    mounted() {
      const token = localStorage.getItem('access_token'); 
      axios.get('http://localhost:8000/api/expedientes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
        .then(response => {
          this.dataset = response.data.map(exp => ({
            _id: exp._id,
            curp: exp.curp,
            fecha_registro: exp.fecha_registro,
            fecha_ultima_de_evaluacion: exp.fecha_ultima_de_evaluacion,
            antecedentes_medicos: exp.antecedentes_medicos || "N/A",
            lesiones_previas: exp.lesiones_previas || "N/A",
            presion_sistolica: exp.presion_sistolica || "N/A",
            presion_diastolica: exp.presion_diastolica || "N/A",
            estatura: exp.estatura || "N/A",
            peso: exp.peso || "N/A",
            usuario_id: exp.usuario_id
          }));
        })
        .catch(error => {
          Swal.fire('Error', 'Hubo un problema al cargar el expediente.', 'error');
          console.error("Error al cargar expedientes:", error);
        });
    }
  };
  </script>
  
  <style scoped>
  /* Reutilizamos la base de estilos de Dietas */
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
  
  .btn-agregar-expediente {
    background: linear-gradient(145deg, #f79f43, #f27e1b);
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    border: none;
    border-radius: 50px;
    padding: 12px 26px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(255, 130, 0, 0.3);
    transition: all 0.3s ease-in-out;
    position: relative;
    z-index: 1;
  }
  
  .btn-agregar-expediente::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #f8a545, #f56b00);
    border-radius: 50px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .btn-agregar-expediente:hover::before {
    opacity: 1;
  }
  
  .btn-agregar-expediente:hover {
    transform: scale(1.05);
  }
  
  /* Buscador (se reutiliza el estilo de la vista Dietas) */
  .search-container {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    padding: 12px 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    width: 100%;
    max-width: 500px;
    margin-bottom: 20px;
  }
  
  .search-container:hover {
    box-shadow: 0 6px 25px rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  .search-icon {
    font-size: 1.5rem;
    color: #fff;
    margin-right: 10px;
  }
  
  .search-input {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    font-size: 16px;
    width: 100%;
    font-family: inherit;
    transition: all 0.3s ease;
  }
  
  .search-input::placeholder {
    color: #ccc;
    opacity: 0.7;
  }
  </style>