import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/index.scss'
import i18n from './lang/index.ts'
import 'normalize.css'
import router from './router/index.ts'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'
import { globalComponents } from './components/global/index.ts'
import directives from './directive/index.ts'
import VueLazy from './plugins/VueLazy/index.ts'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(i18n)
  .use(VueLazy)
  .use(globalComponents)
  .use(directives)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')
