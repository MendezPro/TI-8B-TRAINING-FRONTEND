<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img src="@/assets/dev.png" alt="Gym Bulls" />
      </div>

      <div class="footer-social">
        <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
        <a href="#" target="_blank"><i class="fab fa-youtube"></i></a>
        <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="#" target="_blank"><i class="fab fa-google-plus-g"></i></a>
        <a href="#" target="_blank"><i class="fab fa-pinterest"></i></a>
        <a href="#" target="_blank"><i class="fas fa-rss"></i></a>
      </div>
    </div>

    <div class="footer-links">
      <ul>
        <li><a href="#">ABOUT US</a></li>
        <li><a href="#">CONTACT US</a></li>
        <li><a href="#">HELP</a></li>
        <li><a href="#">PRIVACY POLICY</a></li>
        <li><a href="#">DISCLAIMER</a></li>
      </ul>
    </div>

    <div class="footer-bottom">
      <p>© 2025 Gym Bulls. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.footer {
  background-color: #111;
  backdrop-filter: blur(8px);
  color: white;
  margin-top: 35px;
  padding: 40px 0;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  border-radius: 35px 35px 0px 0px;
  box-shadow: 0px -5px 20px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

.footer-container {
  margin-top: 35;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.footer-logo img {
  width: 160px;
  transition: transform 0.3s ease;
}

.footer-logo img:hover {
  transform: scale(1.05);
}

.footer-social {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}

.footer-social a {
  color: white;
  font-size: 1.6rem;
  transition: transform 0.3s, color 0.3s;
}

.footer-social a:hover {
  color: #ff3c3c;
  transform: scale(1.2) rotate(5deg);
}

.footer-links ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  padding: 0;
  margin: 30px 0 10px;
}

.footer-links ul li a {
  text-decoration: none;
  color: white;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: color 0.3s, transform 0.3s;
}

.footer-links ul li a:hover {
  color: #ff3c3c;
  transform: translateY(-2px);
}

.footer-bottom {
  margin-top: 20px;
  font-size: 0.9rem;
  opacity: 0.75;
}
</style>
