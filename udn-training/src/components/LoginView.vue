<template>
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Usuario" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'LoginForm',
    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
        async login() {
  try {
    console.log('Enviando datos:', this.username, this.password);  // Verifica los datos enviados
    const response = await axios.post('http://localhost:3000/login', {
      Nombre_Usuario: this.username,
      Contrasena: this.password
    });

    console.log('Respuesta del servidor:', response.data);  // Verifica la respuesta del servidor

    if (response.data.success) {
     console.log('Redirigiendo al dashboard');
      this.$router.push('/');
    } else {
      this.error = 'Usuario o contraseña incorrectos';
    }
  } catch (err) {
    console.error(err);
    this.error = 'Error al conectar con el servidor';
  }
}

    }
  };
  </script>
  
  <style scoped>
  .login-container {
    width: 320px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  input, button {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  