import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
// eslint-disable-next-line
// const path = require("path");
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin({ jsx: true })],
  resolve: {
    alias: {
      "@": "/src",
      types: "/types",
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main"),
      name: "ml-components",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "lodash", "element-ui", "echarts", "dplayer"],
    },
  },
});
