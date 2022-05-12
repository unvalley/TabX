import { defineConfig } from 'vite'
import path from 'path'
import envCompatible from 'vite-plugin-env-compatible'
import { injectHtml } from 'vite-plugin-html'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // root: './src',
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  plugins: [react(), viteCommonjs(), envCompatible(), injectHtml()],
  build: {
    outDir: '/dist',
    lib: {
      entry: path.resolve(__dirname, 'src/ui/index.tsx'),
    },
    // rollupOptions: {
    //   input: {
    //     "src/manifest.json"
    //     main: path.resolve(__dirname, 'src/ui/index.tsx'),
    //     background: path.resolve(__dirname, 'src/background.ts'),
    //   },
    //   output: {
    //     entryFileNames: '[name].js',
    //   },
    // },
  },
})
