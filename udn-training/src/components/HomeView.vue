<template>
  <div class="home-container">
    <!-- Sección Hero -->
    <section class="hero">
      <div class="hero-text">
        <h1>Fortalece tu cuerpo con profesionales</h1>
        <p>
          ¡Entrena como un profesional! Mejora tu salud y resistencia con nuestros programas de Training, Gym y más.
        </p>
        <button class="cta-btn">¡Entrena ya!</button>
      </div>
      <div class="hero-image">
        <img src="@/assets/logo1.png" alt="Entrenamiento" />
      </div>
    </section>

    <!-- Galería -->
    <section class="gallery">
      <h2>Nuestra Galería</h2>
      <CarouselWrapper />
    </section>
  </div>
</template>

<script>
import CarouselWrapper from "@/components/CarouselWrapper.vue";

export default {
  components: {
    CarouselWrapper
  }
};
</script>

<style scoped>
/* Estilos generales */
.home-container {
  font-family: "Arial", sans-serif;
  color: white;
  background-color: #000;
}

/* Sección Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background: url("@/assets/fondo.jpg") no-repeat center center;
  background-size: cover;
}

.hero-text h1 {
  font-size: 3rem;
  font-weight: bold;
}

.hero-text p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.cta-btn {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: red;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

/* Sección de estadísticas */
.stats {
  display: flex;
  justify-content: space-around;
  padding: 30px;
  background-color: #111;
}

.stat h2 {
  font-size: 2rem;
  color: red;
}

.stat p {
  font-size: 1rem;
  color: white;
}

/* Galería */
.gallery {
  margin-top: 40px;
  padding: 30px;
  background-color: #000;
  color: white;
}

.gallery h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: red;
}

.carousel {
  margin-top: 20px;
  width: 100%;
  height: 400px;
}

.slide-info {
  width: 100%;
  height: 100%;
}

.slide-info img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Botones de navegación */
.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.prev-btn,
.next-btn {
  padding: 10px 20px;
  background-color: red;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.prev-btn:hover,
.next-btn:hover {
  background-color: #ff4d4d;
}
</style>
