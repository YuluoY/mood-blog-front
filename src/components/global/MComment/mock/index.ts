
export const commentFormMock: Partial<import("../src/MCommentForm.vue").MCommentFormPropsItem>[] = [
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
    },
  },
  {
    prop: 'email',
    formItem: { label: '' },
    tooltip: {
      content: '用于接收回复邮件',
      trigger: 'click',
      placement: 'bottom-start',
      effect: 'light',
    },
    input: {
      type: 'text',
      placeholder: '邮箱（必填）',
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
]