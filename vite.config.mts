import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  base: './',
  server: { port: 3000 },
  css: {
    preprocessorOptions: {
      less: { javascriptEnabled: true }
    }
  },
  build: mode === 'example'
    ? { outDir: 'dist', target: 'es2015' }
    : {
        outDir: 'build',
        target: 'es2015',
        lib: {
          entry: fileURLToPath(new URL('./lib/index.ts', import.meta.url)),
          formats: ['es', 'cjs'],
          fileName: format => format === 'es' ? 'index.mjs' : 'index.js',
          cssFileName: 'index'
        },
        rolldownOptions: {
          output: {
            exports: 'default',
            assetFileNames: asset => asset.names.some(name => name.endsWith('.woff2'))
              ? 'fonts/[name][extname]'
              : '[name][extname]'
          }
        }
      }
}))
