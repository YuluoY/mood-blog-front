<template>
  <el-container class="y-layout" direction="vertical">
    <Head :loginRef="loginRef">
      <template #Nav="{ routes, currentRoute }">
        <Nav :routes="routes" :currentRoute="currentRoute"></Nav>
      </template>
      <template #Login>
        <Login ref="loginRef"></Login>
      </template>
    </Head>
    <el-container direction="vertical">
      <Hero></Hero>
      <Main>
        <slot></slot>
      </Main>
      <KeepAlive>
        <Foot></Foot>
      </KeepAlive>
    </el-container>
    <Sider></Sider>
    <el-backtop :right="50" :bottom="50" target="body"></el-backtop>
  </el-container>
</template>

<script setup lang="ts" name="Layout">
const loginRef = ref<Ref | null>(null);

</script>

<style scoped lang="scss">
.y-layout {
  height: 100vh;
}
</style>
