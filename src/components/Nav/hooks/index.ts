import { injectStyle, getStyle } from "@/utils/dom.ts";


export const useNav = (
  subMenuClassname = 'y-navDropMenu'
) => {

  const router = useRouter();
  const { currentRoute } = router;
  // const { t } = useI18n();

  const handleSubNavClick = (item: import("../src/Nav.vue").INavPropsRoute): void => {
    router.push({
      path: `${item.path}`,
    })
  }

  const handleNavClick = (event: Event) => {
    const target = event.currentTarget as HTMLElement;
    const sub = target.lastChild as HTMLElement;

    if (sub.nodeName === 'DIV') {
      const { children } = sub;
      const height = children.item(0).clientHeight * children.length;
      injectStyle(sub, 'height', getStyle(sub, 'height') === '0px' ? `${height}px` : `0px`)
    }
  }

  const subMenuWatcher = watch(currentRoute, () => {
    const el = document.querySelector(`.${subMenuClassname}`) as HTMLElement;
    el && injectStyle(el, 'height', `0px`)
  })

  onBeforeUnmount(() => {
    subMenuWatcher();
  })


  return {
    handleSubNavClick,
    handleNavClick
  }
}