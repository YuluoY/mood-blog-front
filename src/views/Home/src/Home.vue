<template>
  <div class="y-home">
    <div class="y-home__inner">
      <HomeList class="y-home__list" @onLoadMore="onLoadMore" @onViewArticle="onViewArticle"></HomeList>
      <HomeSidebar class="y-home__sidebar"></HomeSidebar>
    </div>
    <KeepAlive>
      <Foot></Foot>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts" name="Home">
import {useHome} from '../hooks/index.ts'
import HomeList from './HomeList.vue'
import HomeSidebar from './HomeSidebar.vue'

const waterfallData = new Array(20).fill(0).map((_, index) => ({
  id: index,
  width: 200,
  height: Math.floor(Math.random() * 300 + 200),
  background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
}))

const {onLoadMore, onViewArticle} = await useHome()

</script>

<style scoped lang="scss">
@include b(home) {
  width: 100%;
}

@include be(home, inner) {
  display: flex;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

@include be(home, list) {
  flex: 1;
  margin-right: 20px;
}

@include be(home, sidebar) {
  width: 300px;
}
</style>
