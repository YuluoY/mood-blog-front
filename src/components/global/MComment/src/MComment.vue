<template>
  <div class="m-comment">
    <div class="m-comment__inner">
      <div class="m-comment__title">
        <h2>发表评论</h2>
      </div>
      <div class="m-comment__form--box">
        <MCommentForm
          ref="mCommentFormRef"
          @handlePublishNewComment="handlePublishNewComment"
        ></MCommentForm>
      </div>
      <div class="m-comment__area--box">
        <MCommentArea
          v-model="commentContent"
          @model-value:update="(val) => (commentContent = val)"
        ></MCommentArea>
      </div>
      <div class="m-comment__display--box">
        <MCommentDisplay
          :comment-list="commentList"
          :total="totalComment"
          :page="com.page"
          :limit="com.limit"
          @changePage="handleChangePage"
        ></MCommentDisplay>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore.ts'
import { getImageUrl } from '@/utils/core.ts'
import { IComment, ICreateComment } from '@/types/api/comment.ts'
import { useGlobalStore } from '@/store/globalStore.ts'
import { create, getListByPage } from '@/api/rest.ts'
import { DatabaseTableName, IQueryFindManyOptions } from '@/types/core/index.ts'
import { ElMessage } from 'element-plus'
import MCommentForm from './MCommentForm.vue'
import MCommentDisplay from './MCommentDisplay.vue'
import MCommentArea from './MCommentArea.vue'

export interface MCommentProps {
  articleId: string
  page?: number
  limit?: number
}

const props = withDefaults(defineProps<MCommentProps>(), {
  articleId: '',
  page: 1,
  limit: 5,
})

const userStore = useUserStore()
const globalStore = useGlobalStore()

const getAvatarByQQ = (qq: string) => {
  if (qq) {
    return `https://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=100&t=${Date.now()}`
  } else {
    return getImageUrl(userStore.avatar)
  }
}

const commentContent = ref('')
const mCommentFormRef = ref<InstanceType<typeof MCommentForm>>()
const commentForm: ICreateComment = {
  qq: mCommentFormRef.value.QQ,
  avatar: getAvatarByQQ(mCommentFormRef.value.QQ || null),
  content: commentContent.value,
  nickname: mCommentFormRef.value.formModelValues.nickname || '',
  email: mCommentFormRef.value.formModelValues.email || '',
  website: mCommentFormRef.value.formModelValues.website || '',
  isSubscribe: mCommentFormRef.value.isSubscribe,
  article: { id: props.articleId },
}
const handlePublishNewComment = async (form: ICreateComment) => {
  if (globalStore.loginStatus) {
    form.user = { id: userStore.id }
  } else {
    form.visitor = { id: globalStore.visitor.id }
  }
  const res = await create<ICreateComment, IComment>(DatabaseTableName.COMMENT, form)
  if (res.success) {
    ElMessage({
      type: 'success',
      message: '评论发表成功！',
    })
    // commentContent.value = ''

    mCommentFormRef.value.isSubscribe = false
  }
}

const com = reactive({ ...props })
const commentList = reactive([])
const totalComment = ref(0)
const getCommentsByPage = async (aId: string, currentPage: number, pageSize: number) => {
  const query: IQueryFindManyOptions = {
    where: { article: { id: aId } },
    relations: ['parent', 'children'],
  }
  query.relations.push(globalStore.loginStatus ? 'user' : 'visitor')
  const res = await getListByPage<IComment>(DatabaseTableName.COMMENT, currentPage, pageSize, query)

  if (res.success) {
    commentList.length = 0
    commentList.push(...res.data.list)
    totalComment.value = res.data.total
  }
}

await getCommentsByPage(com.articleId, com.page, com.limit)

const handleChangePage = async (currentPage: number) => {
  com.page = currentPage
  await getCommentsByPage(com.articleId, currentPage, com.limit)
}

watchEffect(() => {
  com.articleId = props.articleId
  com.page = props.page
  com.limit = props.limit
})

provide('getAvatarByQQ', getAvatarByQQ)
provide('articleId', com.articleId)
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
  }
}
</style>
