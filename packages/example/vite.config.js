import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import p from '../plugin/dist/index.mjs'
import ins from 'vite-plugin-inspect'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ins(),
    p({
      entry: ['./foo/index.html', './bar/bar.html', './index.html']
    }),
    react()
  ]
  // build: {
  //   rollupOptions: {
  //     input: [
  //       '/Users/xiehaijie/Desktop/Projects/FrontEnd/vite-plugin-multi-page-app/packages/example/index.html',
  //       '/Users/xiehaijie/Desktop/Projects/FrontEnd/vite-plugin-multi-page-app/packages/example/foo/index.html'
  //     ]
  //   }
  // }
})
