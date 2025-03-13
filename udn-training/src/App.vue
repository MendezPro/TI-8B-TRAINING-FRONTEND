<template>
  <HeaderComponent />
  <router-view></router-view>
</template>

<script>
import HeaderComponent from "@/components/Header.vue";

export default {
  components: { HeaderComponent }
};
</script>
