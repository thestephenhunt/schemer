import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'development',
  plugins: [
    vue(),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + (Math.floor(Math.random() * 90000) + 10000) + `.js`,
        chunkFileNames: `[name]` + (Math.floor(Math.random() * 90000) + 10000) + `.js`,
        assetFileNames: `[name]` + (Math.floor(Math.random() * 90000) + 10000) + `.[ext]`,
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
