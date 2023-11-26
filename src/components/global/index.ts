import { App } from 'vue'

export const globalComponents = {
  install(app: App) {
    const components = import.meta.glob('./**/*.{vue,ts,tsx}')
    Object.keys(components).forEach((key) => {
      const name = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
      app.component(name, components[key])
    })
  },
}
