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
            <h2>
              {{
                `${
                  $route.params.name || $t(`head.nav.${String($route.name)}`)
                }${typeText}下的文章（${total}）`
              }}
            </h2>
          </el-card>
        </div>
        <template v-if="articleList.length">
          <div class="y-template__list">
            <template v-if="styleIndex === '1'">
              <ArticleItemStyleOne
                v-for="article in articleList"
                :key="article.id"
                :article="article"
                :is-category-tag="isCategoryTag"
                @hanlde-category-tag-click="hanldeCategoryTagClick"
              ></ArticleItemStyleOne>
            </template>
          </div>
        </template>
        <template v-else>
          <div
            class="y-f-center y-fs-30"
            :style="{
              flex: 1,
            }"
          >
            <p>暂无文章！</p>
          </div>
        </template>
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
      <div class="y-template__sidebar" v-if="isSidebar">
        <!-- <slot name="sidebar"></slot> -->
        <HomeSidebar
          :is-love-show="isLoveShow"
          :is-personal-show="isPersonalShow"
          :is-tag-cloud-show="isTagCloudShow"
        ></HomeSidebar>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IArticle } from '@/types/api/article.ts'
import { IPaginationRequest } from '@/types/core/index.ts'
import { HomeSidebar } from '@/views/Home/index.ts'
import ArticleItemStyleOne from './ArticleItemStyleOne.vue'
import { IHomeSidebarProps } from '../Home/src/HomeSidebar.vue'


export interface IArticleConditionTemplate extends IHomeSidebarProps {
  articleList: IArticle[]
  typeText: string
  styleIndex: string
  total: number
  page: number
  limit: number
  isSidebar: boolean
  isCategoryTag: boolean
}

defineEmits(['onJumpPage', 'onRefresh'])
const { emit } = getCurrentInstance()
const route = useRoute()
const router = useRouter();
const props = withDefaults(defineProps<Partial<IArticleConditionTemplate>>(), {
  articleList: () => [],
  typeText: '',
  styleIndex: '1',
  isSidebar: true,
  isLoveShow: true,
  isPersonalShow: true,
  isTagCloudShow: true,
  isCategoryTag: true,
})
const currentPage = ref(props.page)
const pageSize = ref(props.limit)

const handleJump = (page: number) => {
  emit('onJumpPage', {
    page,
    limit: props.limit,
  } as IPaginationRequest)
}

const onRefreshWatcher = watch(
  () => route.path,
  () => {
    currentPage.value = 1
    emit('onRefresh')
  }
)
const changeCurrentPage = (val: number) => {
  currentPage.value = val
}

const hanldeCategoryTagClick = (path: string) => {
  router.push({
    path: `/category/${path}`,
  })
}

defineExpose({
  changeCurrentPage,
  currentPage,
  pageSize,
  handleJump,
})

onBeforeUnmount(() => {
  onRefreshWatcher()
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
