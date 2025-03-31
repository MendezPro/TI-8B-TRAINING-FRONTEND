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

/* Importando la fuente moderna desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

/* Barra de navegación */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
  font-family: 'Poppins', sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
}

/* Logo */
.navbar .logo img {
  width: 130px;
  transition: transform 0.4s ease-in-out;
}

.navbar .logo img:hover {
  transform: scale(1.15) rotate(3deg);
}

/* Navegación */
.navbar nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

.navbar nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 16px;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease-in-out;
}

.navbar nav ul li a:hover {
  color: #ff4d4d;
}

/* Efecto de subrayado animado */
.navbar nav ul li a::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -5px;
  width: 0;
  height: 2px;
  background-color: #ff4d4d;
  transition: all 0.4s ease-in-out;
  transform: translateX(-50%);
}

.navbar nav ul li a:hover::after,
.navbar nav ul li a.router-link-exact-active::after {
  width: 100%;
}

/* Botones de autenticación */
.auth-buttons {
  display: flex;
  gap: 12px;
}

.auth-buttons button {
  padding: 12px 25px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
}

.login-btn {
  background: none;
  border: 2px solid white;
  color: white;
}

.login-btn:hover {
  background: white;
  color: black;
  transform: scale(1.05);
}

.register-btn {
  background: #ff4d4d;
  color: white;
  box-shadow: 0px 4px 10px rgba(255, 77, 77, 0.4);
}

.register-btn:hover {
  background: #d93c3c;
  transform: scale(1.05);
}

/* Estilo del botón de cierre de sesión */
.logout-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.logout-btn:hover {
  background: #d93c3c;
  transform: scale(1.05);
}

</style>
