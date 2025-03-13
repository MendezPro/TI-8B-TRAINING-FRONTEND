<template>
  <HeaderComponent />  <!-- Header global -->
  <router-view></router-view>  <!-- Aquí se renderizan las vistas dinámicamente -->
  <FooterComponent />  <!-- Footer global -->
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";

export default {
  components: { HeaderComponent, FooterComponent }
};
</script>

<style>
/* Puedes agregar estilos globales aquí si es necesario */
</style>
