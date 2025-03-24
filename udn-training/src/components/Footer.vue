<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img src="@/assets/logo1.png" alt="Gym Bulls" />
      </div>

      <div class="footer-social">
        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© 2024 Gym Bulls. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
name: "FooterComponent",
};
</script>

<style scoped>
/* Importando la fuente Roboto desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

/* Barra de pie de página */
.footer {
background-color: black;
color: white;
padding: 30px 0;
text-align: center;
font-family: 'Roboto', sans-serif; /* Cambié la fuente a Roboto */
}

.footer-container {
display: flex;
justify-content: space-between;
align-items: center;
max-width: 1200px;
margin: 0 auto;
flex-wrap: wrap;
padding: 10px 20px;
}

.footer-logo img {
width: 120px;
}

.footer-links ul {
list-style: none;
display: flex;
gap: 20px;
}

.footer-links ul li a {
text-decoration: none;
color: white;
font-weight: bold;
}

.footer-social a {
color: white;
font-size: 1.5rem;
margin: 0 10px;
transition: 0.3s;
}

.footer-social a:hover {
color: red;
}

.footer-bottom {
margin-top: 20px;
font-size: 0.9rem;
opacity: 0.7;
}
</style>
