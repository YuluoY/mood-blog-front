<template>
  <el-container class="y-layout" direction="vertical">
    <Head :loginRef="loginRef">
      <template #Search>
        <Search></Search>
      </template>
      <template #Nav="{ routes, currentRoute }">
        <Nav :routes="routes" :currentRoute="currentRoute"></Nav>
      </template>
      <template #Login>
        <Login ref="loginRef"></Login>
      </template>
    </Head>
    <el-container direction="vertical">
      <Main>
        <slot></slot>
      </Main>
    </el-container>
    <Sider></Sider>
    <MBackTop></MBackTop>
  </el-container>
  <ParticlesBg />
</template>

<script setup lang="ts" name="Layout">
import { ParticlesBg } from '@/plugins/VueParticles/index.ts'
import { useMProgress } from '@/plugins/MProgress/index.ts'

useMProgress();
const loginRef = ref<Ref | null>(null);

</script>

<style scoped lang="scss">
.y-layout {
  min-height: 100vh;
}

:deep(#tsparticles) {
  position: absolute;
  width: 100%;
  z-index: -1;
}
</style>

<script setup lang="ts" name="Layout"></script>
