<template>
  <div class="y-tag">
    <ArticleConditionTemplate
      type-text="标签"
      :article-list="articleList"
      :total="total"
      :page="page"
      :limit="limit"
      @on-jump-page="onJumpPage"
    >
      <template #sidebar>
        <HomeSidebar :is-love-show="false"></HomeSidebar>
      </template>
    </ArticleConditionTemplate>
  </div>
</template>
<script setup lang="ts">
import ArticleConditionTemplate from '@/views/Template/ArticleConditionTemplate.vue'
import { HomeSidebar } from '@/views/Home/index.ts'
import { getArticlesByPage } from '@/api/article.ts'
import { IArticle } from '@/types/api/article.ts'
import {
  IQueryFindManyOptions,
} from '@/types/core/index.ts'

const route = useRoute()
const page = ref(1)
const limit = ref(3)
const total = ref(0)
const articleList = reactive<IArticle[]>([])
const query: IQueryFindManyOptions<Partial<IArticle>> = {
  withDeleted: false,
  where: {
    tags: [route.params.name] as any,
  },
}

const refreshArticlesByTag = async (): Promise<void> => {
  const res = await getArticlesByPage(page.value, limit.value, query);
  if(res.success) {
    articleList.length = 0;
    articleList.push(...res.data.list as any[])
    total.value = res.data.total;
  }
}

await refreshArticlesByTag()

const onJumpPage = async (opts: { page: number; limit: number }) => {
  page.value = opts.page;
  limit.value = opts.limit;
  await refreshArticlesByTag()
}

const tagNameWatcher = watch(
  () => route.params.name,
  async () => {
    if (query?.where) {
      query.where.tags = [route.params.name] as any
    }
    await refreshArticlesByTag()
  }
)

onBeforeUnmount(() => {
  tagNameWatcher()
})
</script>
<style scoped lang="scss">
.y-tag {
  width: 100%;
  height: 100%;
}
</style>
