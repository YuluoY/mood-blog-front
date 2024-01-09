<template>
  <div class="y-navDropMenu">
    <div v-for="item in items" :key="String(item.name)" class="y-nav__link--sub">
      <RouterLink
        :to="item.path"
        class="y-flex y-f-align-center"
        @click="() => emit('handleSubNavClick', item)"
      >
        <svg-icon v-if="item.meta.icon" :name="item.meta.icon" size="1.2"></svg-icon>
        <span class="y-nav__title">{{ $t(`head.nav.${item.meta.title}`) }}</span>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts" name="NavDropMenu">
import { RouteRecordRaw } from 'vue-router'

withDefaults(
  defineProps<{
    items: RouteRecordRaw[]
  }>(),
  {
    items: () => [],
  }
)

const { emit } = getCurrentInstance()
</script>
<style scoped lang="scss">
@include b(navDropMenu) {
  position: absolute;
  left: 0;
  top: 25px;
  z-index: 9;
  box-shadow: var(--el-box-shadow-light);
  background-color: var(--el-bg-color);
  white-space: nowrap;
  transition: height 0.3s ease-in-out;
  will-change: height;
  height: 0;
  overflow: hidden;
}

@include bem(nav, link, sub) {
  position: relative;
  padding: 6px 20px;
  fill: var(--el-text-color-primary) !important;

  a {
    color: var(--el-text-color-primary);
  }

  &:hover {
    fill: var(--el-color-primary) !important;

    a {
      color: var(--el-text-color-primary-hover);
    }
  }
}

</style>
