<template>
  <div class="m-menu__item" v-if="route">
    <el-sub-menu :index="index" v-if="route.children">
      <template #title>
        <div class="m-menu__item--title">
          <svg-icon :name="route.meta.icon" v-if="route.meta.icon"></svg-icon>
          <span>{{ route.meta.title }}</span>
        </div>
      </template>
      <template v-for="(r, i) in route.children" :key="`${index}-${i}`">
        <MMenuItem :route="r" :index="`${index}-${i}`" />
      </template>
    </el-sub-menu>
    <el-menu-item v-else :index="route.path">
      <template #title>
        <div class="m-menu__item--title">
          <svg-icon :name="route.meta.icon" v-if="route.meta.icon"></svg-icon>
          <span>{{ route.meta.title }}</span>
        </div>
      </template>
    </el-menu-item>
  </div>
</template>
<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

withDefaults(
  defineProps<{
    route: Readonly<RouteRecordRaw> | null
    index: string
  }>(),
  {}
)
</script>
<style scoped lang="scss">
.m-menu__item--title {
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 10px;
  }
}
</style>
