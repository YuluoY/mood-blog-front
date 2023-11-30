import { getCode } from '@/api/rest.ts'
import { debounce } from '@/utils/core.ts'

export const useCaptcha = () => {
  const svgHTML = ref('')

  const init = () => {
    getCode().then((res) => {
      svgHTML.value = res.data
    })
  }
  const reflush = debounce(() => init())

  return {
    svgHTML,
    init,
    reflush,
  }
}
