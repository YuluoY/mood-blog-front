<template>
  <div class="y-home">
    <MHero>
      <MDrop />
    </MHero>
    <div class="y-home__inner">
      <HomeList
        class="y-home__list"
        @onLoadMore="onLoadMore"
        @onViewArticle="onViewArticle"
      ></HomeList>
      <HomeSidebar class="y-home__sidebar"></HomeSidebar>
    </div>
  </div>
</template>

<script setup lang="ts" name="Home">
import { useHome } from '../hooks/index.ts'
import HomeList from './HomeList.vue'
import HomeSidebar from './HomeSidebar.vue'
import { useWaterfall } from '../hooks/useWaterfall.ts'

const { onLoadMore, onViewArticle } = await useHome()
const { raw } = useWaterfall({
  container: '.y-homeList__waterfall',
  gap: 40,
  breakpoint: [
    {
      point: 1500,
      column: 3,
    },
    {
      point: 1200,
      column: 2,
    },
    {
      point: 768,
      column: 1,
    },
  ],
})
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

@include b(hero) {
  position: relative;

  .m-drop {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
