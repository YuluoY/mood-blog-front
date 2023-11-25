import { createI18n } from 'vue-i18n'
import zh from '@/lang/zh/index.ts'
import en from '@/lang/en/index.ts'

const i18n = createI18n({
  locale: 'zh',
  messages: {
    zh,
    en,
  },
})

export default i18n
