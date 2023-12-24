
<template>
  <div :class="classname" :style="styles">
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
  top: 150
})

const classname = computed(() => {
  return props.classname ? `y-hero y-${props.classname}__hero` : `y-hero`
})

const styles = computed(() => {
  return {
    width:'100%',
    height: `calc(100vh - ${props.top}px)`,
    backgroundImage: `url(${props.imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } as CSSProperties
})

</script>
