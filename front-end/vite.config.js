import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': {
        target: 'http://localhost:8000',
        changeOrigin: true,  // Thêm thuộc tính này nếu bạn gặp vấn đề với CORS
        rewrite: (path) => path.replace(/^\/products/, '/products'), // Tuỳ chọn này có thể không cần thiết
      },
    },
  },
});
