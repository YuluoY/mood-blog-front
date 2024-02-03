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
        <div class="y-template__pagination y-mt-40 y-mb-40 y-flex y-f-justify-center">
          <el-pagination
            background
            v-if="total > limit"
            layout="prev, pager, next"
            :total="total"
            v-model:page-size="pageSize"
            v-model:current-page="currentPage"
            prev-text="上一页"
            next-text="下一页"
            @current-change="handleJump"
          />
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
import { IPaginationRequest } from '@/types/core/index.ts'
import ArticleItemStyleOne from './ArticleItemStyleOne.vue'

defineEmits(['onJumpPage'])

const { emit } = getCurrentInstance()

const props = withDefaults(
  defineProps<
    Partial<{
      articleList: IArticle[]
      typeText: string
      styleIndex: string
      total: number
      page: number
      limit: number
    }>
  >(),
  {
    articleList: () => [],
    typeText: '',
    styleIndex: '1',
  }
)

const currentPage = ref(props.page)
const pageSize = ref(props.limit)

const handleJump = (page: number) => {
  emit('onJumpPage', {
    page,
    limit: props.limit,
  } as IPaginationRequest)
}

// watch(
//   () => props.page,
//   (newVal) => {
//     currentPage.value = newVal
//   }
// )
const changeCurrentPage = (val:number)=>{
  currentPage.value = val;
}

defineExpose({
  changeCurrentPage,
  currentPage,
  pageSize,
  handleJump,
})
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

:deep(.el-pagination) {
  width: 100%;

  .el-pager {
    flex: 1;
    justify-content: center;
  }
}
</style>
