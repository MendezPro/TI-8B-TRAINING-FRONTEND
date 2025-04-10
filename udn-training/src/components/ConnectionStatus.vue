<!-- filepath: src/components/ConnectionStatus.vue -->
<template>
    <div v-if="show" :class="['connection-status', isOnline ? 'online' : 'offline']">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOnline: navigator.onLine,
        show: false,
        message: '',
      };
    },
    methods: {
      updateConnectionStatus() {
        this.isOnline = navigator.onLine;
        this.message = this.isOnline
          ? 'Conexión restaurada'
          : 'Sin conexión a Internet';
        this.show = true;
  
        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
          this.show = false;
        }, 3000);
      },
    },
    mounted() {
      // Detectar eventos de conexión/desconexión
      window.addEventListener('online', this.updateConnectionStatus);
      window.addEventListener('offline', this.updateConnectionStatus);
    },
    beforeUnmount() { // Cambiado de beforeDestroy a beforeUnmount
      // Eliminar los listeners al destruir el componente
      window.removeEventListener('online', this.updateConnectionStatus);
      window.removeEventListener('offline', this.updateConnectionStatus);
    },
  };
  </script>
  
  <style>
  .connection-status {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    color: white;
    z-index: 1000;
  }
  .connection-status.online {
    background-color: green;
  }
  .connection-status.offline {
    background-color: red;
  }
  </style>