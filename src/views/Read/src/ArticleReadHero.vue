<template>
  <MHero classname="read" class="y-f-col" :image-url="article.cover">
    <div class="y-hero__inner">
      <h1 class="y-hero__title y-text-center">{{ article.title }}</h1>
      <div class="y-hero__item y-flex y-f-align-center">
        <div class="date y-flex y-f-align-center">
          <svg-icon name="publish-date"></svg-icon>
          <span class="y-ml-6">发表于</span>
          <span>{{ dateFormat(article.createdAt) }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="category y-flex y-f-align-center">
          <svg-icon name="tag"></svg-icon>
          <span class="y-ml-6">分类于</span>
          <span>{{ article.category }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="view y-flex y-f-align-center">
          <svg-icon name="view"></svg-icon>
          <span class="y-ml-6">阅读量：</span>
          <span>{{ article.views.length }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="comment y-flex y-f-align-center">
          <svg-icon name="comment"></svg-icon>
          <span class="y-ml-6">评论数：</span>
          <span>{{ article.comments.length }}</span>
        </div>
      </div>
      <div class="y-hero__item y-flex y-f-align-center y-f-justify-center y-mt-10">
        <div class="words y-flex y-f-align-center">
          <svg-icon name="article-view"></svg-icon>
          <span class="y-ml-6">本文字数：</span>
          <span>{{ calculateWords }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="time-circle y-flex y-f-align-center">
          <svg-icon name="time-circle"></svg-icon>
          <span class="y-ml-6">阅读时长</span>
          <b class="y-ml-4 y-mr-4">≈</b>
          <span>{{ calculateTimeCircle }}</span>
        </div>
      </div>
    </div>
    <MDrop></MDrop>
  </MHero>
</template>
<script setup lang="ts" name="ArticleReadHero">
import { IArticle } from '@/types/api/article.ts'
import { dateFormat } from '@/utils/dayjs.ts'

const props = withDefaults(
  defineProps<{
    // eslint-disable-next-line vue/require-default-prop
    article?: IArticle
  }>(),
  {}
)

const calculateTimeCircle = computed(() => {
  return `${(props.article.words / 500 || 0).toFixed(2)}分钟`
})

const calculateWords = computed(() => {
  return `${(props.article.words / 1000 || 0).toFixed(2)}k`
})
</script>
<style scoped lang="scss">
:deep(.el-divider) {
  border-left: 1px var(--el-text-color-primary) var(--el-border-style);
}

@include b(hero) {
  display: flex;

  @include e(inner) {
    margin: auto;
    color: var(--el-text-color-primary);
    text-shadow: 0 0 15px var(--el-color-info-light-9);
  }

  .m-icon {
    font-size: 1.2em;
    fill: var(--el-text-color-primary);
  }
}
</style>
