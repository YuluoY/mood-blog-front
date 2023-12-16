<template>
  <div class="y-homeList">
    <div class="y-homeList__waterfall" ref="waterfall">
      <el-card
        class="y-homeList__item y-flex y-f-col y-f-align-center"
        v-for="item in waterfallData"
        :key="item.id"
      >
        <div class="y-card__img">
          <img v-lazy="item.cover" :alt="item.title" loading="lazy" />
        </div>
        <div class="y-card__title y-text-center">
          <p class="y-underline-trans y-cursor-p y-inline-block">{{ item.title }}</p>
        </div>
        <div class="y-card__desc y-ellipsis-clamp y-clamp-5 y-mt-10">
          <p>{{ item.description }}</p>
        </div>
      </el-card>
    </div>
    <div class="y-load__more y-flex y-f-justify-center">
      <el-button
        type="primary"
        :disabled="total === waterfallData.length"
        plain
        @click="() => emit('onLoadMore')"
      >
        {{ $t('homeView.loadMoreText') }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IArticle } from '@/types/api/article.ts'
import { MasonryInfiniteGrid } from '@egjs/infinitegrid'

const { emit } = getCurrentInstance()

const props = withDefaults(
  defineProps<{
    waterfallData: IArticle[]
    total: number
  }>(),
  {
    waterfallData: () => [],
    total: 0,
  }
)

onMounted(() => {
  setTimeout(() => {
    const ig = new MasonryInfiniteGrid('.y-homeList__waterfall', {
      gap: 20,
      column: 4,
    })
    ig.renderItems()
  }, 300)
})
</script>
<style scoped lang="scss">
:deep(.el-card__body) {
  width: inherit;
}

@include b(homeList) {
  width: 100%;
  height: 100%;
}

@include be(homeList, waterfall) {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

@include be(homeList, item) {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s;

  // cursor: pointer;
  z-index: -1;

  &:hover {
    box-shadow: var(--el-box-shadow);
  }
}
</style>
