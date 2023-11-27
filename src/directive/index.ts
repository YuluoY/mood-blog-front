import { App } from 'vue'
import auth from './auth.ts'

const directives = [auth]

export default {
  install(app: App) {
    directives.forEach((directive) => directive.install(app))
  },
}
