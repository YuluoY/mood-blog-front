import { CSSProperties, onUnmounted } from "vue";
import { injectStyle, injectProp, getStyle } from '@/utils/dom.ts'
import { IUseWaterfallOptions, IUseWaterfallResult } from "../types/index.ts";


export const useWaterfall = (options: Partial<IUseWaterfallOptions>): IUseWaterfallResult => {

    if (!options.container) throw new Error('Waterfall：container is required！');

    const defaultOpts: Partial<IUseWaterfallOptions> = {
        column: 4,
        gap: 20,
        isResize: true,
        resizeDelay: 500,
        leftAnimateDelay: 300,
        topAnimateDelay: 300,
        animateEase: 'ease'
    }
    // options保留默认设置和用户参数设置
    options = { ...defaultOpts, ...options };

    // opts用于动态更改设置
    const opts: Partial<IUseWaterfallOptions> = reactive({
        ...JSON.parse(JSON.stringify(options)), ...defaultOpts
    })

    let children: HTMLCollection = null; // 子元素集合
    let colWidth = 0; // 列宽
    let containerObserver: MutationObserver = null; // 容器监测
    const colHeight: number[] = []; // 列高度

    /**
     * @description 获取列宽
     * @return {number} 列宽
     */
    const getColWidth = (): number => {
        const containerWidth = parseInt(getStyle(opts.container as HTMLElement, 'width'), 10);
        const { column, gap } = opts;
        return (containerWidth - (column - 1) * gap) / column;
    }

    onMounted(() => {
        if (typeof opts.container === 'string') {
            opts.container = document.querySelector(opts.container) as HTMLElement;
        }
        colWidth = getColWidth();
        const containerStyle: CSSProperties = {
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'unset',
            boxSizing: 'content-box',
            paddingBottom: `${opts.gap}px`,
        }
        const itemStyle: CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            transition: `left ${opts.leftAnimateDelay}ms ${opts.animateEase}, top ${opts.topAnimateDelay}ms ${opts.animateEase}`,
            zIndex: 1,
            width: `${colWidth}px`,
        }

        children = opts.container.children;
        injectStyle(opts.container, containerStyle);
        Array.from(children).forEach((item: any, index: number) => {
            injectStyle(item, itemStyle);
            injectProp(item, 'data-loaded', 'false');
            injectProp(item, 'data-index', index.toString());
        });
    })

    /**
     * @description 初始化布局
     * @param {object} o - 参数
     * @param {boolean} o.force - 是否强制执行 默认false 为true时会重新计算整个瀑布流
     * @return {void}
     */
    const initLayout = (
        o: { force: boolean; column?: number; gap?: number } = { force: false }): void => {

        const { force, column = opts.column, gap = opts.gap } = o;

        // 强制执行，表示重新计算整个瀑布流
        if (force) colHeight.length = 0;

        colWidth = getColWidth();

        let top = 0;
        let left = 0;

        for (let i = 0; i < children.length; i++) {
            const el = children[i] as HTMLElement;

            // eslint-disable-next-line no-continue
            if (el.dataset.loaded === 'true' && !force) continue;

            injectStyle(el, 'width', `${colWidth}px`);  // 需要预先设置宽度，高度才能被正确计算

            // eslint-disable-next-line no-use-before-define
            setTimeout(() => layout(el, i), 300);
        }

        function layout(el: HTMLElement, i: number) {
            const height = el.clientHeight || parseInt(getStyle(el, 'height'), 10);
            if (i >= column) {
                const minIndex = colHeight.indexOf(Math.min(...colHeight));
                top = colHeight[minIndex] + gap;
                left = minIndex * colWidth + gap * minIndex;
                colHeight[minIndex] = top + height;
            } else {
                colHeight[i] = height;
                top = 0;
                left = i * colWidth + gap * i;
            }
            injectStyle(el, {
                position: 'absolute',
                top: `${top}px`,
                left: `${left}px`,
            })
            injectProp(el, 'data-loaded', 'true');
            injectStyle(opts.container as HTMLElement, 'height', `${Math.max(...colHeight)}px`);
        }
    }


    /**
     * @description: 处理响应宽度断点
     * @return {void}
     */
    const processBreakpoint = (): void => {
        if (opts.breakpoint.length) {
            opts.breakpoint.forEach(item => {
                if (window.innerWidth <= item.point) {
                    opts.column = item.column || options.column;
                    opts.gap = item.gap || options.gap;
                }
            })
            // 如果当前宽度比断点最大值还大，就恢复默认
            if (window.innerWidth > opts.breakpoint[0].point) {
                opts.column = options.column;
                opts.gap = options.gap;
            }
        }
    }

    /**
     * @description: 监测容器的子项，处理新增项
     * @return {void}
     */
    const processContainerObserver = (): void => {
        containerObserver = new MutationObserver(() => {
            initLayout();
        });
        containerObserver.observe(opts.container as HTMLElement, {
            subtree: false,
            attributes: false,
            characterData: false,
            childList: true
        });
    }


    /**
     * @description resize事件处理函数
     * @return {void}
     */
    const handleResize = (): void => {
        clearTimeout(opts.resizeTimer);
        opts.resizeTimer = setTimeout(() => {
            processBreakpoint();
            initLayout({ force: true });
        }, opts.resizeDelay);
    }

    onMounted(() => {
        // 等待300ms，保证元素完全渲染
        setTimeout(() => {
            processContainerObserver();
            if (opts.breakpoint.length) processBreakpoint();
            initLayout();
            if (opts.isResize) window.addEventListener('resize', handleResize);
        }, 300);
    })

    onUnmounted(() => {
        if (opts.isResize) window.removeEventListener('resize', handleResize);
        if (containerObserver) containerObserver.disconnect();
    });

    return {
        raw: opts,
        colWidth,
        colHeight,
        children,

        getColWidth,
    }
}