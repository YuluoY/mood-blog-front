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
