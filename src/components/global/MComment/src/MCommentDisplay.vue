<template>
  <div class="m-comment__display">
    <div class="m-comment__display--title">
      <p v-if="!$slots.title">共{{ total }}条评论</p>
      <slot name="title" v-else></slot>
    </div>
    <div class="m-comment__display--content" id="commentDisplayContent">
      <div class="m-comment__display--row" v-for="comment in commentList" :key="comment.id">
        <MCommentDisplayItem :item="comment"></MCommentDisplayItem>
      </div>
    </div>
    <div class="m-comment__display--pagination">
      <el-pagination
        v-if="commentList.length && total > limit"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="com.page"
        :page-size="limit"
        @current-change="(val: number) => $emit('changePage', val)"
      ></el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IComment } from '@/types/api/comment.ts'

export interface MCommentDisplayProps {
  total: number
  page: number
  limit: number
  isPagination: boolean
  commentList: IComment[]
}

defineEmits(['changePage'])

const props = withDefaults(defineProps<Partial<MCommentDisplayProps>>(), {
  total: 0,
  isPagination: true,
})
const com = reactive({ ...props })
const commentList = reactive([...props.commentList])

watchEffect(() => {
  com.page = props.page
  commentList.length = 0
  commentList.push(...(props.commentList as any))
})

provide('commentList', commentList)
</script>
<style scoped lang="scss">
.m-comment__display {
  .m-comment__display--title {
    padding: 20px 20px 10px 0;
    font-size: 2em;
    border-bottom: 1px solid var(--el-border-color);
  }

  .m-comment__row--sub {
    padding-bottom: 10px;
  }

  .m-comment__display--pagination {
    padding-top: 50px;
    padding-left: 10px;
  }
}
</style>
