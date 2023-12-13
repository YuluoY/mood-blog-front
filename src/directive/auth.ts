import { useUserStore } from '@/store/userStore.ts'
import { App, DirectiveBinding } from 'vue'

const authVerify = (el: HTMLElement, binding: DirectiveBinding) => {
  // 判断是否登录 
  const userStore = useUserStore();
  if (userStore.expire < Date.now()) {
    el.style.display = 'inline-flex';
    userStore.initUser();
  } else {
    el.style.display = 'none';
  }

  // const { value } = binding
  // console.log(el)
}

export default {
  install(app: App) {
    app.directive('auth', {
      mounted: authVerify,
      updated: authVerify,
    })
  },
}
