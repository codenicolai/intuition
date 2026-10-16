import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,
  plugins: [
    // Raw pages use <iu-button> as a custom element, so Vue must not resolve it.
    vue({
      exclude: [/PortFormPage\.vue$/],
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('iu-') },
      },
    }),
    // The port page writes <iu-button> too, but it must resolve to the IuButton
    // component from @intuition-ui/vue: isCustomElement would bypass the port.
    vue({ include: [/PortFormPage\.vue$/] }),
  ],
  // The port resolves `vue` from the monorepo root; force a single copy.
  resolve: { dedupe: ['vue'] },
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
        port: `${import.meta.dirname}/port.html`,
      },
    },
  },
});
