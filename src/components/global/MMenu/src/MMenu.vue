<template>
  <div class="m-menu" v-if="routes && routes.length">
    <el-menu
      :router="isRouter"
      :default-active="isRouter ? route.path : defaultActive"
      class="el-menu-vertical-demo m-admin__menu"
      :collapse="isCollapse"
    >
      <m-menu-item
        v-for="(route, index) in routes"
        :route="route"
        :index="index.toString()"
        :key="index"
      ></m-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

withDefaults(
  defineProps<{
    routes: Readonly<RouteRecordRaw[]> | null
    isRouter?: boolean
    defaultActive?: string
  }>(),
  {
    isRouter: false,
    defaultActive: '',
  }
)
const route = useRoute();
const isCollapse = ref(false)
</script>
<style scoped lang="scss">
:deep(.el-menu.m-admin__menu) {
  color: var(--m-admin-aside-text-color);
  fill: var(--m-admin-aside-text-color);
  background-color: var(--m-admin-aside-menu-bg-color);
}

:deep(.el-sub-menu) {
  background-color: var(--m-admin-aside-sub-menu-bg-color);

  div {
    color: inherit;
  }

  .el-sub-menu__title:hover {
    background-color: var(--m-admin-aside-sub-menu-hover-bg-color) !important;
  }

  .el-menu-item-group__title {
    background-color: var(--m-admin-aside-menu-bg-color);
  }
}

:deep(.el-menu-item) {
  color: inherit;
  background-color: var(--m-admin-aside-menu-bg-color);

  &:hover {
    background-color: var(--m-admin-aside-menu-hover-bg-color) !important;
  }

  &.is-active {
    background-color: var(--m-admin-aside-menu-hover-bg-color) !important;
  }
}
</style>
