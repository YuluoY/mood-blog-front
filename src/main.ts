import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import i18n from './lang/index.ts'
import 'normalize.css'
import router from './router/index.ts'
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register'
import { globalComponents } from './components/global/index.ts'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(i18n).use(globalComponents).use(router).use(pinia).use(ElementPlus).mount('#app')
