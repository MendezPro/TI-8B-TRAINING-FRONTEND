<template>
    <div class="error-container">
      <h1 class="error-title">¡Oops! 😵</h1>
      <p class="error-message">Parece que esta sección aún no está disponible.</p>
      <router-link to="/" class="error-btn">Volver al Inicio</router-link>
    </div>
  </template>
  
  <style scoped>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: black;
    color: white;
  }
  
  .error-title {
    font-size: 5rem;
    color: red;
  }
  
  .error-message {
    font-size: 1.5rem;
    margin-top: 10px;
  }
  
  .error-btn {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: red;
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    border-radius: 5px;
    transition: background 0.3s;
  }
  
  .error-btn:hover {
    background-color: darkred;
  }
  </style>
  