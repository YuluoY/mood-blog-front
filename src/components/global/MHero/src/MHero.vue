
<template>
  <div class="y-hero" :style="styles">
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="MHero">
import {CSSProperties} from "vue";
import {useGlobalStore} from '@/store/globalStore.ts'

const props = withDefaults(defineProps<{
  classname?: string
  imageUrl?: string
  top?: number
}>(), {
  classname: '',
  imageUrl: useGlobalStore().getDefaultCover,
  top: 200
})

const styles = computed(() => {
  return {
    width:'100%',
    minHeight: `calc(100vh - ${props.top}px)`,
    backgroundImage: `url(${props.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } as CSSProperties
})

</script>
