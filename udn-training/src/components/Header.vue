<template> 
  <header class="navbar">
    <div class="logo">
      <img src="@/assets/logo1.png" alt="Gym Bulls" />
    </div>
    <nav>
      <ul>
        <li><router-link to="/" active-class="active">Inicio</router-link></li>
        <li><router-link to="/dashboard" active-class="active">Dashboard</router-link></li>
        <li><router-link to="/dietas" active-class="active">Nutrición</router-link></li>
        <li><router-link to="/ejercicios" active-class="active">Training</router-link></li>
      </ul>
    </nav>
    <div class="auth-buttons">
      <button class="login-btn" @click="$router.push('/login')">Login</button>
      <button class="register-btn" @click="$router.push('/register')">Regístrate</button>
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
</style>
```