import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { snap, snapDir } from './helpers';

// Visual report for the thesis: for each framework, the same page written with
// the raw <iu-button> and with the generated port. The code differs, the
// screens must be byte-identical. Output: snapshots/ports-report/<framework>/.

const APPS = path.resolve(import.meta.dirname, '../apps');

type Side = { label: string; files: { name: string; code: string }[] };

const read = (p: string) => fs.readFileSync(path.join(APPS, p), 'utf8').trimEnd();

// Integration code a developer writes, per framework.
const SOURCES: Record<string, { raw: Side; port: Side; page: [string, string] }> = {
  react: {
    page: ['react/src/FormPage.tsx', 'react/src/PortFormPage.tsx'],
    raw: {
      label: '<iu-button> (custom element)',
      files: [
        {
          name: 'src/custom-elements.d.ts (hand-written JSX types)',
          code: `import type { IuButton } from '@intuition-ui/core'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type IuButtonProps = DetailedHTMLProps<HTMLAttributes<IuButton>, IuButton> &
  Partial<Pick<IuButton, 'variant' | 'size' | 'disabled' | 'type'>>

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iu-button': IuButtonProps
    }
  }
}`,
        },
      ],
    },
    port: { label: '<Button> (@intuition-ui/react)', files: [] },
  },
  vue: {
    page: ['vue/src/FormPage.vue', 'vue/src/PortFormPage.vue'],
    raw: {
      label: '<iu-button> (custom element)',
      files: [
        {
          name: 'vite.config (required for custom elements)',
          code: `vue({
  template: {
    compilerOptions: { isCustomElement: (tag) => tag.startsWith('iu-') },
  },
})`,
        },
      ],
    },
    port: { label: '<iu-button> (@intuition-ui/vue, kebab-case)', files: [] },
  },
  svelte: {
    page: ['svelte/src/FormPage.svelte', 'svelte/src/PortFormPage.svelte'],
    raw: { label: '<iu-button> (custom element)', files: [] },
    port: { label: '<Button> (@intuition-ui/svelte)', files: [] },
  },
};

// Minimal line diff (LCS) to highlight changed lines on each side.
function diffLines(a: string[], b: string[]) {
  const n = a.length;
  const m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const left: boolean[] = new Array(n).fill(false);
  const right: boolean[] = new Array(m).fill(false);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) left[i++] = true;
    else right[j++] = true;
  }
  while (i < n) left[i++] = true;
  while (j < m) right[j++] = true;
  return { left, right };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function codeBlock(name: string, lines: string[], changed: boolean[] | null, kind: 'del' | 'add') {
  const rows = lines
    .map((l, k) => `<div class="ln ${changed?.[k] ? kind : ''}"><span>${k + 1}</span>${esc(l) || ' '}</div>`)
    .join('');
  return `<div class="file"><div class="fname">${esc(name)}</div><pre>${rows}</pre></div>`;
}

const CSS = `
  body { margin: 0; padding: 24px; background: #fafafa; font: 14px/1.4 system-ui, sans-serif; color: #171717; }
  h1 { font-size: 18px; margin: 0 0 4px; } .sub { color: #525252; margin: 0 0 16px; }
  .cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .col h2 { font-size: 14px; margin: 0 0 8px; } .stat { font-weight: 400; color: #525252; }
  .file { background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; margin-bottom: 12px; overflow: hidden; }
  .fname { padding: 6px 10px; border-bottom: 1px solid #e5e5e5; font-size: 12px; color: #525252; background: #f5f5f5; }
  pre { margin: 0; padding: 6px 0; font: 11px/1.45 ui-monospace, Menlo, monospace; }
  .ln { padding: 0 10px 0 0; white-space: pre; } .ln span { display: inline-block; width: 30px; text-align: right; margin-right: 10px; color: #a3a3a3; }
  .del { background: #fee2e2; } .add { background: #dcfce7; }
  .shot { background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 8px; }
  .shot img { width: 100%; display: block; } .badge { display: inline-block; margin-top: 8px; padding: 2px 8px; border-radius: 999px; background: #dcfce7; color: #166534; font-size: 12px; }
`;

const ready = () => [...document.querySelectorAll('iu-button')].every((el) => el.shadowRoot);

test('ports report: different code, identical screens', async ({ page, browser }, info) => {
  const fw = info.project.name;
  const src = SOURCES[fw];
  const dir = snapDir('ports-report', fw);

  // 1. Screens: same state on both pages (form filled), full page.
  const screens: Record<string, Buffer> = {};
  for (const [label, url] of [
    ['raw', '/'],
    ['port', '/port.html'],
  ] as const) {
    await page.goto(url);
    await page.waitForFunction(ready);
    await page.fill('input[name=name]', 'Leo');
    await page.fill('input[name=email]', 'leo@example.com');
    await page.fill('textarea[name=message]', 'hello');
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    screens[label] = await page.screenshot({ path: snap(dir, `screen-${label}.png`) });
  }
  const identical = screens.raw.equals(screens.port);
  expect(identical, 'raw and port screens must be byte-identical').toBe(true);

  // 2. Code: page diff plus framework-specific extra files.
  const a = read(src.page[0]).split('\n');
  const b = read(src.page[1]).split('\n');
  const { left, right } = diffLines(a, b);
  const extraRaw = src.raw.files.reduce((n, f) => n + f.code.split('\n').length, 0);
  const rawBlocks = [
    codeBlock(src.page[0].replace(`${fw}/`, ''), a, left, 'del'),
    ...src.raw.files.map((f) => codeBlock(f.name, f.code.split('\n'), null, 'del')),
  ].join('');
  const portBlocks = codeBlock(src.page[1].replace(`${fw}/`, ''), b, right, 'add');
  const img = (buf: Buffer) => `data:image/png;base64,${buf.toString('base64')}`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
    <h1>${fw}: raw custom element vs generated port</h1>
    <p class="sub">Different integration code, byte-identical screens. Changed lines highlighted.</p>
    <div class="cols">
      <div class="col"><h2>${esc(src.raw.label)} <span class="stat">· ${left.filter(Boolean).length} changed lines${extraRaw ? ` + ${extraRaw} lines of setup` : ''}</span></h2>${rawBlocks}</div>
      <div class="col"><h2>${esc(src.port.label)} <span class="stat">· ${right.filter(Boolean).length} changed lines, no setup</span></h2>${portBlocks}</div>
    </div>
    <div class="cols">
      <div class="shot"><img src="${img(screens.raw)}"></div>
      <div class="shot"><img src="${img(screens.port)}"><span class="badge">byte-identical to the raw screen</span></div>
    </div>
  </body></html>`;
  const report = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
  await report.setContent(html);
  await report.screenshot({ path: snap(dir, 'code-vs-screen.png'), fullPage: true });
  await report.close();

  // 3. Markdown with the unified view of the changes.
  const md = [
    `# ${fw}: raw custom element vs generated port`,
    '',
    `Screens byte-identical: ${identical ? 'yes' : 'no'}.`,
    '',
    '## Page',
    '',
    '```diff',
    ...a.flatMap((l, k) => (left[k] ? [`- ${l}`] : [])),
    ...b.flatMap((l, k) => (right[k] ? [`+ ${l}`] : [])),
    '```',
    ...src.raw.files.flatMap((f) => ['', `## Only with the raw element: ${f.name}`, '', '```ts', f.code, '```']),
    '',
  ].join('\n');
  fs.writeFileSync(snap(dir, 'code-diff.md'), md);
});
