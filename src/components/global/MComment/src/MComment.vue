<template>
  <div class="m-comment">
    <div class="m-comment__inner">
      <div class="m-comment__title">
        <h2>发表评论</h2>
      </div>
      <div class="m-comment__form--box">
        <MCommentForm>
          <template #prev>
            <el-form-item :style="{ marginRight: '20px' }">
              <div class="m-comment__form--avatar">
                <img v-lazy="getImageUrl(userStore.avatar)" loading="lazy" alt="评论头像" />
              </div>
            </el-form-item>
          </template>
        </MCommentForm>
      </div>
      <div class="m-comment__area--box">
        <MCommentArea></MCommentArea>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore.ts'
import { getImageUrl } from '@/utils/core.ts'

const userStore = useUserStore()
</script>
<style scoped lang="scss">
.m-comment {
  width: 100%;
  height: 100%;
  padding: 40px 0 20px;

  .m-comment__inner {
    .m-comment__title {
      h2 {
        font-size: 2em;
      }
    }

    .m-comment__form--avatar {
      border-radius: 5px;
      overflow: hidden;
      width: 35px;
      height: 35px;
      margin-left: 10px;
    }
  }
}
</style>
