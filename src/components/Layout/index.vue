<template>
  <el-container class="y-layout" direction="vertical">
    <Head :loginRef="loginRef" v-if="isShowHead">
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
      <Foot v-if="isShowHead"></Foot>
    </el-container>
    <Sider></Sider>
    <MBackTop></MBackTop>
  </el-container>
  <ParticlesBg v-if="isShowHead && isShowParticleBg" />
</template>

<script setup lang="ts" name="Layout">
import { ParticlesBg } from '@/plugins/VueParticles/index.ts'
import { useMProgress } from '@/plugins/MProgress/index.ts'

const router = useRouter()
useMProgress()
const loginRef = ref<Ref | null>(null)

const isShowHead = ref<boolean>(true)
const headBlackList = ['/admin']
const particleBgBlackList = ['/write']
watch(
  () => router.currentRoute.value,
  () => {
    isShowHead.value = !headBlackList.every((path) => router.currentRoute.value.path.indexOf(path) > -1)
  }
)
const isShowParticleBg = computed(
  () => !particleBgBlackList.every((path) => router.currentRoute.value.path.indexOf(path) > -1)
)
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
