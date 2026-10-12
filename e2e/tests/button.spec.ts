import { expect, test, type Page } from '@playwright/test';
import { snap, snapDir } from './helpers';

async function open(page: Page) {
  await page.goto('/');
  await page.waitForFunction(() =>
    [...document.querySelectorAll('iu-button')].every((el) => el.shadowRoot),
  );
}

const send = (page: Page) => page.locator('iu-button').nth(0);
const clear = (page: Page) => page.locator('iu-button').nth(1);
const ghost = (page: Page) => page.locator('iu-button').nth(2);
const result = (page: Page) => page.locator('form + p');

async function fill(page: Page) {
  await page.fill('input[name=name]', 'Leo');
  await page.fill('input[name=email]', 'leo@example.com');
  await page.fill('textarea[name=message]', 'hello');
}

test('renders three upgraded buttons with the expected variants and sizes', async ({ page }) => {
  await open(page);
  const info = await page.locator('iu-button').evaluateAll((els) =>
    els.map((el) => {
      const inner = el.shadowRoot!.querySelector('button')!;
      const cs = getComputedStyle(inner);
      return {
        variant: el.getAttribute('variant'),
        size: el.getAttribute('size'),
        height: inner.getBoundingClientRect().height,
        bg: cs.backgroundColor,
        font: cs.fontFamily,
        fontSize: cs.fontSize,
        radius: cs.borderTopLeftRadius,
      };
    }),
  );
  expect(info.map((i) => i.variant)).toEqual(['primary', 'secondary', 'ghost']);
  expect(info.map((i) => i.size)).toEqual(['md', 'md', 'sm']);
  expect(info.map((i) => i.height)).toEqual([36, 36, 32]);
  expect(info[0].bg).toBe('rgb(23, 23, 23)');
  expect(info[1].bg).toBe('rgb(255, 255, 255)');
  expect(info[2].bg).toBe('rgba(0, 0, 0, 0)');
  for (const i of info) {
    expect(i.font).toContain('system-ui');
    expect(i.fontSize).toBe('14px');
    expect(i.radius).toBe('8px');
  }
});

test('adds exactly one hidden proxy submit button to the form', async ({ page }) => {
  await open(page);
  await expect(page.locator('form [data-iu-proxy]')).toHaveCount(1);
});

test('click on submit shows the loading state, then submits', async ({ page }, info) => {
  await open(page);
  await fill(page);
  await send(page).click();
  await expect(send(page)).toHaveText('Sending...');
  expect(await send(page).evaluate((el: HTMLElement & { disabled: boolean }) => el.disabled)).toBe(true);
  await page.screenshot({ path: snap(snapDir('button', info.project.name), '04-sending.png') });
  await expect(result(page)).toHaveText('Sent: Leo <leo@example.com>: hello');
  expect(await send(page).evaluate((el: HTMLElement & { disabled: boolean }) => el.disabled)).toBe(false);
  await page.screenshot({ path: snap(snapDir('button', info.project.name), '05-submitted.png') });
});

test('Enter in a field submits the form', async ({ page }) => {
  await open(page);
  await fill(page);
  await page.press('input[name=email]', 'Enter');
  await expect(result(page)).toHaveText('Sent: Leo <leo@example.com>: hello');
});

test('required fields block submission', async ({ page }) => {
  await open(page);
  await send(page).click();
  await page.waitForTimeout(800);
  await expect(result(page)).toHaveCount(0);
  await page.press('input[name=name]', 'Enter');
  await page.waitForTimeout(800);
  await expect(result(page)).toHaveCount(0);
});

test('reset clears the form', async ({ page }) => {
  await open(page);
  await fill(page);
  await send(page).click();
  await expect(result(page)).toBeVisible();
  await clear(page).click();
  await expect(page.locator('input[name=name]')).toHaveValue('');
  await expect(page.locator('input[name=email]')).toHaveValue('');
  await expect(page.locator('textarea[name=message]')).toHaveValue('');
  await expect(result(page)).toHaveCount(0);
});

test('ghost button handles click', async ({ page }) => {
  await open(page);
  await ghost(page).click();
  await expect(result(page)).toHaveText('Ghost clicked');
});

test('keyboard: Tab reaches the button and Space activates it', async ({ page }, info) => {
  await open(page);
  await fill(page);
  await page.focus('textarea[name=message]');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  expect(focused).toBe('iu-button');
  await page.screenshot({ path: snap(snapDir('button', info.project.name), '03-focus.png') });
  await page.keyboard.press('Space');
  await expect(result(page)).toHaveText('Sent: Leo <leo@example.com>: hello');
});

test('visual snapshots', async ({ page }, info) => {
  const dir = snapDir('button', info.project.name);
  await open(page);
  await page.screenshot({ path: snap(dir, '01-page.png'), fullPage: true });
  // Isolate each button so element screenshots do not capture neighbors.
  // Only the outer layout changes; the component internals stay untouched.
  await page.addStyleTag({ content: 'iu-button { margin: 12px; }' });
  for (const [i, name] of ['send', 'clear', 'ghost'].entries()) {
    await page.locator('iu-button').nth(i).screenshot({ path: snap(dir, `02-button-${name}.png`) });
  }
  await clear(page).hover();
  await page.waitForTimeout(250);
  await clear(page).screenshot({ path: snap(dir, '02-button-clear-hover.png') });
  await ghost(page).hover();
  await page.waitForTimeout(250);
  await ghost(page).screenshot({ path: snap(dir, '02-button-ghost-hover.png') });
});
