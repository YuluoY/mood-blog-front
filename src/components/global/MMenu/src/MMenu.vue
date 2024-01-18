<template>
  <div class="m-menu">
    <el-menu
      :router="isRouter"
      :default-active="isRouter ? route.path : defaultActive"
      class="el-menu-vertical-demo m-admin__menu"
      :collapse="isCollapse"
    >
      <slot name="m-menu-prev"></slot>
      <slot></slot>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    isRouter?: boolean
    defaultActive?: string
    isCollapse?: boolean
  }>(),
  {
    isRouter: false,
    defaultActive: '',
    isCollapse: false,
  }
)
const route = useRoute()
</script>
<style scoped lang="scss">
.m-menu {
  height: inherit;
}

:deep(.el-menu) {
  height: 100%;
}

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
