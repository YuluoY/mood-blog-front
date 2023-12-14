import { App } from "vue";

export const globalComponents = {
  install(app: App) {
      const modules = import.meta.glob('./**/*.{vue,ts,tsx}');
      Object.keys(modules).forEach((key) => {
          const name = key.replace(/(.*\/)*([^.]+).*/ig, "$2");
          app.component(name, defineAsyncComponent(modules[key]));
      });
  }
}
