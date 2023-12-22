import {CSSProperties, onUnmounted} from "vue";
import {injectStyle, injectProp, getStyle} from '@/utils/dom.ts'
import {IUseWaterfallOptions, IUseWaterfallResult} from "../types/index.ts";


export const useWaterfall = (options: Partial<IUseWaterfallOptions>): IUseWaterfallResult => {

    if (!options.container) throw new Error('Waterfall：container is required！');

    const opts: Partial<IUseWaterfallOptions> = reactive(Object.assign(options, {
        column: options.column || 4,
        gap: options.gap || 20,
        isResize: options.isResize || true,
        resizeDelay: options.resizeDelay || 300,
        leftAnimateDelay: options.leftAnimateDelay || 300,
        topAnimateDelay: options.topAnimateDelay || 300,
        animateEase: options.animateEase || 'ease',
    }))

    let children: HTMLCollection = null; // 子元素集合
    let colWidth = 0; // 列宽
    const colHeight: number[] = []; // 列高度

    /**
     * @description 获取列宽
     * @return {number} 列宽
     */
    const getColWidth = (): number => {
        const containerWidth = parseInt(getStyle(opts.container as HTMLElement, 'width'), 10);
        const {column} = opts;
        return (containerWidth - (column - 1) * opts.gap) / column;
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
            overflow: 'hidden',
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
    const initLayout = (o: { force: boolean } = {force: false}): void => {
        // 强制执行，表示重新计算整个瀑布流
        if (o.force) colHeight.length = 0;

        colWidth = getColWidth();
        const {column, gap} = opts;

        let top = 0;
        let left = 0;

        for (let i = 0; i < children.length; i++) {
            const el = children[i] as HTMLElement;

            // eslint-disable-next-line no-continue
            if (el.dataset.loaded === 'true' && !o.force) continue;
            injectStyle(el, 'width', `${colWidth}px`);  // 需要预先设置宽度，高度才能被正确计算

            // eslint-disable-next-line no-use-before-define
            layout(el, i);

            if (o.force) {
                // eslint-disable-next-line no-use-before-define
                setTimeout(() => layout(el, i), 300);
            }
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
                top: `${top}px`,
                left: `${left}px`,
            })
            injectProp(el, 'data-loaded', 'true');
            injectStyle(opts.container as HTMLElement, 'height', `${Math.max(...colHeight)}px`);
        }
    }

    /**
     * @description resize事件处理函数
     * @return {void}
     */
    const handleResize = (): void => {
        clearTimeout(opts.resizeTimer);
        opts.resizeTimer = setTimeout(() => initLayout({force: true}), opts.resizeDelay);
    }

    onMounted(() => {
        // 等待300ms，保证元素完全渲染
        setTimeout(() => {
            initLayout();
            if (opts.isResize) window.addEventListener('resize', handleResize);
        }, 300);
    })

    onUnmounted(() => {
        if (opts.isResize) window.removeEventListener('resize', handleResize);
    });

    return {
        raw: opts,
        colWidth,
        colHeight,
        children,
        
        getColWidth,
    }
}