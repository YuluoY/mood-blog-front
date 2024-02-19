<template>
  <div class="m-hero" :style="styles" ref="mHeroRef">
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="MHero">
import { CSSProperties } from 'vue'
import { useGlobalStore } from '@/store/globalStore.ts'

const props = withDefaults(
  defineProps<{
    classname?: string
    imageUrl?: string
    top?: number
  }>(),
  {
    classname: '',
    imageUrl: '',
    top: 200,
  }
)

const styles = computed(() => {
  return {
    width: '100%',
    minHeight: `calc(100vh - ${props.top}px)`,
    backgroundImage: `url(${props.imageUrl || useGlobalStore().getDefaultCover})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
  } as CSSProperties
})

const mHeroRef = ref<HTMLDivElement | null>()

const mHeroWidth = computed(() => {
  return mHeroRef.value.clientWidth
})

const mHeroHeight = computed(() => {
  return mHeroRef.value.clientHeight
})

defineExpose({
  mHeroRef,
  mHeroWidth,
  mHeroHeight
})
</script>
