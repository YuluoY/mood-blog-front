<template>
  <div class="y-template__itemStyle--one el-card" :data-id="article.id">
    <m-category-tag
      v-if="isCategoryTag"
      :text="article.category?.cateName"
      :bg-color="article.category?.cateColor"
      @click="() => $emit('hanldeCategoryTagClick', article.category?.cateAlias)"
    ></m-category-tag>
    <div class="y-item__inner y-flex">
      <div
        class="y-item__left"
        :style="{
          flex: leftRatio,
        }"
      >
        <div class="y-item__image">
          <img v-lazy="article.cover" loading="lazy" :alt="article.title" @load="handleLoad" />
        </div>
      </div>
      <div
        class="y-item__right y-flex y-f-col"
        :style="{
          flex: rightRatio,
        }"
      >
        <div class="y-item__title y-text-center">
          <h2>{{ article.title }}</h2>
        </div>
        <div class="y-item__desc y-flex-1">
          <p class="y-ellipsis-clamp y-clamp-5">{{ article.description }}</p>
        </div>
        <div class="y-item__info y-flex y-f-align-center y-f-w y-pt-10">
          <el-space class="y-item__info--author y-mr-6">
            <svg-icon name="author" />
            <span>{{ article.author || article.user?.username }}</span>
          </el-space>
          <el-space class="y-item__info--publish y-mr-6" alignment="center">
            <svg-icon name="date" />
            <span>{{ dateFormat(article.createdAt, 'YYYY-MM-DD') }}</span>
          </el-space>
          <el-space class="y-item__info--tags y-mr-6">
            <el-tag v-for="tag in article.tags" :key="tag.id" :color="tag.tagColor">
              {{ tag.tagName }}
            </el-tag>
          </el-space>
          <el-space class="y-item__info--view y-mr-6">
            <svg-icon name="view" />
            <span>{{ article.viewCount }}</span>
          </el-space>
          <el-space class="y-item__info--like y-mr-6">
            <svg-icon name="like" />
            <span>{{ article.likeCount }}</span>
          </el-space>
          <el-space class="y-item__info--comment y-mr-20">
            <svg-icon name="comment" />
            <span>{{ article.commentCount }}</span>
          </el-space>
          <el-text class="y-item__more y-text-right y-flex-1">
            <span
              class="y-cursor-p"
              @click="() => articleStore.jumpReadArticlePage($router, article.id)"
            >
              阅读全文
            </span>
          </el-text>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/store/articleStore.ts'
import { IArticle } from '@/types/api/article.ts'
import { dateFormat } from '@/utils/dayjs.ts'

defineEmits(['hanldeCategoryTagClick'])

withDefaults(
  defineProps<
    Partial<{
      article: IArticle
      leftRatio: number
      rightRatio: number
      isCategoryTag: boolean
    }>
  >(),
  {
    leftRatio: 3,
    rightRatio: 7,
    isCategoryTag: true,
  }
)

const articleStore = useArticleStore()
</script>
<style scoped lang="scss">
.y-template__itemStyle--one {
  margin: 20px 0;
  transition:
    transform 0.5s ease-in-out,
    opacity 0.5s ease-in-out;

  &:hover {
    box-shadow: var(--el-box-shadow-light);
  }

  .y-item__left {
    min-width: 200px;
    min-height: 200px;

    .y-item__image {
      width: 100%;
      height: 100%;
    }
  }

  .y-item__right {
    padding: 20px;
    background-color: var(--el-card-bg-color);

    .y-item__title {
      h2 {
        line-height: 2;
        font-size: 1.5rem;
        font-weight: bolder;
      }
    }

    .y-item__desc {
      line-height: 2;
      padding: 10px 0;
      text-indent: 2rem;
    }

    .y-item__info {
      border-top: solid 1px var(--el-border-color);
    }

    .y-item__more {
      span {
        &:hover {
          transition: color 0.3s ease-in-out;
          color: var(--el-color-primary);
        }
      }
    }
  }
}

:deep(.el-tag__content) {
  color: var(--el-color-white);
}
</style>
