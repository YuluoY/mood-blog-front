<template>
  <div class="y-hero"></div>
</template>
<script setup lang="ts" name="Hero">
import { getImageUrl } from '@/utils/core.ts'
import { useUserStore } from '@/store/userStore.ts';

const props = defineProps<{
  imageUrl?: string
}>()

const userStore = useUserStore()
const cover = ref(`url(${props.imageUrl || getImageUrl(userStore.cover)})`);

const coverWatchEffect = watchEffect(() => {
  cover.value = `url(${props.imageUrl || getImageUrl(userStore.cover)})`
})

onUnmounted(() => {
  coverWatchEffect()
})

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

.y-hero-dark{
  filter: brightness(0.5);
}
</style>
