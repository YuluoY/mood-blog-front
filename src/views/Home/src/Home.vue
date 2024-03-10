<template>
  <div class="y-home">
    <!-- <MHero>
      <MDrop />
    </MHero> -->
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
useWaterfall({
  container: '.y-homeList__waterfall',
  gap: 20,
  column: 3,
  breakpoint: [
    {
      point: 1500,
      column: 4,
    },
    {
      point: 1200,
      column: 3,
    },
    {
      point: 768,
      column: 2,
    },
    {
      point: 500,
      column: 1,
    },
  ],
})
</script>

<style scoped lang="scss">
@include b(home) {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@include be(home, inner) {
  display: flex;
  width: 70%;
  padding: 20px;
  box-sizing: border-box;

  @media screen and (width <= 1200px) {
    width: 100%;
  }
}

@include be(home, list) {
  flex: 1;

  /* margin-right: 20px; */
}

@include be(home, sidebar) {
  width: 300px;
}

.m-hero {
  position: relative;

  .m-drop {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
import { column } from 'element-plus/es/components/table-v2/src/common';
