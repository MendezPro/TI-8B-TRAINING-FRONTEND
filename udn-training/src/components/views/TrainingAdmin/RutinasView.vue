<template>
  <div>
    <h1>Rutinas</h1>
    <button @click="$router.push('/rutinas/nuevo')">Agregar Nueva Rutina</button>
    <form id="search">
      <p>Buscar</p>
      <input v-model="searchInput" placeholder="Buscar rutinas..." />
    </form>
    <RutinaTable
      :entries="dataset"
      :columns="dataColumns"
      :filter-key="searchInput"
      @entryDeleted="fetchRutinas"
    />
  </div>
</template>

<script>
import axios from "axios";
import RutinaTable from "@/components/views/TrainingAdmin/RutinaTable";

export default {
  name: "RutinasView",
  components: { RutinaTable },
  data() {
    return {
      searchInput: "",
      dataColumns: [
        "nombre",
        "user_id",
        "ejercicio_id",
        "objetivo_id",
        "duracion",
        "frecuencia",
        "fecha_inicio",
        "fecha_finalizacion",
        "fecha_creacion"
      ],
      dataset: []
    };
  },
  mounted() {
    this.fetchRutinas();
  },
  methods: {
    fetchRutinas() {
      const token = localStorage.getItem("access_token");
      axios
        .get("http://localhost:8000/api/rutinas", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          this.dataset = response.data;
        })
        .catch(error => {
          console.error("Error al cargar rutinas:", error);
        });
    }
  }
};
</script>

<style scoped>
div {
  padding: 20px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
form p {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}
input {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
}
button {
  background-color: #388e3c;
  color: white;
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
}
button:hover {
  background-color: #2c6f29;
}
</style>
