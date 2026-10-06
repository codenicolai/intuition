import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
    --iu-button-radius: 0.375rem;
    --iu-button-font: inherit;
    --iu-button-bg: #1f2937;
    --iu-button-fg: #ffffff;
    --iu-button-border: transparent;
    --iu-button-bg-hover: #374151;
    --iu-button-focus-ring: #2563eb;
  }

  :host([variant='secondary']) {
    --iu-button-bg: #ffffff;
    --iu-button-fg: #1f2937;
    --iu-button-border: #d1d5db;
    --iu-button-bg-hover: #f3f4f6;
  }

  :host([variant='ghost']) {
    --iu-button-bg: transparent;
    --iu-button-fg: #1f2937;
    --iu-button-border: transparent;
    --iu-button-bg-hover: #f3f4f6;
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
    gap: 0.5em;
    width: 100%;
    font: var(--iu-button-font);
    font-weight: 500;
    line-height: 1;
    color: var(--iu-button-fg);
    background: var(--iu-button-bg);
    border: 1px solid var(--iu-button-border);
    border-radius: var(--iu-button-radius);
    cursor: pointer;
    user-select: none;
    transition: background-color 120ms ease;
  }

  button:hover {
    background: var(--iu-button-bg-hover);
  }

  button:focus-visible {
    outline: 2px solid var(--iu-button-focus-ring);
    outline-offset: 2px;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  :host([size='sm']) button {
    height: 2rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
  }

  :host(:not([size])) button,
  :host([size='md']) button {
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 1rem;
  }

  :host([size='lg']) button {
    height: 3rem;
    padding: 0 1.25rem;
    font-size: 1.125rem;
  }
`;
