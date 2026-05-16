import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), visualizer({ open: false, filename: 'stats.html' })],
  build: {
    rollupOptions: {
      output: {
        // vendor chunk 분리 — 라이브러리 캐시 효율 개선
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'ui-vendor': ['styled-components'],
          'http-vendor': ['axios', 'zustand'],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
    },
  },
})
