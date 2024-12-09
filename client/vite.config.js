import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


//creates proxy to redirect /api to http://localhost:3000
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})
