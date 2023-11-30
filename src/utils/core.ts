/**
 * @description: 防抖
 * @param {Function} fn  回调函数
 * @param {number} delay 间隔时间  默认500ms
 * @return {Function} inner 闭包函数
 * @example debounce(() => console.log('hello'), 1000)()
 */
export function debounce(fn: Function, delay: number = 500): Function {
  let timer: number
  return function inner(this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * @description: 节流
 * @param {Function} fn  回调函数
 * @param {number} delay 间隔时间
 * @return {Function} inner 闭包函数
 * @example throttle(() => console.log('hello'), 1000)()
 */
export function throttle(fn: Function, delay: number = 500): Function {
  let timer: number
  return function inner(this: any, ...args: any[]) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * @description: 获取图片地址
 * @param {string} path 图片路径 例如：'logo.png' 或者 'http://xxx.com/logo.png'
 * @return {string} {图片地址
 */
export function getImageUrl(path: string): string {
  if (path && /^(http|https|data):\/\//.test(path)) {
    return new URL(path, import.meta.url).href
  }
  return new URL(`../assets/images/${path}`, import.meta.url).href
}

/**
 * @description: 切换主题
 * @param {string} theme 主题名称
 * @return {void}
 */
export const switchTheme = (theme: string): void => {
  const html = document.querySelector('html')
  html.className = ''
  if (theme) html.classList.add(theme)
}

/**
 * @description: 切换语种
 * @param {string} language 语种缩写
 * @return {void}
 */
export const switchLanguage = (language: string): void => {
  const { locale } = useI18n();
  locale.value = language;
}