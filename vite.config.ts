import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    dts({ 
      include: ['lib'],
       tsconfigPath: './tsconfig-build.json'
    })
  ],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
       assetFileNames: 'assets/[name][extname]',
       entryFileNames: '[name].js',
     }
    }
  },
})
