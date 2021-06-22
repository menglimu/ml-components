import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
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
    base: '/ml-components/',
    outDir: 'docs'
  }
});
