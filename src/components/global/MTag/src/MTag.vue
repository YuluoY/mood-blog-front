<template>
  <div class="m-tag">
    <div v-if="type === 'rectangle'" class="m-tag__rectangle" :style="innerStyle">
      <span>{{ text }}</span>
      <i class="m-tag__tangle--icon"></i>
    </div>
    <div v-if="type === 'trapezium'" class="m-tag__trapezium" :style="innerStyle">
      <span>{{ text }}</span>
      <svg-icon class="m-tag__tangle--icon" name="top" size="2"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface MTagProps {
  type: 'rectangle' | 'trapezium'
  bgColor: string
  textColor: string
  text: string
  innerStyle: import('vue').CSSProperties
}

const props = withDefaults(defineProps<Partial<MTagProps>>(), {
  type: 'trapezium',
  bgColor: '#000000',
  textColor: '#FFFFFF',
  text: '标签',
})

const defaultStyle: import('vue').CSSProperties = {
  backgroundColor: props.bgColor,
  color: props.textColor,
}

if (props.type === 'rectangle') {
  Object.assign(defaultStyle, {
    position: 'absolute',
    right: '20px',
    padding: '20px 6px',
    cursor: 'pointer',
  } as import('vue').CSSProperties)
} else if (props.type === 'trapezium') {
  Object.assign(defaultStyle, {
    position: 'absolute',
    right: 0,
    top: '20px',
    cursor: 'pointer',
  } as import('vue').CSSProperties)
}

const innerStyle = computed(() => Object.assign(defaultStyle, props.innerStyle))
</script>
<style scoped lang="scss">
.m-tag {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;

  .m-tag__rectangle {
    .m-tag__tangle--icon {
      position: absolute;
      bottom: 0;
      left: 0;
      display: inline-block;
      width: 100%;
      height: 10%;
      border-left: 17px solid transparent; /* 左边透明 */
      border-right: 17px solid transparent; /* 右边透明 */
      border-bottom: 17px solid #fff; /* 底边为实色 */
    }
  }

  .m-tag__trapezium {
    .m-tag__tangle--icon{
      // ..
    }
  }
}
</style>
