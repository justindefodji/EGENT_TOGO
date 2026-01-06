import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

// Plugin pour copier 404.html dans dist/
const copy404Plugin = {
  name: 'copy-404',
  apply: 'build',
  generateBundle() {
    const source = path.resolve(__dirname, '404.html')
    const dest = path.resolve(__dirname, 'dist', '404.html')
    const content = fs.readFileSync(source, 'utf-8')
    this.emitFile({
      type: 'asset',
      fileName: '404.html',
      source: content
    })
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/EGENT_TOGO/',
  plugins: [vue(), copy404Plugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
})
