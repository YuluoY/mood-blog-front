import { App, DirectiveBinding } from 'vue'

const authVerify = (el: HTMLElement, binding: DirectiveBinding) => {
  const { value } = binding
  console.log(el)
}

export default {
  install(app: App) {
    app.directive('auth', {
      mounted: authVerify,
      updated: authVerify,
    })
  },
}
