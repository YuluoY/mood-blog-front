import { CSSProperties, onUnmounted } from "vue";
import { injectStyle, injectProp, getStyle } from '@/utils/dom.ts'
import { IUseWaterfallOptions, IUseWaterfallOptionsBreakpoint, IUseWaterfallResult } from "../types/index.ts";


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
    options = { ...defaultOpts, ...options };
    const opts: Partial<IUseWaterfallOptions> = reactive({
        ...JSON.parse(JSON.stringify(options)), ...defaultOpts
    })

    let children: HTMLCollection = null; // 子元素集合
    let colWidth = 0; // 列宽
    const colHeight: number[] = []; // 列高度

    let matchMedias: { [key: string]: MediaQueryList } = {};

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
    const initLayout = (
        o: { force: boolean; column?: number; gap?: number } = { force: false }): void => {

        const { force, column = opts.column, gap = opts.gap } = o;

        console.log(column, gap)
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
            layout(el, i);

            if (force) {
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


    const changeMedia = (event?: MediaQueryListEvent, item?: Partial<IUseWaterfallOptionsBreakpoint>) => {
        if (event.matches) {
            opts.column = item.column;
            opts.gap = item.gap;
        } else {
            opts.column = options.column;
            opts.gap = options.gap;
        }
    }
    /**
   * @description 断点响应处理
   * @return {}
   */
    const handleBreakpoint = (): void => {
        const { breakpoint } = opts
        if (!breakpoint.length) return;

        // 建立查询
        if (!Object.keys(matchMedias).length) {
            breakpoint.forEach((item: Partial<IUseWaterfallOptionsBreakpoint>) => {
                const mediaQueryList = window.matchMedia(`(max-width:${item.point}px)`);
                mediaQueryList.addEventListener('change', (event) => changeMedia(event, item))
                matchMedias[item.point] = mediaQueryList;
            })
        }
    }

    const removeMatchMediaEventListener = () => {
        Object.keys(matchMedias).forEach((key: string) => {
            matchMedias[key].removeEventListener('change', changeMedia)
        })
    }

    /**
     * @description resize事件处理函数
     * @return {void}
     */
    const handleResize = (): void => {
        clearTimeout(opts.resizeTimer);
        opts.resizeTimer = setTimeout(() => {
            initLayout({ force: true })
        }, opts.resizeDelay);
    }

    onMounted(() => {
        // 等待300ms，保证元素完全渲染
        setTimeout(() => {
            if (opts.breakpoint.length) handleBreakpoint();
            initLayout();
            if (opts.isResize) window.addEventListener('resize', handleResize);
        }, 300);
    })

    onUnmounted(() => {
        if (opts.isResize) window.removeEventListener('resize', handleResize);
        removeMatchMediaEventListener();
    });

    return {
        raw: opts,
        colWidth,
        colHeight,
        children,

        getColWidth,
    }
}