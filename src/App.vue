<template>
  <Suspense>
    <Layout>
      <router-view></router-view>
    </Layout>
  </Suspense>
</template>

<script setup lang="ts">
import { autoRefresh } from './auto-update.ts'

onMounted(() => {
  nextTick(() => {
    if (import.meta.env.MODE !== 'development') autoRefresh()
  })
})
</script>
<style scoped>
.logo {
  height: 6rem;
  padding: 1.5rem;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
