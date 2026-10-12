import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,
  plugins: [svelte()],
  // One cache per app: the three apps share e2e/node_modules.
  cacheDir: '../../node_modules/.vite-svelte',
  server: { port: 4303, strictPort: true },
  preview: { port: 4303, strictPort: true },
  build: {
    outDir: '../../dist/svelte',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        form: `${import.meta.dirname}/index.html`,
        events: `${import.meta.dirname}/events.html`,
      },
    },
  },
});
