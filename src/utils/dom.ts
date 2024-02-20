import { CSSProperties } from "vue";

/**
 * @description: 获取元素样式
 * @param {HTMLElement} element 元素
 * @param {string} styleName 样式名称
 * @return {any}
 */
export const getStyle = (element: HTMLElement, styleName: string): any => {
    return getComputedStyle ? getComputedStyle(element).getPropertyValue(styleName) : element.style[styleName as any];
}


/**
 * @description: 设置元素样式
 * @param {HTMLElement} el 元素
 * @param {string} key 样式名称 | 样式对象
 * @param {string} value 样式值
 * @return {void}
 */
export const injectStyle = (el: HTMLElement, key: string | CSSProperties, value?: string):void => {
    if(typeof key === 'string') {
        el.style[key as any] = value;
    }else {
        Object.keys(key).forEach((k) => {
            // @ts-ignore
            el.style[k as any] = key[k];
        })
    }
}

/**
 * @description: 设置元素属性
 * @param {HTMLElement} el  元素
 * @param {string} key 属性名称 | 属性对象
 * @param {string} value 属性值
 * @return {void}
 */
export const injectProp = (el: HTMLElement, key: string | CSSProperties, value?: string):void => {
    if(typeof key === 'string') {
        el.setAttribute(key, value);
    }else {
        Object.keys(key).forEach((k) => {
            // @ts-ignore
            el.setAttribute(k, key[k]);
        })
    }
}

/**
 * @description: dom显示区域比例监听
 * @param {HTMLElement} element 元素
 * @param {Function} callback 回调函数
 * @param {number} threshold 比例阈值
 * @return {Function} 返回销毁函数
 * @example  const removeObserver = useIntersectionObserver(el, () => {}, 0.5)
 */
export const useIntersectionObserver = (element: HTMLElement, callback: Function, threshold: number): Function => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio >= threshold) {
                callback();
            }
        });
    }, {
        threshold
    });
    observer.observe(element);
    return () => observer.disconnect();
}
