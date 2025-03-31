<template>
  <div class="carousel-container">
    <div class="carousel" ref="carousel">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="carousel-item" 
        :class="{ 'active': index === activeIndex, 'prev': index === prevIndex, 'next': index === nextIndex }"
      >
        <img :src="'data:image/jpeg;base64,' + image.imageBase64" alt="Carousel Image" class="carousel-image" />
      </div>
    </div>
    <div class="indicators">
      <span 
        v-for="(image, index) in images" 
        :key="index" 
        class="indicator" 
        :class="{ 'active': index === activeIndex }"
        @click="goToSlide(index)"></span>
    </div>
    <button class="nav-button left" @click="prevSlide">&#10094;</button>
    <button class="nav-button right" @click="nextSlide">&#10095;</button>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const activeIndex = ref(0);
    const prevIndex = ref(null);
    const nextIndex = ref(null);
    const images = ref([]);
    let interval = null;

    const updateIndices = () => {
      prevIndex.value = activeIndex.value === 0 ? images.value.length - 1 : activeIndex.value - 1;
      nextIndex.value = activeIndex.value === images.value.length - 1 ? 0 : activeIndex.value + 1;
    };

    const nextSlide = () => {
      activeIndex.value = nextIndex.value;
      updateIndices();
    };

    const prevSlide = () => {
      activeIndex.value = prevIndex.value;
      updateIndices();
    };

    const goToSlide = (index) => {
      activeIndex.value = index;
      updateIndices();
    };

    const startAutoSlide = () => {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(interval);
    };

    onMounted(async () => {
      try {
        const response = await fetch("http://localhost:8000/api/images/");
        const data = await response.json();
        images.value = data;
        updateIndices();
        startAutoSlide();
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
      }
    });

    onUnmounted(() => {
      stopAutoSlide();
    });

    return {
      activeIndex,
      prevIndex,
      nextIndex,
      images,
      nextSlide,
      prevSlide,
      goToSlide,
    };
  }
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: auto;
  overflow: hidden;
}

.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 400px;
}

.carousel-item {
  position: absolute;
  width: 60%;
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: 0.5;
  transform: scale(0.85);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
}

.carousel-item.active {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

.carousel-item.prev {
  transform: translateX(-50%) scale(0.8);
  opacity: 0.4;
  z-index: 5;
}

.carousel-item.next {
  transform: translateX(50%) scale(0.8);
  opacity: 0.4;
  z-index: 5;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.indicators {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.indicator {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: #ddd;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.indicator.active {
  background-color: #7b61ff;
  transform: scale(1.2);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 24px;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 20;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>