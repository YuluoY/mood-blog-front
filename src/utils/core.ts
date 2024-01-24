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
    timer = setTimeout(async () => {
      await fn.apply(this, args)
    }, delay)
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
    timer = setTimeout(async () => {
      await fn.apply(this, args)
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
  if (theme) html.classList.add(theme);
}

/**
 * @description: 切换语种
 * @param {string} language 语种缩写
 * @return {void}
 * @example switchLanguage('zh-cn') // 切换为中文简体
 * @example switchLanguage('en') // 切换为英文
 */
export const switchLanguage = (language: string): void => {
  const { locale } = useI18n();
  locale.value = language;
}

/**
 * @description: 判断是否是邮箱
 * @param {string} email 邮箱
 * @return {boolean}
 * @example isEmail('56123@qq.com') // true
 * @example isEmail('56123') // false
 */
export const isEmail = (email: string): boolean => {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}

/**
 * @description: 判断是否是手机号
 * @param {string} mobile 手机号
 * @return {boolean}
 * @example isMobile('18888888888') // true 
 * @example isMobile('1888888888') // false
 */
export const isMobile = (mobile: string): boolean => {
  return /^1[3456789]\d{9}$/.test(mobile)
}

/**
 * @description: 判断是否是外部链接
 * @param {string} path 路径
 * @return {boolean}
 * @example isExternal('https://xxx.com') // true
 * @example isExternal('xxx.com') // false
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @description: 判断是否是URL
 * @param {string} path 路径
 * @return {boolean}
 * @example isUrl('https://xxx.com') // true
 * @example isUrl('xxx.com') // false
 */
export const isUrl = (path: string): boolean => {
  return /^https?:\/\//.test(path)
}

/**
 * @description: 判断是否无效值，包括空对象、空数组
 * @param {any} value 值
 * @return {boolean}
 * @example isEmpty([]) // true
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && !value.trim()) return true
  if (Array.isArray(value) && !value.length) return true
  if (value instanceof Object && !Object.keys(value).length) return true
  return false
}

/**
 * @description: 获取类型
 * @param {any} value 值
 * @return {string}
 * @example getType([]) // 'Array'
 * @example getType({}) // 'Object'
 * @example getType('') // 'String'
 * @example getType(1) // 'Number'
 */
export const getType = (value: any): string => {
  return Object.prototype.toString.call(value).slice(8, -1)
}
/**
 * @description: 提取字符串中的最前面的数字，并转换为数字类型
 * @param {string} value 字符串
 * @return {number} 数字 
 * @example toNumber('123abc') // 123
 */
export const toNumber = (value: string): number => {
  const reg = /\d+/;
  return Number(reg.exec(value)?.[0])
}

/**
 * @description: 字符串首字母大写
 * @param {string} value 字符串
 * @return {string} 
 */
export const firstToUpperCase = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * @description: 去掉文本首尾的空白
 * @param {string} value 字符串
 * @param {string} pos 可选择去掉首部还是尾部的空白
 * @return {string}
 */
export const toTrim = (value: string, pos?: 'start' | 'end'): string => {
  if (!value.length) return value;
  if (pos === 'start') return value.trimStart();
  if (pos === 'end') return value.trimEnd();
  return value.trim();
}

/**
 * @description: 浏览器空闲时执行的回调
 * @param {Function} cb  需要执行的回调函数
 * @return {number}  返回空闲时间  ms
 */
export const idleCallback = async (cb: Function): Promise<number> => {
  if (!window) return -1;
  return new Promise((resolve) => {
    const start = Date.now();
    window.requestAnimationFrame(() => {
      const diff = Date.now() - start;
      if (diff < 16.6) {
        cb();
        resolve(diff);
      } else {
        resolve(diff)
      }
    })
  })
}

/**
 * @description: 去掉所有空格，返回纯文本内容
 * @param {string} str 字符串
 * @return {string}
 */
export const preText = (str: string): string => {
  const reg = /\s+/g;
  return str.replace(reg, '');
}


/**
 * @description：将字符串颜色名称转换成十六进制颜色
 * @param {string} colorName 颜色名称
 * @return {string} 
 */
export const colorStringToHex = (colorName: string) => {
  // 创建一个临时 DOM 元素（用于计算颜色值）
  let tempElement = document.createElement("div");
  tempElement.style.color = colorName;
  tempElement.style.display = 'none';
  document.body.appendChild(tempElement);

  // 获取计算后的颜色值
  let computedColor = window.getComputedStyle(tempElement).color;

  // 从计算后的颜色值中提取 RGB 部分
  let rgbArray = computedColor.match(/\d+/g);

  // 将 RGB 转换为十六进制
  let hexColor = "#";
  for (let i = 0; i < 3; i++) {
    hexColor += (`0${parseInt(rgbArray[i], 10).toString(16)}`).slice(-2);
  }

  // 移除临时元素
  document.body.removeChild(tempElement);

  return hexColor;
}