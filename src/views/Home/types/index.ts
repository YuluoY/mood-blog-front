export interface IWaterfallItem {
    id: number
    width: number
    height: number
    background: string
}

export interface IUseWaterfallOptionsBreakpoint {
    point: number // 断点
    column: number // 列数
    gap: number // 间隙
}

export interface IUseWaterfallOptions {
    container: string | HTMLElement | null // 容器
    column: number // 列数
    gap: number // 间隙
    isResize: boolean // 是否使用resize监听
    isLazy: boolean // 是否使用懒加载
    isLoadingLayer: boolean // 是否使用loading层

    resizeDelay: number // resize延迟时间
    resizeTimer: number // resize定时器

    scrollDelay: number // scroll延迟时间  懒加载使用
    scrollTimer: number // scroll定时器  懒加载使用

    leftAnimateDelay: number // 左侧动画延迟时间
    topAnimateDelay: number // 上侧动画延迟时间
    animateEase: import('vue').CSSProperties['animation-timing-function'] // 动画缓动函数

    breakpoint: Partial<IUseWaterfallOptionsBreakpoint>[] // 断点
}

export interface IUseWaterfallResult {
    raw: Partial<IUseWaterfallOptions>,
    colWidth: number, // 列宽
    colHeight: number[], // 列高度
    children: HTMLCollection, // 子元素集合

    getColWidth: () => number, // 获取列宽
}

