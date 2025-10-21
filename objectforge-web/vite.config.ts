import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
    host: true,
    port: 5173,
    proxy: {
      '/api': {
<<<<<<< HEAD
<<<<<<< HEAD
        target: 'http://localhost:8000',
=======
        target: 'http://127.0.0.1:8000',
>>>>>>> pr-local-swagger
=======
        target: 'http://localhost:8000',
>>>>>>> pr-ui-cors
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
})
