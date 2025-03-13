<template>
    <div class="register-page">
      <div class="register-container">
        <h2>Sign Up</h2>
  
        <p class="or-divider">Completa tus datos</p>
  
        <form @submit.prevent="register">
          <div class="input-group">
            <label>Nombre de Usuario</label>
            <input type="text" v-model="nombreUsuario" placeholder="Ingresa tu nombre de usuario" required />
          </div>
  
          <div class="input-group">
            <label>Email</label>
            <input type="email" v-model="correo" placeholder="Ingresa tu correo electrónico" required />
          </div>
  
          <div class="input-group">
            <label>Número Telefónico</label>
            <input type="tel" v-model="telefono" placeholder="Ingresa tu número móvil" />
          </div>
  
          <div class="input-group">
            <label>Contraseña</label>
            <input type="password" v-model="password" placeholder="Ingresa tu contraseña" required />
          </div>
  
          <button type="submit" class="register-btn">Sign Up</button>
          <button type="button" class="cancel-btn" @click="$router.push('/login')">Cancel</button>
  
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "RegisterView",
    data() {
      return {
        nombreUsuario: "",
        correo: "",
        telefono: "",
        password: "",
        error: "",
      };
    },
    methods: {
      async register() {
        if (!this.nombreUsuario || !this.correo || !this.password) {
          this.error = "Todos los campos son obligatorios.";
          return;
        }
  
        const userData = {
          nombreUsuario: this.nombreUsuario,
          correo: this.correo,
          telefono: this.telefono || null, // Si no tiene teléfono, se envía NULL
          password: this.password,
        };
  
        try {
          console.log("📌 Enviando datos al servidor:", userData);
          const response = await axios.post("http://localhost:3000/register", userData);
  
          console.log("📌 Respuesta del servidor:", response.data);
  
          if (response.data.success) {
            console.log("✅ Registro exitoso, redirigiendo...");
            this.$router.push("/login");
          } else {
            this.error = response.data.message;
          }
        } catch (err) {
          console.error("❌ Error en la conexión con el servidor:", err);
          this.error = "No se pudo conectar con el servidor. Asegúrate de que esté corriendo.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Fondo de la página */
  .register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url("@/assets/fondologin.jpg") no-repeat center center;
    background-size: cover;
  }
  
  /* Contenedor del formulario */
  .register-container {
    background: rgba(0, 0, 0, 0.8);
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    width: 400px;
    backdrop-filter: blur(10px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  }
  
  h2 {
    color: white;
    font-size: 24px;
    margin-bottom: 15px;
  }
  
  .or-divider {
    color: white;
    margin: 10px 0;
    font-size: 14px;
    opacity: 0.7;
  }
  
  /* Campos de entrada */
  .input-group {
    text-align: left;
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    color: white;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
  }
  
  /* Botones */
  .register-btn {
    width: 100%;
    padding: 10px;
    background: red;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .cancel-btn {
    width: 100%;
    padding: 10px;
    background: gray;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 5px;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  