<template>
  <div class="y-admin__aside" >
    <div class="y-aside__top">
      <img class="y-logo" v-lazy="'http://localhost:3000/avatar.png'" />
      <h1 class="y-title">雨落BLOG's Admin</h1>
    </div>
  </div>
</template>
<script setup lang="ts">
const asideRef = ref<HTMLElement | null>()


</script>
<style scoped lang="scss">
.y-admin__aside {
  width: 200px;
  height: 100vh;
  background-color: #304156;
  color: var(--el-color-primary-light-9);
  transition: width var(--el-transition-duration), opacity var(--el-transition-duration);
  will-change: width, opacity;

  .y-aside__top {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-bottom: solid 1px var(--el-border-color);
    background-color: #2b2f3a;
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
}
</style>
