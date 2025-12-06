import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'unplugin-dts/vite'
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}', {
          ignore: ["lib/**/*.d.ts"],
        }).map(file => [
          relative(
            'lib',
            file.slice(0, file.length - extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
       assetFileNames: 'assets/[name][extname]',
       entryFileNames: '[name].js',
     }
    }
  },
})
