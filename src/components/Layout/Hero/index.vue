<template>
  <div class="y-hero"></div>
</template>
<script setup lang="ts" name="Hero">
import { getImageUrl } from '@/utils/core.ts'

const cover = `url(${getImageUrl('cover.jpg')})`

</script>

<style lang="scss" scoped>
.y-hero {
  width: 100%;
  height: calc(100vh - 150px);
  background-image: v-bind(cover);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
