import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { transform } from 'framer-motion'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
    "/api": {
      target: 'http://localhost:8000'
    }
  }
}
})
