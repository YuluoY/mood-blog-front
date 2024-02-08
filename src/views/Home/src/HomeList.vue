<template>
  <div class="y-homeList">
    <div class="y-homeList__waterfall" ref="waterfall">
      <el-card
        shadow="hover"
        class="y-homeList__item y-flex y-f-col y-f-align-center"
        v-for="item in articleStore.articleList"
        :key="item.id"
      >
        <div class="y-article__img">
          <img v-lazy="item.cover" :alt="item.title" loading="lazy" />
        </div>
        <div class="y-article__info y-flex y-f-align-center y-mt-10">
          <div class="y-article__info--avatar y-mr-6">
            <img v-lazy="userStore.avatar" :alt="userStore.username" loading="lazy" />
          </div>
          <div class="y-ml-6">
            <span>{{ userStore.username }}</span>
          </div>
          <div class="y-ml-10 y-flex-1 y-text-right y-flex y-f-align-center y-f-justify-end">
            <svg-icon name="date" size="1.3" />
            <span class="y-ml-6">{{ dateFormat(item.createdAt, 'YYYY-MM-DD') }}</span>
          </div>
        </div>
        <div class="y-article__title y-mt-10 y-text-center">
          <p
            class="y-underline-trans y-cursor-p y-inline-block"
            @click="() => $emit('onViewArticle', item)"
          >
            {{ item.title }}
          </p>
        </div>
        <div
          class="y-article__desc y-ellipsis-clamp y-clamp-5 y-mt-10"
          v-html="item.description"
        ></div>
        <div class="y-flex y-f-w">
          <div class="y-article__tags y-flex y-f-align-center y-f-w y-mr-10 y-flex-1">
            <!-- <svg-icon name="tag" class="y-mr-6 y-mt-10" /> -->
            <el-tag class="y-mr-6 y-mt-10" v-for="tag in item.tags" :key="tag.id">
              <span>{{ tag.tagName }}</span>
            </el-tag>
          </div>
          <div class="y-flex y-f-align-center y-mt-10">
            <div class="y-flex y-f-align-center y-mr-10">
              <svg-icon name="view" />
              <span class="y-ml-6">{{ item.views.length }}</span>
            </div>
            <!-- <div class="y-flex y-f-align-center y-mr-10">
              <svg-icon name="like" />
              <span class="y-ml-6">{{ item.likes.length }}</span>
            </div> -->
            <div class="y-flex y-f-align-center y-mr-10">
              <svg-icon name="comment" />
              <span class="y-ml-6">{{ item.comments.length }}</span>
            </div>
          </div>
        </div>
        <m-category-tag
          :text="item.category?.cateName"
          :bg-color="item.category?.cateColor"
          :opacity="0.7"
          @click="() => $router.push({ path: `/category/${item.category.cateAlias}` })"
          v-if="item.category?.cateName"
        ></m-category-tag>
      </el-card>
    </div>
    <div class="y-load__more y-flex y-f-justify-center">
      <el-button
        type="primary"
        :disabled="articleStore.total === articleStore.articleList.length"
        plain
        @click="() => $emit('onLoadMore')"
      >
        {{ $t('homeView.loadMoreText') }}
      </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useArticleStore } from '@/store/articleStore.ts'
import { useUserStore } from '@/store/userStore.ts'
import { dateFormat } from '@/utils/dayjs.ts'

defineEmits(['onViewArticle', 'onLoadMore'])

const articleStore = computed(() => useArticleStore())
const userStore = computed(() => useUserStore())
</script>
<style scoped lang="scss">
.y-article__top {
  position: absolute;
  right: 0;
  top: 0;
  width: 40px;
  height: 40px;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: red;
    position: absolute;
    top: 10px;
  }
}

.y-article__info {
  .y-article__info--avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
  }
}

:deep(.el-card) {
  overflow: unset;
}

:deep(.el-card__body) {
  width: inherit;
}

@include b(homeList) {
  width: 100%;
  height: 100%;
}

@include be(homeList, waterfall) {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: unset;
  z-index: 1;
}

@include be(homeList, item) {
  border-radius: 5px;

  // box-shadow: var(--el-box-shadow-light);
  // transition: all 0.3s;
  width: inherit;

  &:hover {
    box-shadow: var(--el-box-shadow);
  }
}
</style>
