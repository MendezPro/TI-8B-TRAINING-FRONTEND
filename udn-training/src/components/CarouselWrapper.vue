<template>
  <div class="carousel">
    <!-- Navegación -->
    <div class="navigate">
      <div class="toggle-page left">
        <i @click="prevSlide" class="fas fa-chevron-left"></i>
      </div>

      <div class="toggle-page right">
        <i @click="nextSlide" class="fas fa-chevron-right"></i>
      </div>
    </div>

    <!-- Paginación -->
    <div class="pagination">
      <span
        v-for="(slide, index) in images"
        :key="index"
        :class="{ active: index + 1 === currentSlide }"
        @click="currentSlide = index + 1"
      ></span>
    </div>

    <!-- Mostrar imágenes -->
    <div class="slides">
      <div v-for="(image, index) in images" :key="index" class="slide">
        <img v-show="currentSlide === index + 1" :src="'data:image/jpeg;base64,' + image.imageBase64" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const currentSlide = ref(1);
    const images = ref([]);

    // Lógica para cambiar las imágenes
    const nextSlide = () => {
      if (currentSlide.value === images.value.length) {
        currentSlide.value = 1;
      } else {
        currentSlide.value += 1;
      }
    };

    const prevSlide = () => {
      if (currentSlide.value === 1) {
        currentSlide.value = images.value.length;
      } else {
        currentSlide.value -= 1;
      }
    };

    // Cargar las imágenes desde la API
    onMounted(async () => {
      try {
        const response = await fetch("http://localhost:8000/api/images/");
        const data = await response.json();
        images.value = data;
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    });

    return {
      currentSlide,
      nextSlide,
      prevSlide,
      images
    };
  }
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.navigate {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.toggle-page i {
  cursor: pointer;
  background-color: #6347c7;
  color: white;
  border-radius: 50%;
  padding: 10px;
  font-size: 20px;
}

.pagination {
  position: absolute;
  bottom: 10px;
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
}

span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  opacity: 0.5;
}

span.active {
  background-color: #6347c7;
  opacity: 1;
}

.slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}



.slide img {
  width: 100%;
  height: 100%;
  margin-left: 200px;
  object-fit: cover;
}
</style>
