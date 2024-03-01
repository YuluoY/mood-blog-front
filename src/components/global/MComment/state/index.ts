import { reactive } from 'vue'

const commentFormValues = reactive({
  qq: '',
  nickname: '',
  email: '',
  website: '',
  isSubscribe: false,
  content: '',
})

export { commentFormValues }
