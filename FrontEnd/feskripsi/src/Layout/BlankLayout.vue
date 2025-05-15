<template>
  <div class="font-helvetica">
      <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

</style>
