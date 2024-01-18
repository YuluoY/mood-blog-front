<template>
  <div class="y-admin__aside" >
    <div class="y-aside__top">
      <img class="y-logo" v-lazy="'http://localhost:3000/avatar.png'" />
      <h1 class="y-title">雨落BLOG's Admin</h1>
    </div>
    <div class="y-aside__menu">
      <MMenu :routes="adminRoute.children" :isRouter="true"/>
    </div>
  </div>
</template>
<script setup lang="ts">

const router = useRouter();

const adminRoute = router.getRoutes().find(route => route.name === 'Admin');



</script>
<style scoped lang="scss">
.y-admin__aside {
  width: 200px;
  height: 100vh;
  background-color: var(--m-admin-aside-menu-bg-color);
  color: var(--el-color-primary-light-9);
  transition: width var(--el-transition-duration), opacity 1s  ease-in-out;
  will-change: width, opacity;

  .y-aside__top {
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
}
</style>
