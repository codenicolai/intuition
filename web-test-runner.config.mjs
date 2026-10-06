import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'packages/*/test/**/*.test.ts',
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true, tsconfig: 'tsconfig.base.json' })],
  browsers: [playwrightLauncher({ product: 'chromium' })],
};
