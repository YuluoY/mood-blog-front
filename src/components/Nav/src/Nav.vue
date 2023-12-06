<template>
  <div class="y-nav">
    <el-menu :default-active="currentRoute.value.path" mode="horizontal" router :ellipsis="false">
      <template v-for="route in routes" :key="String(route.name)">
        <el-menu-item class="y-fs-16 y-flex y-f-center" :index="route.path" v-if="route.meta.affix">
          <SvgIcon :name="route.meta.icon" style="margin-top: -2px;"></SvgIcon>
          <span class="y-ml-10">{{ $t(`head.nav.${route.meta.title}`) }}</span>
        </el-menu-item>
      </template>
    </el-menu>
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
@include be(head, center) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  .el-menu--horizontal.el-menu {
    border-bottom: none;
  }

  .el-menu--horizontal {
    .el-menu-item {
      margin: 0 10px;

      &:not(.is-disabled) {
        &:focus,
        &:hover {
          border-bottom: 2px solid var(--el-menu-active-color);
        }
      }
    }
  }
}
</style>
