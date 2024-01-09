import { injectStyle, getStyle } from "@/utils/dom.ts";
import { RouteRecordRaw } from "vue-router"


export const useNav = (
  subMenuClassname = 'y-navDropMenu'
) => {

  const router = useRouter();
  const { currentRoute } = router;

  const handleSubNavClick = (item: RouteRecordRaw): void => {
    router.push({
      path: item.path,
      params: {

      }
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

  



  return {
    handleSubNavClick,
    handleNavClick
  }
}