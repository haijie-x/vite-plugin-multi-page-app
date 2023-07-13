import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import p from 'vite-plugin-multi-page-app'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    p({
      entry: ['./foo/index.html', './bar/index.html', './index.html']
    }),
    react()
  ]
})
