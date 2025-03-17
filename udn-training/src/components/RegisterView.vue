<template>
  <div class="register-page">
    <div class="register-container">
      <h2>Regístrate</h2>

      <p class="or-divider">Completa tus datos</p>

      <form @submit.prevent="register">
        <div class="input-group">
          <label>Nombre de Usuario</label>
          <input
            type="text"
            v-model="nombreUsuario"
            placeholder="Ingresa tu nombre de usuario"
            required
          />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input
            type="email"
            v-model="correo"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        <div class="input-group">
          <label>Número Telefónico</label>
          <input
            type="tel"
            v-model="telefono"
            placeholder="Ingresa tu número móvil"
          />
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            v-model="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <button type="submit" class="register-btn">Regístrate</button>
        <button
          type="button"
          class="cancel-btn"
          @click="$router.push('/login')"
        >
          Cancelar
        </button>

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
        nombre_usuario: this.nombreUsuario,
        correo_electronico: this.correo,
        contrasena: this.password,
        numero_telefonico_movil: this.telefono || null,
        estatus: "Activo",
      };

      try {
        const response = await axios.post("http://localhost:8000/api/usuarios/", userData);

        if (response.status === 201 || response.status === 200) {
          // Registro exitoso, redirigimos al login
          this.$router.push("/login");
        } else {
          this.error = response.data?.detail || "Error al registrar el usuario.";
        }
      } catch (err) {
        if (err.response) {
          this.error = err.response.data?.detail || "Error en el servidor al registrar.";
        } else {
          this.error = "No se pudo conectar con el servidor.";
        }
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
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(50, 50, 50, 0.6));
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  width: 400px;
  backdrop-filter: blur(15px);
  box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  letter-spacing: 0.5px;
  transition: all 0.3s ease-in-out;
  }

  .register-container:hover {
  transform: translateY(-5px); /* Mueve la card en vez de escalarla */
  box-shadow: 0px 6px 20px rgba(255, 255, 255, 0.3);
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
  