import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { compileScript, parse } from '@vue/compiler-sfc';

// The Vue port is used in kebab-case (<iu-button>), as the Vue style guide allows.
// Vue resolves the tag to the imported IuButton component, unless the project
// marks iu-* as custom elements: then the port is silently bypassed.
const file = path.resolve(import.meta.dirname, '../apps/vue/src/PortFormPage.vue');

function compile(isCustomElement: boolean) {
  const { descriptor } = parse(fs.readFileSync(file, 'utf8'));
  return compileScript(descriptor, {
    id: 'port',
    inlineTemplate: true,
    templateOptions: {
      compilerOptions: isCustomElement ? { isCustomElement: (t) => t.startsWith('iu-') } : {},
    },
  }).content;
}

test.describe('vue port in kebab-case', () => {
  test.beforeEach(({}, info) => {
    test.skip(info.project.name !== 'vue', 'Vue only');
  });

  test('<iu-button> resolves to the IuButton component', () => {
    const code = compile(false);
    expect(code).toContain('_unref(IuButton)');
    expect(code).not.toContain('"iu-button"');
  });

  test('isCustomElement for iu-* bypasses the port', () => {
    const code = compile(true);
    expect(code).toContain('"iu-button"');
    expect(code).not.toContain('_unref(IuButton)');
  });
});
