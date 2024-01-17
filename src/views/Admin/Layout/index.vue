<template>
  <el-container direction="horizontal">
    <AdminAside />
    <el-container direction="vertical">
      <AdminHead />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">

</script>
<style scoped lang="scss"></style>
