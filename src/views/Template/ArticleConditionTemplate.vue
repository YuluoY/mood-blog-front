<template>
  <div class="y-template__article">
    <div class="y-template__inner">
      <div class="y-template__content y-flex y-f-col y-flex-1">
        <div class="y-template__title">
          <el-card
            shadow="hover"
            :body-style="{
              textAlign: 'center',
              fontSize: '1.5em',
              padding: '10px 0',
            }"
          >
            <h2>{{ `${typeText}${$route.params.name}下的文章` }}</h2>
          </el-card>
        </div>
        <div class="y-template__list">
          <template v-if="styleIndex === '1'">
            <ArticleItemStyleOne
              v-for="article in articleList"
              :key="article.id"
              :article="article"
            ></ArticleItemStyleOne>
          </template>
        </div>
      </div>
      <div class="y-template__sidebar" v-if="$slots.sidebar">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IArticle } from '@/types/api/article.ts'
import ArticleItemStyleOne from './ArticleItemStyleOne.vue'

withDefaults(
  defineProps<Partial<{
    articleList: IArticle[]
    typeText: string
    styleIndex: string
  }>>(),
  {
    articleList: () => [],
    typeText: '',
    styleIndex: '1',
  }
)
</script>
<style scoped lang="scss">
.y-template__article {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: auto;

  .y-template__inner {
    width: 70%;
    height: 100%;
    display: flex;
    padding-top: 20px;

    .y-template__list {
      flex: 1;
    }

    .y-template__sidebar {
      width: 300px;
      margin-left: 20px;
    }
  }
}
</style>
