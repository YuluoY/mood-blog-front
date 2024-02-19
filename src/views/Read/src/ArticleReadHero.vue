<template>
  <MHero classname="read" class="y-f-col" :image-url="article.cover">
    <div class="m-hero__inner">
      <h1 class="m-hero__title y-text-center">{{ article.title }}</h1>
      <div class="m-hero__item y-flex y-f-align-center">
        <div class="author y-flex y-f-align-center">
          <svg-icon name="author"></svg-icon>
          <span class="y-ml-6">作者：</span>
          <span>{{ article.author || article.user.username }}</span>
        </div>
        <el-divider direction="vertical" />

        <div class="date y-flex y-f-align-center">
          <svg-icon name="publish-date"></svg-icon>
          <span class="y-ml-6">发表于</span>
          <span>{{ dateFormat(article.createdAt) }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="category y-flex y-f-align-center">
          <svg-icon name="category"></svg-icon>
          <span class="y-ml-6">分类：</span>
          <span>{{ article.category.cateName }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="tag y-flex y-f-align-center">
          <svg-icon name="tag"></svg-icon>
          <span class="y-ml-6">标签：</span>
          <span>{{ article.tags.map((item) => item.tagName).join() }}</span>
        </div>
      </div>
      <div class="m-hero__item y-flex y-f-align-center y-f-justify-center y-mt-10">
        <div class="view y-flex y-f-align-center">
          <svg-icon name="view"></svg-icon>
          <span class="y-ml-6">阅读量：</span>
          <span>{{ article.viewCount }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="like y-flex y-f-align-center">
          <svg-icon name="like"></svg-icon>
          <span class="y-ml-6">点赞：</span>
          <span>{{ article.likeCount }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="comment y-flex y-f-align-center">
          <svg-icon name="comment"></svg-icon>
          <span class="y-ml-6">评论数：</span>
          <span>{{ article.commentCount }}</span>
        </div>
        <el-divider direction="vertical" />

        <div class="words y-flex y-f-align-center">
          <svg-icon name="article-view"></svg-icon>
          <span class="y-ml-6">字数：</span>
          <span>{{ calculateWords }}</span>
        </div>
        <el-divider direction="vertical" />
        <div class="time-circle y-flex y-f-align-center">
          <svg-icon name="time-circle"></svg-icon>
          <span class="y-ml-6">时长</span>
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
  border-left: 1px var(--el-bg-color) var(--el-border-style);
}

.m-hero {
  display: flex;

  .m-hero__inner {
    margin: auto;

    // color: var(--el-text-color-primary);
    color: var(--el-color-white);

    // text-shadow: 0 0 15px var(--el-color-info-light-9);
    text-shadow: 0 0 30px var(--el-color-black);
  }

  .m-icon {
    font-size: 1.2em;
    fill: var(--el-color-white);
  }
}
</style>
