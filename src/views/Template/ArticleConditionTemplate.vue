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
            layout="prev, pager, next"
            :total="total"
            v-model:page-size="pageSize"
            v-model:current-page="currentPage"
            prev-text="上一页"
            next-text="下一页"
            @prev-click="(value: number) => handleJump(value, 0)"
            @next-click="(value: number) => handleJump(value, 1)"
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
import { EnumStatus, IPaginationRequest, IQueryFindManyOptions } from '@/types/core/index.ts'
import ArticleItemStyleOne from './ArticleItemStyleOne.vue'

defineEmits(['onJumpPage'])

const { emit } = getCurrentInstance()
const route = useRoute()

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

const handleJump = (value: number, sign: number) => {
  emit('onJumpPage', {
    page: sign ? value + 1 : value - 1,
    limit: props.limit,
  } as IPaginationRequest)
}
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