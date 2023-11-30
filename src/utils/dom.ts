/**
 * @description: 获取元素样式
 * @param {HTMLElement} element 元素
 * @param {string} styleName 样式名称
 * @return {any}
 */
export const getStyle = (element: HTMLElement, styleName: string): any => {
    if (!element || !styleName) return '';
    return getComputedStyle ? getComputedStyle(element)[styleName as any] : element.style[styleName as any];
}