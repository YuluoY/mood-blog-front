<template>
  <div class="y-nav">
    <div class="y-nav__inner y-flex">
      <template v-for="route in routes">
        <div
          class="y-nav__link y-router__link--active y-ml-20"
          v-if="route.meta.affix"
          :key="String(route.name)"
        >
          <RouterLink :to="route.path" class="y-flex y-f-align-center">
            <svg-icon :name="route.meta.icon"></svg-icon>
            <span class="y-nav__title">{{ $t(`head.nav.${route.meta.title}`) }}</span>
          </RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts" name="Nav">
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

withDefaults(
  defineProps<{
    routes: RouteRecordRaw[]
    currentRoute: import('vue').Ref<RouteLocationNormalizedLoaded>
  }>(),
  {}
)
</script>
<style scoped lang="scss">
@include be(nav, link) {
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

@include be(nav, title) {
  margin-left: 6px;
}

</style>
