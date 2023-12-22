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
import { useWaterfall } from '../hooks/useWaterfall.ts'

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

const { raw } = useWaterfall({
  container: '.y-homeList__waterfall',
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

  // display: grid;
  // grid-template-columns: repeat(1, 1fr); /* 每行四列 */
  // gap: 16px;
}

@include be(homeList, item) {
  border-radius: 5px;
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s;
  width: inherit;

  &:hover {
    box-shadow: var(--el-box-shadow);
  }
}
</style>
