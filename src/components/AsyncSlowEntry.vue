<template>
  <div class='async-slow-entry' v-if="path">
    <Suspense>
      <template #default>
        <asyncCommponet />
        <el-button></el-button>
      </template>
      <template #fallback>
        <slot></slot>
      </template>
    </Suspense>
  </div>
</template>
<script setup lang='ts'>

const props = defineProps<{
  path: string
}>()

const asyncCommponet = defineAsyncComponent((): any => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import(props.path))
    }, 1000)
  })
})

const a = ref(0)

</script>