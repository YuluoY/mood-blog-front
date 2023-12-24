/// <reference types="vite/client" />

import { EnumRole, TypeRole } from './types/core/index.ts';

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
declare module 'vue-router' {
  interface RouteMeta {
    icon?: string;
    title?: string;
    cover?: string;
    affix?: boolean;
    roles?: TypeRole[];
  }
}