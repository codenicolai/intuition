import { expect, fixture, html } from '@open-wc/testing';
import '../src/components/button/button.js';
import type { IuButton } from '../src/components/button/button.js';

describe('iu-button', () => {
  it('renders the slotted label', async () => {
    const el = await fixture<IuButton>(html`<iu-button>Send</iu-button>`);
    expect(el.textContent).to.equal('Send');
    expect(el.shadowRoot?.querySelector('button')).to.exist;
  });

  it('reflects variant and size defaults', async () => {
    const el = await fixture<IuButton>(html`<iu-button></iu-button>`);
    expect(el.getAttribute('variant')).to.equal('primary');
    expect(el.getAttribute('size')).to.equal('md');
  });

  it('emits a native click event', async () => {
    const el = await fixture<IuButton>(html`<iu-button>Go</iu-button>`);
    let clicks = 0;
    el.addEventListener('click', () => clicks++);
    el.shadowRoot?.querySelector('button')?.click();
    expect(clicks).to.equal(1);
  });

  it('blocks click when disabled', async () => {
    const el = await fixture<IuButton>(
      html`<iu-button disabled>Go</iu-button>`,
    );
    const inner = el.shadowRoot?.querySelector('button');
    expect(inner?.disabled).to.be.true;
  });

  it('submits the surrounding form when type is submit', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form><iu-button type="submit">Send</iu-button></form>
    `);
    let submitted = false;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitted = true;
    });
    const el = form.querySelector('iu-button') as IuButton;
    expect(el.form).to.equal(form);
    el.shadowRoot?.querySelector('button')?.click();
    expect(submitted).to.be.true;
  });

  it('resets the surrounding form when type is reset', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <input name="q" value="initial" />
        <iu-button type="reset">Reset</iu-button>
      </form>
    `);
    const input = form.querySelector('input') as HTMLInputElement;
    input.value = 'changed';
    const el = form.querySelector('iu-button') as IuButton;
    el.shadowRoot?.querySelector('button')?.click();
    expect(input.value).to.equal('initial');
  });

  it('is accessible', async () => {
    const el = await fixture<IuButton>(html`<iu-button>Send</iu-button>`);
    await expect(el).to.be.accessible();
  });
});
