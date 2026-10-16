import { expect, test } from '@playwright/test';
import { snap, snapDir } from './helpers';

// Framework ports (@intuition-ui/react, /vue, /svelte), generated from the manifest.
// In each app, port.html renders the same form as index.html using the port
// component instead of the raw <iu-button>. Both must behave and look the same.

const ready = () => [...document.querySelectorAll('iu-button')].every((el) => el.shadowRoot);

test('port renders iu-button elements with the same attributes, no console warnings', async ({ page }) => {
  const logs: string[] = [];
  page.on('console', (m) => {
    // Failed requests are checked below, so the browser's favicon probe is ignored.
    if (['error', 'warning'].includes(m.type()) && !m.text().startsWith('Failed to load resource'))
      logs.push(m.text());
  });
  page.on('response', (r) => {
    if (r.status() >= 400 && !r.url().endsWith('/favicon.ico')) logs.push(`${r.status()} ${r.url()}`);
  });
  await page.goto('/port.html');
  await page.waitForFunction(ready);
  const attrs = await page.locator('iu-button').evaluateAll((els) =>
    els.map((el) => [el.getAttribute('variant'), el.getAttribute('size')]),
  );
  expect(attrs).toEqual([
    ['primary', 'md'],
    ['secondary', 'md'],
    ['ghost', 'sm'],
  ]);
  expect(logs).toEqual([]);
});

test('submit, Enter, reset and click work through the port', async ({ page }) => {
  await page.goto('/port.html');
  await page.waitForFunction(ready);
  const result = page.locator('form + p');
  await page.fill('input[name=name]', 'Leo');
  await page.fill('input[name=email]', 'leo@example.com');
  await page.fill('textarea[name=message]', 'hello');
  await page.locator('iu-button').nth(0).click();
  await expect(page.locator('iu-button').nth(0)).toHaveText('Sending...');
  await expect(result).toHaveText('Sent: Leo <leo@example.com>: hello');
  await page.locator('iu-button').nth(1).click();
  await expect(page.locator('input[name=name]')).toHaveValue('');
  await page.fill('input[name=name]', 'Leo');
  await page.fill('input[name=email]', 'leo@example.com');
  await page.press('input[name=email]', 'Enter');
  await expect(result).toHaveText('Sent: Leo <leo@example.com>: ');
  await page.locator('iu-button').nth(2).click();
  await expect(result).toHaveText('Ghost clicked');
});

test('port buttons are pixel-identical to the raw custom element', async ({ page }, info) => {
  const shots: Record<string, Buffer[]> = {};
  for (const [label, url] of [
    ['raw', '/'],
    ['port', '/port.html'],
  ] as const) {
    await page.goto(url);
    await page.waitForFunction(ready);
    await page.addStyleTag({ content: 'iu-button { margin: 12px; }' });
    const dir = snapDir('ports', info.project.name, label);
    shots[label] = [];
    for (const [i, name] of ['send', 'clear', 'ghost'].entries()) {
      shots[label].push(
        await page.locator('iu-button').nth(i).screenshot({ path: snap(dir, `button-${name}.png`) }),
      );
    }
  }
  for (let i = 0; i < 3; i++) {
    expect(shots.port[i].equals(shots.raw[i]), `button ${i}`).toBe(true);
  }
});
