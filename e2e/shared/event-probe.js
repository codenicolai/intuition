// Test-only custom element for the event naming experiment (Phase 1).
// On click it dispatches the same CustomEvent under three name formats.
// It is not part of @intuition-ui/core.
export const EVENT_NAMES = ['iu-press', 'iupress', 'iuPress'];

class EventProbe extends HTMLElement {
  #count = 0;

  connectedCallback() {
    if (this.shadowRoot) return;
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = '<button type="button" part="base"><slot>Fire events</slot></button>';
    root.querySelector('button').addEventListener('click', () => {
      this.#count += 1;
      for (const name of EVENT_NAMES) {
        this.dispatchEvent(
          new CustomEvent(name, {
            bubbles: true,
            composed: true,
            detail: { count: this.#count, name },
          }),
        );
      }
    });
  }
}

if (!customElements.get('iu-event-probe')) {
  customElements.define('iu-event-probe', EventProbe);
}
