<template>
  <div class="m-timeline__item">
    <div class="m-timeline-item__inner">
      <el-card shadow="hover" :body-style="{ padding: '20px', flexDirection: 'column' }">
        <div class="m-timeline-item__title y-text-center">
          <h2>{{ item.title }}</h2>
        </div>
        <el-space class="m-timeline-item__info y-mt-10 y-mb-10 y-flex y-f-justify-center">
          <el-space class="m-timeline-info__author">
            <svg-icon name="author" />
            <span>{{ item.author }}</span>
          </el-space>
          <el-space class="m-timeline-info__date">
            <svg-icon name="date" />
            <span>{{ item.date }}</span>
          </el-space>
          <el-space class="m-timeline-info__view">
            <svg-icon name="view" />
            <span>{{ item.viewCount }}</span>
          </el-space>
          <el-space class="m-timeline-info__like">
            <svg-icon name="like" />
            <span>{{ item.likeCount }}</span>
          </el-space>
          <el-space class="m-timeline-info__comment">
            <svg-icon name="comment" />
            <span>{{ item.commentCount }}</span>
          </el-space>
          <el-space class="m-timeline-info__tags">
            <svg-icon name="tag" />
            <span>{{ item.tags.map((t: any) => t.tagName).join('，') }}</span>
          </el-space>
          <el-space class="m-timeline-info__category">
            <svg-icon name="category" />
            <span>{{ item.category.cateName }}</span>
          </el-space>
        </el-space>
        <div class="m-timeline-item__desc">
          <p class="y-ellipsis-clamp y-clamp-3 y-text-center">{{ item.description }}</p>
        </div>
        <div class="m-timeline-item__more y-mt-10 y-text-center">
          <el-button
            class="m-timeline-item__moreBtn y-cursor-p"
            plain
            @click="() => $emit('onMore', item.id)"
          >
            阅读全文
          </el-button>
        </div>
        <slot name="suffix" :row="item"></slot>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { MTimelineItemProps } from '../types/index.ts'

withDefaults(defineProps<Partial<MTimelineItemProps>>(), {
  order: 'ASC',
})

defineEmits(['onMore'])
</script>
<style scoped lang="scss">
.m-timeline__item {
  width: 100%;
  height: auto;
  padding: 10px 0 10px 40px;

  .m-timeline-item__inner {
    width: 100%;
    height: auto;
    position: relative;

    .m-timeline-item__title {
      h2 {
        font-size: 2em;
        font-weight: 500;
        font-family: fantasy;
      }
    }

    .m-timeline-item__desc {
      p {
        line-height: 2;
      }
    }
  }
}
</style>
