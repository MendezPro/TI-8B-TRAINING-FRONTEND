<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-logo">
        <img src="@/assets/dev.png" alt="Gym Bulls" />
      </div>
      
      <div class="footer-info">
        <p><i class="fas fa-map-marker-alt"></i> 345 Faulconer Drive, Suite 4, Charlottesville, CA, 12345</p>
        <p><i class="fas fa-phone"></i> (123) 456-7890</p>
        <p><i class="fas fa-print"></i> (123) 456-7890</p>
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

.footer {
  background-color: #111;
  color: white;
  padding: 40px 0;
  text-align: center;
  font-family: 'Roboto', sans-serif;
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
  width: 180px;
}

.footer-info p {
  margin: 5px 0;
  font-size: 1rem;
}

.footer-info i {
  margin-right: 8px;
  color: red;
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

.footer-links ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0;
  margin: 20px 0;
}

.footer-links ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: 0.3s;
}

.footer-links ul li a:hover {
  color: red;
}

.footer-bottom {
  margin-top: 20px;
  font-size: 0.9rem;
  opacity: 0.7;
}
</style>
