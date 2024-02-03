import { getCode } from '@/api/rest.ts'
import { debounce } from '@/utils/core.ts'
import Mitt from '@/plugins/Mitt/index.ts'

export const useCaptcha = () => {
  const svgHTML = ref('')

  const init = () => {
    getCode().then(res => {
      svgHTML.value = res.data
    })
  }

  const refresh = debounce(init);

  Mitt.on('refreshSvgCaptcha', init);

  init();
  return {
    svgHTML,
    refresh,
  }
}
