/*
 * @Author: huyongle 568055454@qq.com
 * @Date: 2023-12-26 00:59:03
 * @LastEditors: huyongle 568055454@qq.com
 * @LastEditTime: 2023-12-27 19:41:05
 * @FilePath: \mood-blog-front\src\views\Article\components\Read\hooks\useCatalog.ts
 * @Description: markdown 目录生成
 * 
 * Copyright (c) 2023 by 雨落, All Rights Reserved. 
 */

import { idleCallback } from "@/utils/core.ts";

interface IToc {
  anchor: string;
  text: string;
  level: number;
}

interface IUseCatalogOptions {
  html: string;  // markdown dom结构字符串
  selector: string; // 目录的元素选择器字符串
  referSelector: string;  // 定位目录的参考元素
  scrollDelay?: number; // 滚动事件触发延时
  catalogLinkSelector?: string; // 目录下的链接class
  catalogLinkActive: string; // 链接高亮class
  catalogScrollSelector?:string; // 目录有滚动条的dom
}

export const useCatalog = ({
  html,
  selector,
  referSelector,
  catalogLinkSelector,
  catalogLinkActive,
  scrollDelay = 100,
  catalogScrollSelector
}: IUseCatalogOptions) => {

  const parser = new DOMParser(); // html string 解析
  // eslint-disable-next-line no-undef
  let doms: NodeListOf<Element> = null;
  let catalogEl: HTMLElement = null; // 目录dom
  let referEl: HTMLElement = null; // 参考dom
  let scrollTimer: number = null;  // 滚动条定时器
  let referIntersectionObserver: IntersectionObserver = null; // 参考dom的observer
  let progress: Ref<number> = ref(0);  // 阅读进度
  // eslint-disable-next-line no-undef
  let catalogLinks: NodeListOf<Element> | HTMLElement[] = null;
  let catalogClickCb: Function = null;

  // 响应
  let resizeTimer: number = null;
  let resizeDelay: number = 300;


  /**
   * @description: 特殊字符替换
   * @param {string} str html字符串
   * @return {string}
   */
  const htmlEscape = (str: string): string => {
    if (!str.length) return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
  }

  /**
   * @description: 生成目录
   * @param {string} content html字符串
   * @return {IToc[]}
   */
  const generateToc = (content: string): IToc[] => {
    const nodes = ['h1', 'h2', 'h3'];
    const doc = parser.parseFromString(content, 'text/html');
    doms = doc.querySelectorAll(nodes.join(','));
    const toc: IToc[] = [];
    doms.forEach((item) => {
      const level = parseInt(item.tagName[1], 10);
      toc.push({
        anchor: `#${htmlEscape(item.textContent)}`,
        text: item.textContent,
        level
      })
    })
    return toc;
  }

  /**
   * @description: 目录吸顶效果
   * @return {void}
   */
  const processCatalogCeiling = (el: HTMLElement, refer: HTMLElement): void => {
    if (!referIntersectionObserver) {
      referIntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { top, height } = entry.boundingClientRect;
          if (top >= 0) {
            progress.value = 0;
          } else {
            progress.value = Number((Math.abs(top) / (height - window.innerHeight) * 100).toFixed(2));
          }
          if (top < -100) {
            el.style.position = 'fixed';
            el.style.left = `${refer.offsetLeft}px`
          } else {
            el.style.position = 'absolute';
            el.style.left = '0'
          }
          referIntersectionObserver.unobserve(refer);
        })
      })
    }
    referIntersectionObserver.observe(refer);
  }

  /**
   * @description: 滚动内容区域的对应的目录标题高亮
   * @return {void}
   */
  const hightlightTitle = (): void => {
    const index = Array.from(doms).findIndex(dom => {
      const id = dom.getAttribute('id');
      const rect = document.getElementById(id)?.getBoundingClientRect();
      return rect.top <= 100 && rect.top >= -100;
    });
    if (index === -1) return;
    const el = catalogLinks[index];
    if (el && !el.classList.contains(catalogLinkActive)) {
      const { top } = el.getBoundingClientRect();
      const catalogScroll = document.querySelector(`.${catalogScrollSelector}`); // 有滚动条的目录dom
      catalogScroll.scrollBy({
        top: top - catalogScroll.clientHeight,
        behavior: 'smooth'
      })
      catalogLinks.forEach(link => link.classList.remove(catalogLinkActive))
      el.classList.add(catalogLinkActive);

    }
  }

  /**
   * @description: 目录点击事件
   * @return {Function} click监听函数，用于取消监听
   */
  const processCatalogClick = (): Function => {
    function handleClick(el: Element) {
      catalogLinks.forEach(link => link.classList.remove(catalogLinkActive))

      setTimeout(() => {
        (el as HTMLElement).classList.add(catalogLinkActive)
      }, 100);
    }

    catalogLinks.forEach(link => {
      (link as HTMLElement).addEventListener('click', handleClick.bind(null, link))
    })

    return handleClick;
  }

  /**
   * @description: 滚动条处理
   * @return {void}
   */
  const handleScroll = (): void => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      processCatalogCeiling(catalogEl, referEl);
    }, scrollDelay);
    idleCallback(() => hightlightTitle())
  }

  /**
   * @description: 响应处理
   * @return {void}
   */
  const handleResize = (): void => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(async () => {
      // 兼容
      await idleCallback(() => processCatalogCeiling(catalogEl, referEl));

      // requestIdleCallback((deadline: IdleDeadline) => {
      //   if(deadline.timeRemaining() > 0) processCatalogCeiling(catalogEl, referEl);
      // })
    }, resizeDelay);
  }

  onMounted(() => {
    setTimeout(() => {
      catalogEl = document.querySelector(`.${selector}`);
      referEl = document.querySelector(`.${referSelector}`);
      catalogLinks = catalogLinkSelector ? document.querySelectorAll(`.${catalogLinkSelector}`) : Array.from(catalogEl.children) as HTMLElement[];

      catalogClickCb = processCatalogClick();
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
    }, 300);
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleScroll);
    if (catalogClickCb) {
      catalogLinks.forEach(link => (link as HTMLElement).removeEventListener('click', catalogClickCb.bind(null, link)))
    }
  })

  return {
    toc: computed(() => generateToc(html)),
    progress
  }
}
