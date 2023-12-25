<template>
  <div class="y-homeList">
    <div class="y-homeList__waterfall" ref="waterfall">
      <el-card
        class="y-homeList__item y-flex y-f-col y-f-align-center"
        v-for="item in articleStore.articleList"
        :key="item.id"
      >
        <div class="y-article__img">
          <img v-lazy="item.cover" :alt="item.title" loading="lazy" />
        </div>
        <div class="y-article__publish y-fs-12 y-mt-10" type="info">
          <span>发布日期：</span>
          <span>{{ dateFormat(item.createdAt) }}</span>
        </div>
        <div class="y-article__title y-mt-10">
          <p
            class="y-underline-trans y-cursor-p y-inline-block"
            @click="() => emit('onViewArticle', item)"
          >
            {{ item.title }}
          </p>
        </div>
        <div
          class="y-article__desc y-ellipsis-clamp y-clamp-5 y-mt-10"
          v-html="item.description"
        ></div>
        <div class="y-article__info y-flex y-mt-10">
          <div class="y-article__hot y-flex-1 y-text-center">
            <span>热度：</span>
            <span>{{ item.views.length }}</span>
          </div>
          <div class="y-article__commit y-flex-1 y-text-center">
            <span>评论：</span>
            <span>{{ item.comments.length }}</span>
          </div>
          <div class="y-article__pick y-flex-1 y-text-center">
            <span>点赞：</span>
            <span>{{ item.likes.length }}</span>
          </div>
        </div>
        <div class="y-article__tags y-flex y-f-align-center y-mt-10">
          <span>标签：</span>
          <el-tag>Tag 1</el-tag>
        </div>
      </el-card>
    </div>
    <div class="y-load__more y-flex y-f-justify-center">
      <el-button
        type="primary"
        :disabled="articleStore.total === articleStore.articleList.length"
        plain
        @click="() => emit('onLoadMore')"
      >
        {{ $t('homeView.loadMoreText') }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/store/articleStore.ts'
import { dateFormat } from '@/utils/dayjs.ts'

const { emit } = getCurrentInstance()

const articleStore = computed(() => useArticleStore())
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
  border-radius: 5px;
  box-shadow: var(--el-box-shadow-light);
  transition: all 0.3s;
  width: inherit;

  &:hover {
    box-shadow: var(--el-box-shadow);
  }
}
</style>
