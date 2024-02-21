<template>
  <div class="m-backtop" @click="onTop" v-show="isShow">
    <slot name="icon" v-if="$slots.icon"></slot>
    <svg-icon name="backtop" :size="iconSize" v-else></svg-icon>
  </div>
</template>

<script lang="ts" setup name="MBackTop">
import { onMounted, onUnmounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    percent?: string | number
    iconSize?: string | number
    top?: number
  }>(),
  {
    percent: 20,
    iconSize: 1,
    top: 0,
  }
)
const isShow = ref(false)
const onTop = () => {
  window.scrollTo({
    top: props.top,
    behavior: 'smooth',
  })
}
function scrollHandle() {
  const scrollTop =
    document.querySelector('#app')?.scrollTop ||
    document.documentElement?.scrollTop ||
    document.body?.scrollTop
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  const percent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)

  isShow.value = percent > Number(props.percent)
}
onMounted(() => {
  if (props.percent === 0) {
    isShow.value = true
  } else {
    window.addEventListener('scroll', scrollHandle)
  }
  scrollHandle()
})
onBeforeUnmount(() => {
  if (props.percent !== 0) window.removeEventListener('scroll', scrollHandle)
})
</script>

<style scoped lang="scss">
.m-backtop {
  position: fixed;
  right: 30px;
  bottom: 50px;
  z-index: 1000;
  display: inline-flex;
  font-size: 2rem;
  text-align: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);
  padding: 6px;
  border-radius: 5px;
  fill: var(--el-color-primary);

  &:hover {
    transform: translateY(-15px);
  }
}
</style>
