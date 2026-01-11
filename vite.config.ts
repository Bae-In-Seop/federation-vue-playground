import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { federation } from '@module-federation/vite'

export default defineConfig({
  base: '/federation-vue-playground/',
  plugins: [
    vue(),
    federation({
      name: 'vue_playground',
      filename: 'remoteEntry.js',
      exposes: {
        './mount': './src/mount.ts',
      },
      // Vue is NOT shared - remote bundles its own Vue
      // This prevents conflicts with host's Vue instance
      shared: {},
    }),
  ],
  server: {
    port: 5003,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5003,
  },
  build: {
    target: 'esnext',
    minify: false,
  },
})
