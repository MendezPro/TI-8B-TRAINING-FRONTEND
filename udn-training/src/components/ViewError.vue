<template>
    <div class="error-container">
      <h1>Error 404</h1>
      <p>Ruta no encontrada o no tienes permisos para acceder.</p>
      <router-link to="/">Volver al inicio</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "ViewError",
  };
  </script>
  
  <style scoped>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #f8d7da;
    color: #721c24;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  a {
    color: #721c24;
    text-decoration: underline;
    font-size: 1.2rem;
  }
  </style>