<!-- filepath: src/App.vue -->
<template>
  <ConnectionStatus /> <!-- Estado de conexión -->
  <HeaderComponent /> <!-- Header global -->
  <router-view></router-view> <!-- Aquí se renderizan las vistas dinámicamente -->
  <FooterComponent /> <!-- Footer global -->
</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import FooterComponent from "@/components/Footer.vue";
import ConnectionStatus from "@/components/ConnectionStatus.vue";

export default {
  components: { HeaderComponent, FooterComponent, ConnectionStatus },
  name: 'App',
};
</script>

<style>
/* Puedes agregar estilos globales aquí si es necesario */
</style>