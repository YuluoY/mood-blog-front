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
import { useTagStore } from '@/store/tagStore.ts'
import ArticleConditionTemplate from '@/views/Template/ArticleConditionTemplate.vue'
import { HomeSidebar } from '@/views/Home/index.ts'
import { getArticlesByPage } from '@/api/article.ts'
import { IArticle } from '@/types/api/article.ts'
import { IPaginationRequest, IQueryFindManyOptions } from '@/types/core/index.ts'

const route = useRoute()
const tagStore = useTagStore()
const page = ref(1)
const limit = ref(3)
const total = ref(0)
const articleList = ref<IArticle | any>([])
const query: IQueryFindManyOptions = {
  withDeleted: false,
  where: {
    tags: [route.params.name] as any,
  },
}

const res = await getArticlesByPage<IArticle>(page.value, limit.value, query)

if (res.success) {
  articleList.value = res.data.list as IArticle[]
  total.value = res.data.total
}

const onJumpPage = async (opts: { page: number; limit: number }) => {
  const r = await getArticlesByPage<IArticle>(opts.page, opts.limit, query)
  if (r.success) {
    articleList.value = r.data.list
    total.value = r.data.total
  }
}

watch(
  () => route.params.name,
  async () => {
    const r = await getArticlesByPage<IArticle>(page.value, limit.value, query)
    if (r.success) {
      articleList.value = r.data.list as IArticle[]
      total.value = r.data.total
    }
  }
)
</script>
<style scoped lang="scss">
.y-tag {
  width: 100%;
  height: 100%;
}
</style>
