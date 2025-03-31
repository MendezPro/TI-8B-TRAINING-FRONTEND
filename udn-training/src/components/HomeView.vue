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
  <div class="why-content">
    <div class="text-content">
      <h2>¿Por qué elegirnos?</h2>
      <p>Entrenadores expertos, resultados reales y un ambiente que te motiva a superarte cada día.</p>
      <div class="buttons">
        
        <button class="btn-secondary">
          <i class="fas fa-play"></i> Mirar Demo
        </button>
      </div>
    </div>
    <div class="image-content">
      <img src="@/assets/pngwing.png" alt="Entrenadores" class="trainers-img" />
      <div class="satisfied-customers">
        <div class="customer-avatars">
          <img src="@/assets/Mask.png" alt="Customer 1" />
          <img src="@/assets/Mask1.png" alt="Customer 2" />
          <img src="@/assets/Mask2.png" alt="Customer 3" />
        </div>
        <p>10K+ Clientes Satisfechos</p>
      </div>
    </div>
  </div>
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



/* Sección ¿Por qué elegirnos? */
.why-choose-us {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  padding: 80px 5%;
  background-color: #000;
  color: white;
}

.why-content {
  display: flex;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.text-content {
  max-width: 500px;
}

.text-content h2 {
  font-size: 3rem;
  font-weight: bold;
}

.text-content p {
  font-size: 1.2rem;
  margin: 20px 0;
  color: #bbb;
}

/* Botones */
.buttons {
  display: flex;
  gap: 15px;
}


.btn-secondary {
  padding: 12px 20px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
}


.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Imagen de entrenadores */
.image-content {
  position: relative;
}

.trainers-img {
  width: 100%;
  max-width: 450px;
  height: auto;
  animation: fadeInUp 1s ease-in-out;
}

/* Clientes satisfechos */
.satisfied-customers {
  position: absolute;
  bottom: 20px;
  right: -10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 10px 15px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.customer-avatars {
  display: flex;
}

.customer-avatars img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: -10px;
  border: 2px solid #000;
}

/* Animación de entrada */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsivo */
@media (max-width: 900px) {
  .why-content {
    flex-direction: column;
    text-align: center;
  }

  .text-content {
    max-width: 100%;
  }

  .buttons {
    justify-content: center;
  }

  .satisfied-customers {
    position: static;
    margin-top: 20px;
  }
}
.hero-image img {
  width: 300%; /* Ajusta este valor según el tamaño que prefieras */
  max-width: 500px; /* Opcional: Establece un límite máximo */
  height: auto; /* Mantiene la proporción */
}

.home-container {
  font-family: 'Roboto', sans-seriF; /* Cambié la fuente a Roboto */
  color: white;
  background: #111; 
}
/* Sección Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  background: url("@/assets/help.jpg") no-repeat center center;
  background-size: cover;
  border-radius: 100px 0px 100px 0px;  
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
  padding: 12px 20px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
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
