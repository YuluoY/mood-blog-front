/**
 * @description: 获取元素样式
 * @param {HTMLElement} element 元素
 * @param {string} styleName 样式名称
 * @return {any}
 */
export const getStyle = (element: HTMLElement, styleName: string): any => {
    if (!element || !styleName) return '';
    return getComputedStyle ? getComputedStyle(element).getPropertyValue(styleName) : element.style[styleName as any];
}

/**
 * @description: 注入元素样式
 * @param {HTMLElement} element 元素
 * @param {string} key  样式名称
 * @param {string} value  样式值
 * @return {void}
 */
export const injectStyle = (element: HTMLElement, key: string, value: string): void => {
    element?.style.setProperty(key, value);
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