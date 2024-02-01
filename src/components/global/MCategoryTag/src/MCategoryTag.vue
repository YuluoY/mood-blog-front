<template>
  <div class="m-categoryTag" ref="mCategoryTagRef">
    <svg-icon class="m-categoryTag__icon" name="category" size="1.2" />
    <span class="m-categoryTag__text">{{ text }}</span>
    <div
      class="m-categoryTag__background"
      ref="mCategoryTagBackgroundRef"
      :style="{
        backgroundColor: bgColor,
        opacity: opacity,
      }"
    ></div>
    <i
      class="m-categoryTag__triangle"
      ref="mCategoryTagTriangleRef"
      :style="{
        borderRightColor: bgColor,
        opacity: 1,
      }"
    ></i>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<
    Partial<{
      text: string
      bgColor: string
      opacity: string | number
    }>
  >(),
  {
    text: '',
    bgColor: '#409eff',
    opacity: '0.6',
  }
)

const mCategoryTagRef = ref<HTMLDivElement | null>()
const mCategoryTagBackgroundRef = ref<HTMLDivElement | null>()
const mCategoryTagTriangleRef = ref<HTMLDivElement | null>()

const handleMouseenter = () => {
  mCategoryTagBackgroundRef.value.style.opacity = '1'
  mCategoryTagTriangleRef.value.style.opacity = String(props.opacity)
}

const handleMouseleave = () => {
  mCategoryTagBackgroundRef.value.style.opacity = String(props.opacity)
  mCategoryTagTriangleRef.value.style.opacity = '1'
}

onMounted(() => {
  if (mCategoryTagRef.value) {
    mCategoryTagRef.value.addEventListener('mouseenter', handleMouseenter)
    mCategoryTagRef.value.addEventListener('mouseleave', handleMouseleave)
    if(mCategoryTagRef.value.parentElement) {
      mCategoryTagRef.value.parentElement.style.overflow = 'unset';
      mCategoryTagRef.value.parentElement.style.position = 'relative';
    }
  }
})

onBeforeUnmount(() => {
  mCategoryTagRef.value.removeEventListener('mouseenter', handleMouseenter)
  mCategoryTagRef.value.removeEventListener('mouseleave', handleMouseleave)
})
</script>
<style scoped lang="scss">
.m-categoryTag {
  position: absolute;
  left: -20px;
  top: 20px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  line-height: 1;
  color: var(--el-color-white);
  fill: var(--el-color-white);
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  .m-categoryTag__background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 2;
    transition: inherit;
  }

  .m-categoryTag__triangle {
    display: inline-flex;
    position: absolute;
    left: 0;
    top: 100%;
    width: 0;
    height: 0;
    border-top: 20px solid transparent; /* 通过调整这个值来控制底边的宽度 */
    border-right: 20px solid; /* 通过调整这个值来控制高度 */
    transform: rotate(-90deg);
    transition: inherit;
  }

  .m-categoryTag__icon,
  .m-categoryTag__text {
    position: relative;
    z-index: 3;
  }

  .m-categoryTag__text {
    margin-left: 8px;
    margin-top: 2px;
  }
}
</style>
