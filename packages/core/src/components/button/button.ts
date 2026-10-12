import { html, LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buttonStyles } from './button.styles.js';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * A button that works in any framework and inside native forms.
 *
 * @summary Triggers an action or submits a form.
 *
 * @slot - The button label.
 *
 * @csspart base - The internal `<button>` element.
 *
 * @cssprop --iu-button-font-family - Font family. Defaults to the system UI font; use `inherit` to follow the page.
 * @cssprop --iu-button-font-size - Font size. Defaults depend on `size`.
 * @cssprop --iu-button-radius - Corner radius.
 * @cssprop --iu-button-bg - Background color.
 * @cssprop --iu-button-fg - Text color.
 * @cssprop --iu-button-border - Border color.
 * @cssprop --iu-button-bg-hover - Background color on hover.
 * @cssprop --iu-button-shadow - Box shadow.
 * @cssprop --iu-button-focus-ring - Focus ring color.
 */
@customElement('iu-button')
export class IuButton extends LitElement {
  static override styles = buttonStyles;
  static formAssociated = true;
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Visual style. */
  @property({ reflect: true }) variant: ButtonVariant = 'primary';

  /** Size of the button. */
  @property({ reflect: true }) size: ButtonSize = 'md';

  /** Disables the button and prevents interaction. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Behavior inside a form, like the native `type` attribute. */
  @property() type: ButtonType = 'button';

  private readonly internals: ElementInternals;

  /**
   * Native submit button placed in the form while `type` is `submit`.
   * Browsers only submit a form on Enter (implicit submission) when the
   * form has a native submit button; a form-associated custom element
   * does not count as one.
   */
  private proxySubmit: HTMLButtonElement | null = null;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  /** The form this button is associated with, if any. */
  get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.syncProxySubmit();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeProxySubmit();
  }

  /** Called by the browser when the element moves to another form. */
  formAssociatedCallback(): void {
    this.syncProxySubmit();
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has('type') || changed.has('disabled')) {
      this.syncProxySubmit();
    }
  }

  private syncProxySubmit(): void {
    const form = this.internals.form;
    if (this.type !== 'submit' || !form || !this.isConnected) {
      this.removeProxySubmit();
      return;
    }
    if (!this.proxySubmit) {
      const proxy = document.createElement('button');
      proxy.type = 'submit';
      proxy.tabIndex = -1;
      proxy.setAttribute('aria-hidden', 'true');
      proxy.setAttribute('data-iu-proxy', '');
      proxy.style.cssText =
        'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);border:0;white-space:nowrap;';
      this.proxySubmit = proxy;
    }
    // A disabled default button blocks implicit submission, like a native button.
    this.proxySubmit.disabled = this.disabled;
    if (this.proxySubmit.form !== form) {
      form.append(this.proxySubmit);
    }
  }

  private removeProxySubmit(): void {
    this.proxySubmit?.remove();
    this.proxySubmit = null;
  }

  private handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const form = this.internals.form;
    if (!form) return;
    if (this.type === 'submit')
      form.requestSubmit(this.proxySubmit ?? undefined);
    if (this.type === 'reset') form.reset();
  }

  override render() {
    return html`
      <button
        part="base"
        type="button"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'iu-button': IuButton;
  }
}
