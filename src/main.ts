import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/index.scss' // 本地项目全局样式导入
import i18n from './lang/index.ts' // Internationalization
import 'normalize.css' // A modern alternative to CSS resets
import router from './router/index.ts'

// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register' // Register svg icons
import { globalComponents } from './components/global/index.ts' // Register global components
import directives from './directive/index.ts' // Register global directives
import VueLazy from './plugins/VueLazy/index.ts' // Register global directives
import VueParticles from './plugins/VueParticles/index.ts' // 粒子背景动画效果

import 'md-editor-v3/lib/preview.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
  .use(i18n)
  .use(VueLazy)
  .use(globalComponents)
  .use(directives)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .use(VueParticles)

app.mount('#app');

export default app
