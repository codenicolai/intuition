import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  files: 'packages/*/dist/**/*.test.js',
  nodeResolve: true,
  browsers: [playwrightLauncher({ product: 'chromium' })],
};
