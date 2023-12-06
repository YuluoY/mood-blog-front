import { App } from 'vue'
import SvgIcon from './SvgIcon.ts'

const component = [
  SvgIcon
]

export const globalComponents = {
  install(app: App) {
    component.forEach((item) => app.component(item.name, item))
    // const components = import.meta.glob('./**/*.{ts,tsx}')
    // Object.keys(components).forEach((key) => {
    //   const name = key.replace(/(.*\/)*([^.]+).*/gi, '$2')
    //   app.component(name, components[key])
    // })
  },
}
