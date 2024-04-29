import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import manifest from './src/manifest.js'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },

    plugins: [crx({ manifest }), react()],

    resolve: {
      alias: [
        {
          find: '@assets',
          replacement: fileURLToPath(new URL('./src/assets', import.meta.url))
        },
        {
          find: '@components',
          replacement: fileURLToPath(new URL('./src/components', import.meta.url))
        },
        {
          find: '@configs',
          replacement: fileURLToPath(new URL('./src/configs', import.meta.url))
        },
      ]
    },
  
  }
})
