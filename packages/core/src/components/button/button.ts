import { html, LitElement } from 'lit';
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
 * @cssprop --iu-button-radius - Corner radius.
 * @cssprop --iu-button-font - Font shorthand.
 * @cssprop --iu-button-bg - Background color.
 * @cssprop --iu-button-fg - Text color.
 * @cssprop --iu-button-border - Border color.
 * @cssprop --iu-button-bg-hover - Background color on hover.
 * @cssprop --iu-button-focus-ring - Focus outline color.
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

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  /** The form this button is associated with, if any. */
  get form(): HTMLFormElement | null {
    return this.internals.form;
  }

  private handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const form = this.internals.form;
    if (!form) return;
    if (this.type === 'submit') form.requestSubmit();
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
