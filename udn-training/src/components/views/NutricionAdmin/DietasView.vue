<template>
  <div class="dietas-wrapper">
    <div class="dietas-header">
      <h1 class="dietas-title">Bienvenido a Dietas</h1>
      <button @click="$router.push('/dietas/nueva')" class="btn-agregar-dieta">
  <i class="fas fa-dumbbell"></i> Agregar Nueva Dieta
</button>
    </div>

    <div class="search-container">
      <i class="fas fa-search search-icon"></i>

      <input v-model="searchInput" placeholder="Buscar dietas..." class="search-input" />
    </div>

    <DietasTable 
      :entries="dataset" 
      :columns="dataColumns" 
      :filter-key="searchInput"
    />
  </div>
</template>
<script>
import axios from 'axios';
import DietasTable from '@/components/DietasTable.vue';

export default {
  name: 'DietasView',
  components: {
    DietasTable
  },
  data() {
    return {
      searchInput: "",
      dataColumns: ["ID", "Nombre", "Genero", "Altura", "Peso", "Objetivo","Ejercicios Recomendados", "Dias Ejercicio", "Calorias Diarias", "Observaciones","Estatus", "Fecha Registro"],
      dataset: []
    };
  },
  mounted() {
    const token = localStorage.getItem('access_token'); 
    axios.get('http://localhost:8000/api/dietas', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      this.dataset = response.data.map(dieta => ({
        ID: dieta.id,
        Nombre: dieta.nombre,
        Genero: dieta.genero,
        Altura: dieta.altura,
        Peso: dieta.peso,
        Objetivo: dieta.objetivo,
        Tipo_Ejercicios_Recomendados: dieta.tipo_ejercicios_recomendados,
        Dias_Ejercicio: dieta.dias_ejercicio,
        Calorias_Diarias: dieta.calorias_diarias,
        Observaciones: dieta.observaciones,
        Estatus: dieta.estatus ? 'Activo' : 'Inactivo',
        Fecha_Registro: dieta.fecha_registro,
        usuario: dieta.usuario 
      }));
    })
    .catch(error => {
      console.error("Error al cargar dietas:", error);
    });
  }
};
</script>

<style scoped>
.dietas-wrapper {
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

.dietas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  flex-wrap: wrap;
  margin-bottom: 25px;
}

.dietas-title {
  color: #ffffff;
  font-size: 2.2rem;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.6);
}

.btn-agregar-dieta {
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

.btn-agregar-dieta::before {
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

.btn-agregar-dieta:hover::before {
  opacity: 1;
}

.btn-agregar-dieta:hover {
  transform: scale(1.05);
}

/* Buscador */
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
