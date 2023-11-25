import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  server: {
    host: '127.0.0.1',
    port: 8080,
    open: true,
  },
})
