<template>
  <el-container direction="horizontal">
    <AdminAside>
      <template #menu>
        <MMenu :isRouter="true" :isCollapse="isCollapse">
          <template #m-menu-prev>
            <div class="y-aside__top">
              <img class="y-logo" v-lazy="'http://localhost:3000/avatar.png'" />
              <h1 class="y-title" v-show="!isCollapse">雨落BLOG's Admin</h1>
            </div>
          </template>
          <m-menu-item
            v-for="(r, index) in adminRoute.children"
            :route="r"
            :index="index.toString()"
            :key="index"
            :isCollapse="isCollapse"
          ></m-menu-item>
        </MMenu>
      </template>
    </AdminAside>
    <el-container direction="vertical">
      <AdminHead />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Mitt from '@/plugins/Mitt/index.ts'

const router = useRouter()
const adminRoute = router.getRoutes().find((route) => route.name === 'Admin')
const isCollapse = ref(false)

const onChangeCollapse = () => {
  isCollapse.value = !isCollapse.value
}

Mitt.on('onChangeCollapse', onChangeCollapse)
</script>
<style scoped lang="scss"></style>
