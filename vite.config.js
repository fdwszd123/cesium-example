import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";
import cesium from "vite-plugin-cesium";
import path from "path";
function _resolve(dir) {
  return path.resolve(__dirname, dir);
}
export default defineConfig({
  plugins: [
    vue(),
    cesium(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": _resolve("src"),
    },
  },
  base: "/",
});
