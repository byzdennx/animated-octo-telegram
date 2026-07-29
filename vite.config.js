import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    sourcemap: false,
    minify: 'esbuild', // Gunakan esbuild instead of terser
    // Hapus konfigurasi terser
  }
})
