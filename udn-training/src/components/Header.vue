<template>
  <header class="navbar">
    <div class="logo">
      <img src="@/assets/logo1.png" alt="Gym Bulls" />
    </div>
    <nav>
      <ul>
        <li><router-link to="/" active-class="active">Inicio</router-link></li>
        <li><router-link to="/dashboard" active-class="active">Dashboard</router-link></li>
        <template v-if="userRole === 'Administrador'">
          <li><router-link to="/dietas" active-class="active">Nutrición</router-link></li>
          <li><router-link to="/ejercicios" active-class="active">Training</router-link></li> 
        </template>
      </ul>
    </nav>

    <div class="auth-buttons">
      <!-- ✅ Mostrar solo si NO está logueado -->
      <template v-if="!isLoggedIn">
        <button class="login-btn" @click="$router.push('/login')">Login</button>
        <button class="register-btn" @click="$router.push('/register')">Regístrate</button>
      </template>

      <!-- ✅ Mostrar solo si está logueado -->
      <template v-else>
        <button class="logout-btn" @click="logout">Cerrar sesión</button>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isLoggedIn: !!localStorage.getItem("access_token"), // ✅ Revisar si hay token al cargar el componente
      userRole: localStorage.getItem("rol") || "", // ✅ Obtener el rol desde localStorage
    };
  },
  created() {
    // ✅ Revisar el token al cargar el componente
    this.isLoggedIn = !!localStorage.getItem("access_token");
    this.userRole = localStorage.getItem("rol") || "";

    // ✅ 🔥 Detectar cambios en el token automáticamente
    window.addEventListener('storage', this.syncAuthState);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncAuthState);
  },
  methods: {
    logout() {
      // ✅ Eliminar token y datos del usuario
      localStorage.removeItem("access_token");
      localStorage.removeItem("rol");
      localStorage.removeItem("usuario_id");

      // ✅ Actualizar estado y redirigir
      this.isLoggedIn = false;
      this.userRole = "";
      this.$router.push("/");
    },
    syncAuthState() {
      this.isLoggedIn = !!localStorage.getItem("access_token");
      this.userRole = localStorage.getItem("rol") || "";
      if (this.isLoggedIn) {
        location.reload(); // ✅ Recarga para actualizar automáticamente el botón
      }
    },
  },
};
</script>

<style scoped>
/* Importando la fuente Roboto desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

/* Barra de navegación */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: black;
  font-family: 'Roboto', sans-serif; /* Cambié la fuente a Roboto */
}

/* Logo */
.navbar .logo img {
  width: 120px;
  transition: transform 0.3s ease-in-out;
}

.navbar .logo img:hover {
  transform: scale(1.1);
}

/* Navegación */
.navbar nav ul {
  display: flex;
  list-style: none;
  gap: 25px;
}

.navbar nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  transition: color 0.3s;
}

.navbar nav ul li a:hover {
  color: red;
}

/* Subrayado animado del enlace activo */
.navbar nav ul li a::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 0;
  height: 2px;
  background-color: red;
  transition: all 0.3s ease-in-out;
  transform: translateX(-50%);
}

.navbar nav ul li a:hover::after,
.navbar nav ul li a.router-link-exact-active::after {
  width: 100%;
}

/* Botones de autenticación */
.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
}

.login-btn {
  background: none;
  border: 1px solid white;
  color: white;
}

.login-btn:hover {
  background: white;
  color: black;
}

.register-btn {
  background: red;
  color: white;
}

.register-btn:hover {
  background: darkred;
}

/* ✅ Estilo para el botón de cerrar sesión */
.logout-btn {
  padding: 10px 20px;
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: darkred;
}
</style>
