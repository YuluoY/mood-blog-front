<template>
  <div class="m-comment__form">
    <el-form inline :style="{ display: 'flex' }">
      <!-- <slot name="prev" :QQ="QQ"></slot> -->
      <el-form-item :style="{ marginRight: '20px' }">
        <div class="m-comment__form--avatar">
          <img v-lazy="getAvatarByQQ(cacheForm.qq)" loading="lazy" alt="评论头像" />
        </div>
      </el-form-item>
      <el-form-item
        v-for="item in form"
        :class="`m-comment__form--${item.prop}`"
        :style="{ flex: 1 }"
        :key="item.prop"
        :label="item.formItem.label"
        :required="item.formItem.required"
      >
        <el-tooltip
          :content="item.tooltip.content"
          :trigger="item.tooltip.trigger"
          :placement="item.tooltip.placement"
          :effect="item.tooltip.effect"
        >
          <el-input
            :type="item.input.type"
            v-model="formModelValues[item.prop]"
            :autofocus="item.input.autofocus"
            :placeholder="item.input.placeholder"
            @blur="() => handleInputBlur(item as MCommentFormPropsItem)"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="订阅回复">
        <el-tooltip content="开启后会通过邮箱通知你被回复了喔~" effect="light">
          <el-switch v-model="isSubscribe"></el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublishNewComment" plain>发布评论</el-button>
      </el-form-item>
    </el-form>
    <MCommentArea v-model="content" @model-value:update="(val) => (content = val)"></MCommentArea>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import { IComment, ICreateComment } from '@/types/api/comment.ts'
import { commentFormMock } from '../mock/index.ts'

export interface MCommentFormPropsItem {
  prop: string
  value: string
  type: 'input' | 'switch' | 'button'
  tooltip: Partial<import('element-plus').ElTooltipProps>
  input: Partial<import('element-plus').InputProps & import('element-plus').InputEmits>
  formItem: Partial<import('element-plus').FormItemProps>
}

export interface MCommentFormProps {
  replyComment: IComment
  form?: Partial<MCommentFormPropsItem>[]
}
defineEmits(['handlePublishNewComment'])
const props = withDefaults(defineProps<Partial<MCommentFormProps>>(), {
  form: () => commentFormMock,
})
const { emit } = getCurrentInstance()
const getAvatarByQQ = inject('getAvatarByQQ') as Function
const articleId = inject('articleId') as string
const cacheForm = inject('cacheForm') as any
const QQ = ref('')
const isSubscribe = ref(false)
const content = ref('')

const formModelValues: {
  [key: string]: any
} = reactive({})
props.form.forEach((item) => {
  formModelValues[item.prop] = cacheForm[item.prop] || ''
})

const getQQInfo = (
  qq: string
): Promise<{
  data: {
    code: number
    msg: string
    data: {
      name: string
      imgUrl: string
    }
  }
}> => {
  return axios.get(`https://api.kit9.cn/api/qq_material/api.php?qq=${qq}`)
}

// 监听表单input失焦后的操作
const handleInputBlur = (item: MCommentFormPropsItem) => {
  if (item.prop === 'nickname') {
    return (async () => {
      const qq = formModelValues[item.prop]
      if (!/^\d+$/.test(qq)) return
      QQ.value = qq
      const res = (await getQQInfo(qq)).data
      if (res.data.name.trim()) {
        formModelValues[item.prop] = res.data.name
      }
    })()
  }
  return true
}

// 发表评论
const onPublishNewComment = () => {
  const defaultForm: Partial<ICreateComment> = {
    qq: QQ.value,
    avatar: getAvatarByQQ(QQ.value),
    content: content.value,
    ...formModelValues,
    isSubscribe: isSubscribe.value,
    article: { id: articleId },
  }

  // 回复评论逻辑
  if (props.replyComment) {
    if (props.replyComment?.children) {
      // 一级评论
      defaultForm.parent = { id: props.replyComment.id }
    } else {
      // 二级评论
      defaultForm.parent = { id: props.replyComment.parent.id }
      defaultForm.reply = { id: props.replyComment.id }
    }
  }

  emit('handlePublishNewComment', defaultForm, () => {
    isSubscribe.value = false
    content.value = ''
  })
}

const cacheFormWatcher = watch(formModelValues, (newVal) => {
  Object.assign(cacheForm, newVal)
  cacheForm.qq = QQ.value
})

onBeforeUnmount(() => {
  cacheFormWatcher()
})

defineExpose({
  formModelValues,
  onPublishNewComment,
})
</script>
<style scoped lang="scss">
.m-comment__form {
  padding-top: 20px;

  .m-comment__form--avatar {
    border-radius: 5px;
    overflow: hidden;
    width: 35px;
    height: 35px;
    margin-left: 10px;
  }
}

:deep(.el-form) {
  display: flex;

  .el-form-item:first-child {
    width: 50px;
    flex: unset;
  }

  .el-form-item:last-child {
    margin-right: 0;
  }
}
</style>
