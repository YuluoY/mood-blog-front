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
      <Hero v-show="isShowHero"></Hero>
      <Main>
        <slot></slot>
      </Main>
    </el-container>
    <Sider></Sider>
    <el-backtop :right="50" :bottom="50" target="body"></el-backtop>
  </el-container>
  <ParticlesBg />
</template>

<script setup lang="ts" name="Layout">
import global from '@/global/index.ts'
import { ParticlesBg } from '@/plugins/VueParticles/index.ts';

const router = useRouter()
const loginRef = ref<Ref | null>(null)
const { coverWhiteList } = global

const isShowHero = computed(() => {
  return coverWhiteList.includes(router.currentRoute.value.name as string)
})
</script>

<style scoped lang="scss">
.y-layout {
  height: 100vh;
}

:deep(#tsparticles){
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>

<script setup lang="ts" name="Layout"></script>
