# Vite + Ts + Vue3企业级项目搭建

<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/Vue3-3.3.8-brightgreen.svg" alt="vue3">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/Element Plus-2.4.2-brightgreen.svg" alt="element-plus">
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT">
  </a>
</p>

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [typescript](https://www.typescriptlang.org/)、[vue3](https://cn.vuejs.org/index.html)、[pinia](https://pinia.vuejs.org/zh/)、[vue-router4](https://router.vuejs.org/zh-cn/) 、[vite](https://cn.vitejs.dev/) 、[axios](https://github.com/axios/axios) 和 [element-plus](https://element-plus.org/zh-CN/)，提前了解和学习这些知识会对使用本项目有很大的帮助。

## 开发环境

0. 开发编辑器：vscode-v1.84.2
1. 包管理工具：pnpm -v8.10.5、npm-v10.2.3
2. 脚手架：vite-v5.0.2
3. Nodejs：node-v18.18.2
4. 预编译样式：sass-v1.69.5
5. 组件库：Element Plus-v2.4.2
6. 浏览器：版本 119.0.6045.106（正式版本） （64 位）
7. 状态管理：pinia-v2.1.7
8. 国际化：vue-i18n-v9.4.1
9. 路由管理：vue-router-v4.2.5
10. Ajax请求：axios-v1.6.2、@types/axios-v0.14.0
11. 生成注释插件：koroFileHeader-v4.9.3  （文件快捷键：ctrl + win + i，函数快捷键：ctrl + win + t，随机搞笑图：ctrl + win + j）

[更多](https://github.com/YuluoY/mood-blog-front/blob/main/package.json)

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了涵盖开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
mood-blog-front
├─ .env
├─ .env.development
├─ .env.production
├─ .env.staging
├─ .eslintrc.cjs
├─ .eslintrcignore
├─ .husky
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ _
│     ├─ .gitignore
│     └─ husky.sh
├─ .prettierignore
├─ .prettierrc.cjs
├─ .stylelintcache
├─ .stylelintignore
├─ .stylelintrc.cjs
├─ auto-imports.d.ts
├─ commitlint.config.js
├─ components.d.ts
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  └─ rest.ts
│  ├─ App.vue
│  ├─ assets
│  │  ├─ styles
│  │  │  ├─ base.scss
│  │  │  ├─ bem.scss
│  │  │  └─ index.scss
│  │  └─ vue.svg
│  ├─ components
│  │  └─ Layout
│  │     ├─ Foot
│  │     │  └─ index.vue
│  │     ├─ Head
│  │     │  └─ index.vue
│  │     ├─ index.vue
│  │     ├─ Main
│  │     │  └─ index.vue
│  │     └─ Sider
│  │        └─ index.vue
│  ├─ global
│  │  └─ index.ts
│  ├─ lang
│  │  ├─ en
│  │  │  └─ index.ts
│  │  ├─ index.ts
│  │  └─ zh
│  │     └─ index.ts
│  ├─ main.ts
│  ├─ plugins
│  │  └─ nprogress
│  │     └─ index.ts
│  ├─ router
│  │  ├─ dynamicRoutes.ts
│  │  ├─ index.ts
│  │  └─ promission.ts
│  ├─ store
│  │  ├─ mainStore.ts
│  │  └─ namespace.ts
│  ├─ types
│  │  ├─ Api
│  │  │  ├─ index.ts
│  │  │  ├─ rest.ts
│  │  │  └─ user.ts
│  │  └─ core
│  │     └─ index.ts
│  ├─ utils
│  │  ├─ dayjs.ts
│  │  ├─ request.ts
│  │  └─ types
│  ├─ views
│  │  └─ Home.vue
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

## 如何设置以及启动项目

### 安装依赖

```bash
pnpm install
```

### 启动本地开发环境（自带热启动）

```bash
pnpm run dev
```

### 构建生产环境 

```bash
pnpm run build:prod
```

### 代码格式检查以及自动修复

```bash
pnpm run lint
```

## 浏览器支持

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IE10, IE11, Edge                                                                                                                                                                                                | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               |

## License

[MIT License](https://github.com/Armour/vue-typescript-admin-template/blob/master/LICENSE)
