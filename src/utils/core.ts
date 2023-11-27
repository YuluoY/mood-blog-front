// 防抖
export function debounce(fn: Function, delay: number) {
  let timer: number
  return function inner(this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 节流
export function throttle(fn: Function, delay: number) {
  let timer: number
  return function inner(this: any, ...args: any[]) {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
