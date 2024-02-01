<template>
  <div class="y-tag">
    <ArticleConditionTemplate type-text="标签" :article-list="articleList">
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

const route = useRoute()
const tagStore = useTagStore()
const page = ref(1)
const limit = ref(3)
const articleList = ref<IArticle | any>([])

const res = await getArticlesByPage<IArticle>(page.value, limit.value, {
  withDeleted: false,
  tags: [route.params.name],
})

if (res.success) {
  articleList.value = res.data.list as IArticle[]
}

watch(
  () => route.params.name,
  async () => {
    const r = await getArticlesByPage<IArticle>(page.value, limit.value, {
      tags: [route.params.name],
    })
    if (r.success) {
      articleList.value = r.data.list as IArticle[]
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
