<template>
  <div class="m-comment">
    <div class="m-comment__inner">
      <div class="m-comment__title">
        <h2>发表评论</h2>
      </div>
      <div class="m-comment__form--box">
        <MCommentForm ref="mCommentFormRef">
          <template #prev="{ QQ }">
            <el-form-item :style="{ marginRight: '20px' }">
              <div class="m-comment__form--avatar">
                <img v-lazy="avatar(QQ)" loading="lazy" alt="评论头像" />
              </div>
            </el-form-item>
          </template>
          <template #suffix>
            <el-form-item label="订阅回复">
              <el-tooltip content="开启后会通过邮箱通知你被回复了喔~" effect="light">
                <el-switch v-model="isSubscribe"></el-switch>
              </el-tooltip>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="handlePublishComment">发布评论</el-button>
            </el-form-item>
          </template>
        </MCommentForm>
      </div>
      <div class="m-comment__area--box">
        <MCommentArea
          v-model="commentContent"
          @model-value:update="(val) => (commentContent = val)"
        ></MCommentArea>
      </div>
      <div class="m-comment__display--box">
        <MCommentDisplay></MCommentDisplay>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore.ts'
import { getImageUrl } from '@/utils/core.ts'
import MCommentForm from './MCommentForm.vue'
import MCommentDisplay from './MCommentDisplay.vue'
import MCommentArea from './MCommentArea.vue'

const userStore = useUserStore()

const avatar = (qq: string) => {
  if (qq) {
    return `https://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=100`
  } else {
    return getImageUrl(userStore.avatar)
  }
}
const commentContent = ref('')
const mCommentFormRef = ref<InstanceType<typeof MCommentForm>>()
const isSubscribe = ref(false)
const handlePublishComment = () => {
  // console.log(mCommentFormRef.value.formModelValues, isSubscribe.value, mCommentFormRef.value.QQ)
  console.log(commentContent.value)
}
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
