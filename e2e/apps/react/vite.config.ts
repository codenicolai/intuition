import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  // The port resolves `react` from the monorepo root; force a single copy.
  resolve: { dedupe: ['react', 'react-dom'] },
  // One cache per app: the three apps share e2e/node_modules.
  cacheDir: '../../node_modules/.vite-react',
  server: { port: 4301, strictPort: true },
  preview: { port: 4301, strictPort: true },
  build: {
    outDir: '../../dist/react',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        form: `${import.meta.dirname}/index.html`,
        events: `${import.meta.dirname}/events.html`,
        port: `${import.meta.dirname}/port.html`,
      },
    },
  },
});
