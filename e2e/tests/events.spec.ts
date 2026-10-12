import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { DATE, SNAP_ROOT, snap, snapDir } from './helpers';

// Event naming experiment (Phase 1): the probe dispatches `iu-press`,
// `iupress` and `iuPress` on each click. Each app listens with four idiomatic
// spellings; we record which listeners fire and how many times.

const VARIANTS = ['hyphen', 'lower', 'camel', 'pascal'] as const;
type Row = Record<(typeof VARIANTS)[number], number>;

const results: Record<string, { counts: Row; listeners: Record<string, string[]>; console: string[] }> = {};

test('event naming: which idiomatic listeners fire', async ({ page }, info) => {
  const logs: string[] = [];
  page.on('console', (m) => {
    if (['error', 'warning'].includes(m.type())) logs.push(m.text());
  });
  page.on('pageerror', (e) => logs.push(`pageerror: ${e.message}`));

  await page.goto('/events.html');
  await page.waitForFunction(() => document.querySelector('iu-event-probe')?.shadowRoot);

  const probe = page.locator('iu-event-probe');
  await probe.click();
  await probe.click();
  await page.waitForTimeout(200);

  const counts = {} as Row;
  for (const v of VARIANTS) {
    counts[v] = Number(await page.getByTestId(v).textContent());
  }

  // Which event names actually received a listener: dispatch each name alone.
  // 'IuPress' is not fired by the probe; it checks where the PascalCase listener is bound.
  const listeners: Record<string, string[]> = {};
  for (const name of ['iu-press', 'iupress', 'iuPress', 'IuPress']) {
    const before = Object.fromEntries(
      await Promise.all(VARIANTS.map(async (v) => [v, Number(await page.getByTestId(v).textContent())])),
    );
    await probe.evaluate((el, n) => el.dispatchEvent(new CustomEvent(n, { bubbles: true, composed: true })), name);
    await page.waitForTimeout(100);
    listeners[name] = [];
    for (const v of VARIANTS) {
      if (Number(await page.getByTestId(v).textContent()) > before[v]) listeners[name].push(v);
    }
  }

  await page.screenshot({ path: snap(snapDir('events', info.project.name), 'events.png') });
  results[info.project.name] = { counts, listeners, console: logs };
  expect(logs.filter((l) => l.startsWith('pageerror'))).toEqual([]);
});

test.afterAll(async ({}, info) => {
  const file = path.join(SNAP_ROOT, 'events', `${DATE}_event-naming-${info.project.name}.json`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(results[info.project.name] ?? null, null, 2));
});
