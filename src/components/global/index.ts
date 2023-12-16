import { App, Component } from "vue";
import SvgIcon from "./SvgIcon.ts";

const modules = [
  SvgIcon
]

export const globalComponents = {
  install(app: App) {
    modules.forEach((module: Component) => app.component(module.name, module));
    // const modules = import.meta.glob('./**/*.{vue,ts,tsx}');
    // Object.keys(modules).forEach((key) => {
    //     const name = key.replace(/(.*\/)*([^.]+).*/ig, "$2");
    //     app.component(name, defineAsyncComponent(modules[key]));
    // });
  }
}
