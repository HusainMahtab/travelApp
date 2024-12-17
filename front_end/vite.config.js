import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Vite's default port
    proxy: {
      // Proxy all API requests during local development
      '/api': {
        target:'https://travelapp-jy34.onrender.com',
      },
    },
  }
})
