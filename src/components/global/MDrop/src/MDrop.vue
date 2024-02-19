<template>
  <div class="m-drop">
    <div class="m-drop__inner">
      <div class="m-drop__icon" @click="handleClick">
        <slot name="icon" v-if="$slots?.icon"></slot>
        <template v-else>
          <svg-icon name="drop" :size="iconSize" class="m-icon__drop"></svg-icon>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="MDrop">
const props = withDefaults(
  defineProps<{
    iconSize?: number
    // eslint-disable-next-line vue/require-default-prop
    dropHeight?: number
  }>(),
  {
    iconSize: 2.5,
  }
)

const handleClick = () => {
  const heroEl = document.querySelector('.m-hero') as HTMLElement;
  window.scrollBy({
    top: props.dropHeight || heroEl.getBoundingClientRect().height,
    behavior: 'smooth',
  })
}
</script>

<style scoped lang="scss">
.m-drop {
  width: 100%;
  height: auto;
  margin-bottom: 40px;

  .m-drop__inner {
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;

    .m-icon {
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &:hover {
        transform: translateY(-15px);
        color: var(--el-color-primary) !important;
        fill: var(--el-color-primary) !important;
      }

      .m-icon__svg {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
}
</style>
