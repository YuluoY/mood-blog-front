<template>
  <div class="y-nav">
    <div class="y-nav__inner y-flex">
      <template v-for="route in routes">
        <div
          class="y-nav__link y-router__link--active y-ml-20"
          v-if="route.meta.affix"
          :key="String(route.name)"
          @click="handleNavClick"
        >
          <RouterLink :to="route.path" class="y-flex y-f-align-center">
            <svg-icon v-if="route.meta.icon" :name="route.meta.icon" size="1.2"></svg-icon>
            <span class="y-nav__title y-mr-6">{{ $t(`head.nav.${route.meta.title}`) }}</span>
            <svg-icon name="drop-2" size=".8" v-if="route?.children.length"></svg-icon>
          </RouterLink>
          <NavDropMenu
            v-if="route?.children.length"
            :items="route.children"
            @handleSubNavClick="handleSubNavClick"
          />
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts" name="Nav">
import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import { useNav } from '../hooks/index.ts'

export interface INavPropsRoute {
  path: string
  name: string
  children: INavPropsRoute[]
  meta: {
    icon: string
    title: string
    affix: boolean
  }
}

export interface INavProps {
  routes: INavPropsRoute[]
}

withDefaults(
  defineProps<{
    routes: INavPropsRoute[]
    currentRoute: import('vue').Ref<RouteLocationNormalizedLoaded>
  }>(),
  {}
)

const { handleSubNavClick, handleNavClick } = useNav()
</script>
<style scoped lang="scss">
@include be(nav, link) {
  position: relative;
  fill: var(--el-text-color-primary) !important;

  a {
    color: var(--el-text-color-primary);
  }

  &:hover {
    fill: var(--el-color-primary) !important;

    a {
      color: var(--el-text-color-primary-hover);
    }
  }
}

@include be(nav, title) {
  margin-left: 6px;
}
</style>
