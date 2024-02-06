<template>
  <div :class="route.name ? `y-category__${route.meta.title.toString()}` : ''">
    <ArticleConditionTemplate
      type-text="分类"
      :is-love-show="false"
      :is-sidebar="true"
      :total="total"
      :page="page"
      :limit="limit"
      :is-category-tag="false"
      :article-list="articleList"
      @on-jump-page="onJumpPage"
      @on-refresh="() => refreshArticlesByTag(true)"
    ></ArticleConditionTemplate>
  </div>
</template>
<script setup lang="ts">
import ArticleConditionTemplate from '@/views/Template/ArticleConditionTemplate.vue'
import { IArticle } from '@/types/api/article.ts'
import { IQueryFindManyOptions } from '@/types/core/index.ts'
import { getArticlesByPage } from '@/api/article.ts'

const route = useRoute()
const page = ref(1)
const limit = ref(3)
const total = ref(0)
const articleList = reactive<IArticle[]>([])
const query: IQueryFindManyOptions<Partial<IArticle>> = {
  withDeleted: false,
  where: {
    category: route.meta.id as any,
  },
}

const refreshArticlesByTag = async (force: boolean = false): Promise<void> => {
  if (force) {
    page.value = 1
  }
  query.where.category = route.meta.id as any;
  const res = await getArticlesByPage(page.value, limit.value, query)
  if (res.success) {
    articleList.length = 0
    articleList.push(...(res.data.list as any[]))
    total.value = res.data.total
  }
}

await refreshArticlesByTag()

const onJumpPage = async (opts: { page: number; limit: number }) => {
  page.value = opts.page
  limit.value = opts.limit
  await refreshArticlesByTag()
}
</script>
<style scoped lang="scss"></style>
