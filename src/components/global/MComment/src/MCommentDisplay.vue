<template>
  <div class="m-comment__display">
    <div class="m-comment__display--title">
      <p v-if="!$slots.title">共{{ total }}条评论</p>
      <slot name="title" v-else></slot>
    </div>
    <div class="m-comment__display--row" v-for="comment in commentList" :key="comment.id">
      <MCommentDisplayItem :item="comment"></MCommentDisplayItem>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IComment } from '@/types/api/comment.ts'

export interface MCommentDisplayItem extends IComment {}

export interface MCommentDisplayProps {
  total: number
  commentList: MCommentDisplayItem[]
}

withDefaults(defineProps<Partial<MCommentDisplayProps>>(), {
  total: 0,
})
</script>
<style scoped lang="scss">
.m-comment__display {
  .m-comment__display--title {
    padding: 20px 20px 10px 0;
    font-size: 2em;
    border-bottom: 1px solid var(--el-border-color);
  }
}
</style>
