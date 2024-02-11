<template>
  <div class="m-comment__form">
    <el-form inline :style="{ display: 'flex' }">
      <slot name="prev"></slot>
      <el-form-item
        v-for="(item, index) in form"
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
            v-model="formModelValues[index][item.prop]"
            :autofocus="item.input.autofocus"
            :placeholder="item.input.placeholder"
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <slot name="suffix"></slot>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'

export interface MCommentFormPropsItem {
  prop: string
  value: string
  tooltip: Partial<import('element-plus').ElTooltipProps>
  input: Partial<import('element-plus').InputProps & import('element-plus').InputEmits>
  formItem: Partial<import('element-plus').FormItemProps>
}

export interface MCommentFormProps {
  form?: Partial<MCommentFormPropsItem>[]
}

const props = withDefaults(defineProps<MCommentFormProps>(), {
  form: () => [
    {
      prop: 'nickname',
      formItem: { label: '', required: true },
      tooltip: {
        content: '输入QQ号将自动拉取昵称和头像喔~',
        trigger: 'click',
        placement: 'bottom-start',
        effect: 'light',
      },
      input: {
        type: 'text',
        autofocus: true,
        placeholder: '昵称（必填）',
        blur: (item) => {
          console.log(item)

          return true
        },
      },
    },
    {
      prop: 'address',
      formItem: { label: '' },
      tooltip: {
        content: '用于接收回复邮件',
        trigger: 'click',
        placement: 'bottom-start',
        effect: 'light',
      },
      input: {
        type: 'text',
        placeholder: '邮箱（可选）',
      },
    },
    {
      prop: 'website',
      formItem: { label: '' },
      tooltip: {
        content: '可以给我参观一下你的博客站吗？🤭',
        trigger: 'click',
        placement: 'bottom-start',
        effect: 'light',
      },
      input: {
        type: 'text',
        placeholder: 'http://（可选）',
      },
    },
  ],
})

const formModelValues = reactive<{
  [key: string]: any
}>(
  props.form.map((item) => {
    return {
      [item.prop]: '',
    }
  })
)

const getQQInfo = (
  qq: string
): Promise<{
  code: number
  msg: string
  data: {
    name: string
    imgUrl: string
  }
}> => {
  return axios.get(`https://api.kit9.cn/api/qq_material/api.php?qq=${qq}`)
}

defineExpose({
  formModelValues,
})
</script>
<style scoped lang="scss">
.m-comment__form {
  padding-top: 20px;
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
