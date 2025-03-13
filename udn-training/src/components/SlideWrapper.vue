<template>
    <div class="slide">
      <transition name="slide">
        <slot />
      </transition>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .slide {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.5s;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    opacity: 0;
  }
  </style>
  