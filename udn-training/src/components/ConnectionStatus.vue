<!-- filepath: src/components/ConnectionStatus.vue -->
<template>
    <transition name="fade">
      <div v-if="show" :class="['connection-status', isOnline ? 'online' : 'offline']">
        <span class="icon">
          <i :class="isOnline ? 'fas fa-wifi' : 'fas fa-exclamation-circle'"></i>
        </span>
        <span class="message">{{ message }}</span>
      </div>
    </transition>
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
    beforeUnmount() {
      // Eliminar los listeners al destruir el componente
      window.removeEventListener('online', this.updateConnectionStatus);
      window.removeEventListener('offline', this.updateConnectionStatus);
    },
  };
  </script>
  
  <style>
  /* Animación para el componente */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  
  .connection-status {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 20px;
    width: 50%; /* Más ancho */
    max-width: 600px; /* Límite máximo de ancho */
    border-radius: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    font-weight: bold;
    color: white;
    z-index: 1000;
    animation: slide-down 0.5s ease-out;
  }
  
  .connection-status.online {
    background-color: #4caf50; /* Verde elegante */
  }
  
  .connection-status.offline {
    background: linear-gradient(90deg, #ff914d, #ff4d4d);
  }
  
  .connection-status .icon {
    font-size: 20px;
  }
  
  .connection-status .message {
    flex: 1;
    text-align: center;
  }
  
  /* Animación de entrada */
  @keyframes slide-down {
    from {
      transform: translateX(-50%) translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  </style>
  
  <!-- Asegúrate de incluir Font Awesome para los íconos -->
  <!-- Agrega esto en tu archivo principal HTML o instala Font Awesome -->
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" /> -->