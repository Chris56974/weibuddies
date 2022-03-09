import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// I have to use this for k8s because my nginx-ingress 
// expects my hmr to be off port 80 and not 3000 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    vue()
  ],
  server: {
    hmr: {
      host: "localhost",
      port: 80
    }
  }
})