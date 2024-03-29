import { App, h, render } from "vue"
import MProgress from "./src/progress.ts"
import { MProgressProps } from "./types/index.ts"


MProgress.install = (Vue: App) => {
    Vue.component(MProgress.name, MProgress)
}

const useMProgress = (props: MProgressProps = {}) => {
    const vNode = h(MProgress, props);
    render(vNode, document.body);
    // onBeforeUnmount(() => {
    //     render(null, document.body);
    // })
    return () => render(null, document.body)
}

export { useMProgress }

export default MProgress