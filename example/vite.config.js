import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import p from '../dist'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [p(), react()]
})
