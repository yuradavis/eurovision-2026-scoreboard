import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/eurovision-2026-scoreboard/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
