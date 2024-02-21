import MDropVue from "@/components/global/MDrop/src/MDrop.vue";
import { createVNode, render } from "vue";


export const useMDrop = <T extends { toMount: string | HTMLElement }>(props: T) => {
  const VNode = createVNode(MDropVue);
  if (typeof props.toMount === 'string') {
    props.toMount = document.querySelector(props.toMount) as HTMLElement;
  } else {
    props.toMount = props.toMount || document.body;
  }
  render(VNode, props.toMount);

  onBeforeUnmount(() => {
    render(null, props.toMount as HTMLElement);
  })

  return () => render(null, props.toMount as HTMLElement)
}

export default MDropVue;