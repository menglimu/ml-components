import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
const path = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin({ jsx: true })],
  resolve: {
    alias: {
      '@': '/src',
      types: '/types'
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/packages'),
      name: 'ml-components',
      formats: ['es']
    },
    rollupOptions: {
      external: ['vue', 'lodash']
    }
  }
})
