<template>
  <div class="home-container">
    <!-- Sección Hero -->
    <section class="hero">
      <div class="hero-text">
        <h1>Enciede tu <span class="highlight">Fuerza</span>, Con GymBulls</h1>
        <p>
          Gym Bulls, no solo es un gimnasio, es el cambio que necesitas para empezar de nuevo.
        </p>
        <div class="cta-buttons">
          <button class="cta-btn" @click="goToLogin">Entrena Ya</button>
        </div>
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
          <h2 class="titulo-galeria">Nuestra Galería</h2>

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
    },
    goToLogin() {
      this.$router.push("/login"); // Redirige a la página de login
    },
  }
};
</script>

<style scoped>
/* Importando la fuente Roboto desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
/* Estilos generales */

.titulo-galeria {
  font-family: 'Poppins', sans-serif;
  font-size: 8rem;
  font-weight: 700;
  color: transparent;
  background-image: linear-gradient(90deg, #000000, #b7b7b7);
  background-clip: text;
  -webkit-background-clip: text;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  margin-bottom: 2rem;
}

.titulo-galeria::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -5px;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #5b0505, #b7b7b7);
  transition: all 0.4s ease-in-out;
}

.titulo-galeria:hover {
  letter-spacing: 2px;
  background-image: linear-gradient(90deg, #000000, #a3a3a3);
}

.titulo-galeria:hover::after {
  width: 100%;
}

body {
  font-family: 'Roboto', sans-serif;
  color: white;
  background-color: #000;
  margin: 0;
  padding: 0;
}

.home-container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  max-width: 1250px; /* Ajusta el ancho según necesites */
  text-align: center;
}

/* Sección Hero */
.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px;
  background: url("@/assets/help.jpg") no-repeat center center/cover;
  border-radius: 50px;
  text-align: left;
  
}
.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 10px;
  
}
.hero-text .highlight {
  color: #ff914d;
  
}

.hero-text p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #989797;
}


.cta-buttons {
  display: flex;
  gap: 15px;
}

/* Botón principal */
.cta-btn {
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(90deg, #ff914d, #ff4d4d);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
}

/* Animación de hover */
.cta-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 300%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transform: skewX(-45deg);
  transition: all 0.5s ease-in-out;
}

.cta-btn:hover::before {
  left: 100%;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(255, 77, 77, 0.5);
}

/* Animación de clic */
.cta-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.hero-image img {
  max-width: 450px;
  width: 100%;
  height: auto;
}

/* Sección de estadísticas */
.stats {
  display: flex;
  justify-content: space-around;
  padding: 40px;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
  border-radius: 20px;
  margin-top: 30px;
}

.stat {
  text-align: center;
}

.stat h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff4d4d;
}

.stat p {
  font-size: 1.2rem;
  color: #ccc;
}
@media (max-width: 900px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-image img {
    max-width: 300px;
  }
}

/* Sección ¿Por qué elegirnos? */
.why-choose-us {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 5%;
  background-image: linear-gradient(to right, #434343 0%, black 100%);
  color: white;
  border-radius: 50px;
}

.why-content {
  display: flex;
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
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

.btn-secondary {
  padding: 12px 20px;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: 0.3s;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

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
  background: rgba(238, 238, 238, 0.1);
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
  .hero {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-image img {
    max-width: 300px;
  }
  
  .why-content {
    flex-direction: column;
    text-align: center;
  }

  .satisfied-customers {
    position: static;
    margin-top: 20px;
  }
}

</style>
