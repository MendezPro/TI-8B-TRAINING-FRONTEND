<template>
    <header class="navbar">
      <div class="logo">
        <img src="@/assets/logo1.png" alt="Gym Bulls" />
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/services">Servicios</router-link></li>
          <li><router-link to="/contact">Contacto</router-link></li>
        </ul>
      </nav>
      <div class="auth-buttons">
        <button class="login-btn" @click="$router.push('/login')">Login</button>
        <button class="register-btn">Regístrate</button>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: "HeaderComponent",
  };
  </script>
  
  <style scoped>
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
  </style>
  