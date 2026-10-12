import { css } from 'lit';

/**
 * Visual baseline inspired by shadcn/ui: neutral palette, 14px medium text,
 * 36px default height, 8px radius, subtle shadow and a soft focus ring.
 */
export const buttonStyles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
    --iu-button-font-family: system-ui, -apple-system, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    --iu-button-radius: 0.5rem;
    --iu-button-bg: #171717;
    --iu-button-fg: #fafafa;
    --iu-button-border: transparent;
    --iu-button-bg-hover: #2b2b2b;
    --iu-button-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --iu-button-focus-ring: rgb(161 161 161 / 0.5);
  }

  :host([variant='secondary']) {
    --iu-button-bg: #ffffff;
    --iu-button-fg: #171717;
    --iu-button-border: #e5e5e5;
    --iu-button-bg-hover: #f5f5f5;
  }

  :host([variant='ghost']) {
    --iu-button-bg: transparent;
    --iu-button-fg: #171717;
    --iu-button-border: transparent;
    --iu-button-bg-hover: #f5f5f5;
    --iu-button-shadow: none;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    font-family: var(--iu-button-font-family);
    font-weight: 500;
    line-height: 1.25rem;
    white-space: nowrap;
    color: var(--iu-button-fg);
    background: var(--iu-button-bg);
    border: 1px solid var(--iu-button-border);
    border-radius: var(--iu-button-radius);
    box-shadow: var(--iu-button-shadow);
    cursor: pointer;
    user-select: none;
    transition:
      background-color 150ms ease,
      box-shadow 150ms ease,
      color 150ms ease;
  }

  button:hover {
    background: var(--iu-button-bg-hover);
  }

  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--iu-button-focus-ring);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([size='sm']) button {
    height: 2rem;
    padding: 0 0.75rem;
    gap: 0.375rem;
    font-size: var(--iu-button-font-size, 0.875rem);
  }

  :host(:not([size])) button,
  :host([size='md']) button {
    height: 2.25rem;
    padding: 0 1rem;
    font-size: var(--iu-button-font-size, 0.875rem);
  }

  :host([size='lg']) button {
    height: 2.5rem;
    padding: 0 1.5rem;
    font-size: var(--iu-button-font-size, 0.875rem);
  }
`;
