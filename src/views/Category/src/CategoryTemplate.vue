<template>
  <div :class="route.name ? `y-category__${route.name.toString().toLowerCase()}` : ''">
    
  </div>
</template>
<script setup lang="ts">

const route = useRoute();


</script>
<style scoped lang="scss"></style>
