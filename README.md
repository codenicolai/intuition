<h1 align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/logo-dark.png" />
    <img src="docs/assets/logo.png" alt="Intuition UI" width="280" />
  </picture>
</h1>

Agnostic, AI-first component library for web applications, built on Web Components.

Each component is defined once by a **base signature** (the Custom Elements Manifest). From it derive the framework-agnostic implementation, idiomatic usage in React, Vue and Svelte, and documentation that helps AI tools generate correct code.

> Status: Phase 2 (base signature). Not published yet.

## Packages

| Package | Description |
|---|---|
| `@intuition-ui/core` | Web Components written with Lit |

Framework ports (`@intuition-ui/react`, `@intuition-ui/vue`, `@intuition-ui/svelte`) arrive in Phase 3.

## Usage (planned)

With a bundler:

```js
import '@intuition-ui/core';
```

Without a bundler (plain HTML, Django, Flask, Rails):

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@intuition-ui/core/dist/cdn/intuition.min.js"></script>
<iu-button>Send</iu-button>
```

## Development

Requires Node 22+.

```sh
npm install
npm run build   # custom-elements.json + tsc (ESM) + esbuild (CDN bundle)
npm run dev     # @web/dev-server, opens /demo/
npm test        # @web/test-runner (Chromium via Playwright)
npm run lint    # Biome + custom-elements.json up to date
npm run analyze -w @intuition-ui/core   # regenerate custom-elements.json
```

First run of the tests may require `npx playwright install chromium`.

## Documentation

- Architecture decisions: [`docs/adr/`](docs/adr/)

## Academic context

Undergraduate thesis (TCC), Software Engineering, Universidade Tecnológica Federal do Paraná (UTFPR), Dois Vizinhos campus. Author: Leonardo Nicolai Padilha. Advisor: Dr. Bruno de Castro Honorato Silva.

## License

[MIT](LICENSE)
