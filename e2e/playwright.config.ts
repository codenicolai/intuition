import { defineConfig } from '@playwright/test';

// Cross-framework integration suite (ADR 0014).
// Set PW_CHROMIUM_PATH to use a preinstalled Chromium instead of `npx playwright install chromium`.
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export const apps = [
  { name: 'react', port: 4301 },
  { name: 'vue', port: 4302 },
  { name: 'svelte', port: 4303 },
];

export default defineConfig({
  testDir: './tests',
  workers: 1,
  reporter: [['list']],
  use: {
    viewport: { width: 800, height: 600 },
    deviceScaleFactor: 2,
    launchOptions: { executablePath },
  },
  projects: apps.map((a) => ({
    name: a.name,
    use: { baseURL: `http://localhost:${a.port}` },
  })),
  webServer: apps.map((a) => ({
    command: `npx vite build --config apps/${a.name}/vite.config.ts && npx vite preview --config apps/${a.name}/vite.config.ts`,
    port: a.port,
    reuseExistingServer: !process.env.CI,
  })),
});
