<template>
  <div class="login-page">
    <div class="login-container">
      <h2>Iniciar Sesión</h2>

      <div class="social-login">
        <button class="google-btn">
          <i class="fab fa-google"></i> Google
        </button>
        <button class="facebook-btn">
          <i class="fab fa-facebook-f"></i> Facebook
        </button>
      </div>

      <p class="or-divider">O</p>

      <form @submit.prevent="login">
        <div class="input-group">
          <label>Correo o Usuario</label>
          <input type="text" v-model="usuario" placeholder="Ingresa tu usuario o correo" required />
        </div>

        <div class="input-group">
          <label>Contraseña <span class="forgot-password">¿Olvidaste?</span></label>
          <input type="password" v-model="password" placeholder="Ingresa tu contraseña" required />
        </div>

        <button type="submit" class="login-btn">Iniciar sesión</button>

        <p v-if="error" class="error-message">{{ error }}</p>

        <p class="register-link">
          ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      usuario: "", // Se usa "usuario" en vez de "username"
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      if (!this.usuario || !this.password) {
        this.error = "Por favor, ingresa tus credenciales.";
        return;
      }

      try {
        console.log("📌 Enviando datos al servidor:", this.usuario, this.password);
        const response = await axios.post("http://localhost:3000/login", {
          usuario: this.usuario, // Enviamos "usuario" en vez de "Nombre_Usuario"
          Contrasena: this.password,
        });

        console.log("📌 Respuesta del servidor:", response.data);

        if (response.data.success) {
          console.log("✅ Redirigiendo al dashboard");
          this.$router.push("/");
        } else {
          this.error = "Usuario o contraseña incorrectos";
        }
      } catch (err) {
        console.error("❌ Error en la conexión con el servidor:", err);
        this.error = "Error al conectar con el servidor";
      }
    },
  },
};
</script>

<style scoped>
/* Fondo de la página */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("@/assets/fondologin.jpg") no-repeat center center;
  background-size: cover;
}

/* Contenedor del formulario */
.login-container {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  width: 380px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
}

h2 {
  color: white;
  font-size: 24px;
  margin-bottom: 15px;
}

/* Botones de redes sociales */
.social-login {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.social-login button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.google-btn {
  background: #db4437;
  color: white;
  margin-right: 5px;
}

.facebook-btn {
  background: #1877f2;
  color: white;
  margin-left: 5px;
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

/* Botón de inicio de sesión */
.login-btn {
  width: 100%;
  padding: 10px;
  background: red;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Mensaje de error */
.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}

/* Enlace de registro */
.register-link {
  margin-top: 10px;
  color: white;
  font-size: 14px;
}

.register-link a {
  color: red;
  font-weight: bold;
  text-decoration: none;
}
</style>
