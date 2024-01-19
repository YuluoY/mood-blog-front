<template>
  <div
    class="y-admin__aside"
    :style="{
      width: '200px',
    }"
  >
    <div class="y-aside__menu">
      <slot name="menu"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
:deep(.el-sub-menu__icon-arrow) {
  margin-right: -5px !important;
}

.y-admin__aside {
  // width: 200px;
  // height: 100vh;

  // background-color: var(--m-admin-aside-menu-bg-color);
  color: var(--el-color-primary-light-9);
  transition:
    width 0.5s,
    opacity 1s ease-in-out;
  will-change: width, opacity;

  .y-aside__menu {
    height: 100vh;
  }
}

:deep(.y-aside__top) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: var(--m-admin-aside-title-bg-color);
  padding: 10px;

  .y-logo {
    width: 50px;
    overflow: hidden;
    padding-right: 10px;
  }

  h1 {
    font-size: 1em;
    font-weight: 700;
  }
}
</style>
