<template>
  <div class="y-main">
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="Main">
import { useMainStore } from '@/store/mainStore.ts'
import { useGlobalStore } from '@/store/globalStore.ts'

const mainStore = useMainStore()
const globalStore = useGlobalStore();

await mainStore.fetchIp()
await mainStore.fetchPosition()
await mainStore.fetchCounts();

await globalStore.initAndCreateVisitor();

</script>

<style lang="scss" scoped>
@include b(main) {
  width: 100%;
}
</style>
