/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue'

  const componentOptions: ComponentOptions
  export default componentOptions
}

// 环境变量
declare interface ImportMetaEnv {
  VITE_BASE_URL: string
}

declare module "@tsparticles/vue3";