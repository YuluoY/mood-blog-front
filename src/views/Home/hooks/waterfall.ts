import { getStyle, injectStyle } from '@/utils/dom.ts'
import { toNumber } from '@/utils/core.ts'


interface IWaterfallOptions {
  containerClass: string
  gap?: number
  column?: number
  isResize?: boolean
  resizeDelay?: number
  isLazy?: boolean
  containerRatio?: number
  lazyCallback?: () => void
}

interface IWaterfallReturns {
  removeWaterfallResize: () => void
  removeWaterfallScroll: () => void
  initWaterfall: () => void
  columnHeight: number[],
  processWaterfallItemWidth: () => void
}

/**
 * 1、根据容器宽度，计算卡片的宽度，然后将第一行卡片遍历出来，设置容器的高度，并且将第一行卡片的高度存储起来
 * 2、第二行开始，对存储起来的高度进行计算，找到最小的高度，然后将卡片放到最小高度的下面，然后更新最小高度的高度
 * 3、重复第二步，直到所有卡片都排列完毕
 * 
 * @param containerClass 容器类名
 * @param gap 卡片间隙
 * @param column 列数
 * @param resizeDelay 响应延迟时间
 * @param isResize 是否响应
 * @param isLazy 是否懒加载 纯效果
 * @returns:  
 *  @return removeWaterfallResize 移除响应函数
 *  @return initWaterfall 初始化瀑布流函数
 *  @return columnHeight 每列的高度
 *  @return behaviorCollector 行为收集器
 */
export const useWaterfall = ({
  containerClass = 'y-homeList__waterfall',
  gap = 20,
  column = 4,
  resizeDelay = 500,
  isResize = true,
  isLazy = true,
  containerRatio = 1,
  lazyCallback = null
}: IWaterfallOptions): IWaterfallReturns => {

  let resizeTimer: number = null; // 响应函数定时器
  let scrollTimer: number = null; // 滚动函数定时器
  let columnHeight: number[] = []; // 同步存储每列的高度
  let container: HTMLElement = null; // 容器dom
  let children: HTMLElement[] = null; // 容器所有子元素dom
  let containerWidth = 0; // 容器宽度
  let itemWidth: number; // 单个卡片宽度

  /**
   * @description: 初始化容器高度
   * @return {void}
   */
  const initWaterfallContainer = (): void => {
    let maxHeight = toNumber(getStyle(container.children[0] as HTMLElement, 'height'));
    const elList = Array.from(container.children);
    for (let i = 0; i < elList.length; i++) {
      const el = elList[i] as HTMLElement;
      const height = toNumber(getStyle(el, 'height'));
      maxHeight = height > maxHeight ? height : maxHeight;
    }
    injectStyle(container, 'height', `${maxHeight + 20}px`);
  }

  /**
   * @description: 计算每个的宽度，并初始化子元素宽度
   * @return {void} 
   */
  const processWaterfallItemWidth = (): void => {
    containerWidth = toNumber(getStyle(container, 'width'));
    itemWidth = containerWidth / column - gap;
    children.forEach(item => injectStyle(item, 'width', `${itemWidth}px`));
  }

  /**
   * @description: 瀑布流排序
   * @return {void}
   */
  const proccessWaterfallReorder = (): void => {
    let left = gap;
    let top = 0;
    let minHeight = toNumber(getStyle(children[0], 'height'));;
    let minHeightColumnIndex = 0;

    for (let i = 0; i < children.length; i++) {
      const height = toNumber(getStyle(children[i], 'height'));
      const el = children[i];

      if (i >= column) {
        // 获取最小高度
        minHeight = Math.min(...columnHeight);
        // 获取最小高度的索引
        minHeightColumnIndex = columnHeight.indexOf(minHeight);
        // 更新top
        top = minHeight + gap;
        // 更新left
        left = (itemWidth + gap) * minHeightColumnIndex + gap / 2;
        // 更新最小高度
        columnHeight[minHeightColumnIndex] += height + gap;
        // 调整容器高度
        injectStyle(container, 'height', `${Math.max(...columnHeight) + 20}px`);
      } else {
        // 将第一行排开，并且将高度存储起来
        left = (itemWidth + gap) * i + gap / 2;
        columnHeight.push(height);
      }
      injectStyle(el, 'left', `${left}px`);
      injectStyle(el, 'top', `${top}px`);
      injectStyle(el, 'display', 'block');
    }
  }

  /**
   * @description: 初始化瀑布流
   * @return {void}
   */
  const initWaterfall = (): void => {
    // 处理每个的宽度
    processWaterfallItemWidth();
    // 初始化容器高度
    initWaterfallContainer();
    // 进行瀑布流排序
    columnHeight.length = 0;
    proccessWaterfallReorder();
  }

  /**
   * @description: 判断容器是否在视口内，判断容器是否完全在视口内，或者超出了视口
   * @param {number} threshold
   * @return {*}
   */
  const isContainerInViewportSync = async (threshold: number = 1): Promise<{ flag: boolean, observe: IntersectionObserver }> => {
    return new Promise((resolve) => {
      const observe = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // 容器高度小于视口高度的时候
          let flag = entry.intersectionRatio >= threshold && window.innerHeight >= container.clientHeight;

          // 容器高度大于视口，判断是否滑动到了容器底部
          if (entry.boundingClientRect.top < 0) {
            flag = Math.abs(entry.boundingClientRect.top) + window.innerHeight >= entry.boundingClientRect.height
          }

          resolve({ flag, observe });
        });
      }, {
        threshold: [threshold]
      });

      observe.observe(container);
    });
  };

  /**
   * @description: resize事件
   * @return {void}
   */
  const handleWaterfallResize = (): void => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initWaterfall, resizeDelay);
  }

  /**
   * @description: 移除resize事件
   * @return {void}
   */
  const removeWaterfallResize = (): void => {
    window.removeEventListener('resize', handleWaterfallResize);
  }
  /**
   * @description: 滚动事件
   * @return {void}
   */
  const handleWaterfallScoll = (): void => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(async () => {
      const { flag, observe } = await isContainerInViewportSync(containerRatio);
      if (flag && lazyCallback && typeof lazyCallback === 'function') {
        lazyCallback();
      }
      observe.unobserve(container);
    }, 200)
  }

  /**
   * @description: 移除滚动事件
   * @return {void}
   */
  const removeWaterfallScroll = (): void => {
    document.body.removeEventListener('scroll', handleWaterfallScoll);
  }


  // start
  onMounted(() => {
    setTimeout(() => {
      container = document.querySelector(`.${containerClass}`);

      if (!container) {
        console.error(`y-waterfall：Please set the class name of the container to ${containerClass}, and container not found!`);
        return;
      }

      children = Array.from(container.children) as HTMLElement[];

      // 初始化瀑布流
      initWaterfall();
      // 瀑布流响应
      if (isResize) window.addEventListener('resize', handleWaterfallResize);
      // 懒加载
      if (isLazy) document.body.addEventListener('scroll', handleWaterfallScoll)
    }, 350);
  })

  onUnmounted(() => {
    if (isResize) removeWaterfallResize();
    removeWaterfallScroll();
    columnHeight = null;
    container = null;
    children = null;
    containerWidth = null;
    resizeTimer = null;
  })

  return {
    removeWaterfallResize,
    removeWaterfallScroll,
    initWaterfall,

    columnHeight,
    processWaterfallItemWidth
  }
}