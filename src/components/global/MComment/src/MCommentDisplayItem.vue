<template>
  <div class="m-comment__row" :id="item.id">
    <div class="m-comment__left">
      <div class="m-comment__left--avatar">
        <img v-lazy="item.avatar" :alt="item.nickname"/>
      </div>
    </div>
    <div class="m-comment__right">
      <div class="m-comment__info">
        <span class="m-comment__info--nicknamne">{{ item.nickname }}</span>
        <span class="m-comment__info--date">{{ dateFormat(item.createdAt) }}</span>
      </div>
      <div class="m-comment__content">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IComment } from '@/types/api/comment.ts'
import { dateFormat } from '@/utils/dayjs.ts';

withDefaults(
  defineProps<{
    item: IComment
  }>(),
  {

  }
)
</script>
<style scoped lang="scss">

.m-comment__row {
  display: flex;

  .m-comment__left {
   // .. 
  }

  .m-comment__right {
    display: flex;
  }
}

</style>
