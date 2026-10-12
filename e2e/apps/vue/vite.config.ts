import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('iu-') },
      },
    }),
  ],
  // One cache per app: the three apps share e2e/node_modules.
  cacheDir: '../../node_modules/.vite-vue',
  server: { port: 4302, strictPort: true },
  preview: { port: 4302, strictPort: true },
  build: {
    outDir: '../../dist/vue',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        form: `${import.meta.dirname}/index.html`,
        events: `${import.meta.dirname}/events.html`,
      },
    },
  },
});
