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

     <!-- Aquí se cargará el chatbot -->
    <div id="chatbot-container"></div> 
    </section>
            <!-- Sección de Estadísticas -->
            <section class="stats">
      <div class="stat">
        <h2>5+</h2>
        <p>Años de servicio</p>
      </div>
      <div class="stat">
        <h2>10+</h2>
        <p>Certificados</p>
      </div>
      <div class="stat">
        <h2>786+</h2>
        <p>Miembros fieles</p>
      </div>
      <div class="stat">
        <h2>95%</h2>
        <p>De resultados</p>
      </div>
    </section>
        <!-- Galería -->
        <section class="gallery">
      <h2>Nuestra Galería</h2>
      <CarouselWrapper />
    </section>
   <!-- ¿Por qué elegirnos? -->
   <section class="why-choose-us">
      <h2>¿Por qué elegirnos?</h2>
      <p>Entrenadores expertos, resultados reales y un ambiente que te motiva a superarte cada día.</p>
    </section>


    
  </div>
</template>

<script>
import CarouselWrapper from "@/components/CarouselWrapper.vue";

export default {
  components: {
    CarouselWrapper
  },
  mounted() {
    this.loadChatbot();
  },
  methods: {
    loadChatbot() {
      if (!document.getElementById("chatbase-script")) {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "chatbase-script"; // Evita cargarlo varias veces
        script.setAttribute("domain", "www.chatbase.co");
        document.body.appendChild(script);
      }
    }
  }
};
</script>

<style scoped>
/* Importando la fuente Roboto desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

/* Estilos generales */



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



/* ¿Por qué elegirnos? */
.why-choose-us {
  text-align: center;
  margin-top: 40px;
  padding: 30px;
  background-color: #000000;
  color: white;
}

.why-choose-us h2 {
  font-size: 2.5rem;
  color: red;
}

.why-choose-us p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.cta-btn {
  margin-top: 15px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.hero-image img {
  width: 300%; /* Ajusta este valor según el tamaño que prefieras */
  max-width: 500px; /* Opcional: Establece un límite máximo */
  height: auto; /* Mantiene la proporción */
}

.home-container {
  font-family: 'Roboto', sans-seriF; /* Cambié la fuente a Roboto */
  color: white;
  background: rgb(0, 0, 0); 
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
