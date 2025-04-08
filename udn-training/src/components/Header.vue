<template> 
  <header class="navbar">
    <div class="logo">
      <img src="@/assets/newl.png" alt="Gym Bulls" />
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
      <template v-if="!isLoggedIn">
        <button class="login-btn" @click="$router.push('/login')">Login</button>
        <button class="register-btn" @click="$router.push('/register')">Regístrate</button>
      </template>
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
      isLoggedIn: !!localStorage.getItem("access_token"),
      userRole: localStorage.getItem("rol") || "",
    };
  },
  created() {
    this.isLoggedIn = !!localStorage.getItem("access_token");
    this.userRole = localStorage.getItem("rol") || "";
    window.addEventListener('storage', this.syncAuthState);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncAuthState);
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("rol");
      localStorage.removeItem("usuario_id");
      this.isLoggedIn = false;
      this.userRole = "";
      this.$router.push("/");
    },
    syncAuthState() {
      this.isLoggedIn = !!localStorage.getItem("access_token");
      this.userRole = localStorage.getItem("rol") || "";
      if (this.isLoggedIn) {
        location.reload();
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.navbar {
  width: 100%; /* Asegura que se expanda completamente */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background: #111;
  border-radius: 35px 35px 35px 35px; /* para que combine con el footer si deseas */
  font-family: 'Poppins', sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  height: 100px;
  background-size: cover;
  /* Elimina max-width y margin */
  margin-bottom: 20px;
  margin-top: 20px;
}
.navbar .logo img {
  width: 110px;
  transition: transform 0.4s ease-in-out;
  
}

.navbar .logo img:hover {
  transform: scale(1.1) rotate(3deg);
}

.navbar nav ul {
  
  display: flex;
  list-style: none;
  gap: 20px;
}

.navbar nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: background 0.3s, transform 0.2s;
  
}

.navbar nav ul li a:hover, .navbar nav ul li a.router-link-exact-active {
  background: #ff4d4d;
  transform: scale(1.05);
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.auth-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
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

.register-btn, .logout-btn {
  background: #ff4d4d;
  color: white;
  box-shadow: 0px 4px 10px rgba(255, 77, 77, 0.4);
}

.register-btn:hover, .logout-btn:hover {
  background: #d93c3c;
  transform: scale(1.05);
}
</style>
