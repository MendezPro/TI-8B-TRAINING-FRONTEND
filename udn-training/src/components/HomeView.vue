<template>
  <div class="home-container">

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
  </div>
</template>


<style scoped>
/* Estilos generales */
.home-container {
  font-family: 'Arial', sans-serif;
  color: white;
  background-color: #000;
}

/* Barra de navegación */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: black;
}

.navbar .logo img {
  width: 120px;
}

.navbar nav ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

.navbar nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-buttons button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.login-btn {
  background: none;
  border: 1px solid white;
  color: white;
}

.register-btn {
  background: red;
  color: white;
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

.hero-text {
  max-width: 50%;
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

.stat {
  text-align: center;
}

.stat h2 {
  font-size: 2rem;
  color: red;
}

.stat p {
  font-size: 1rem;
  color: white;
}
</style>
