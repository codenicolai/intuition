# CLAUDE.md

Context and rules for AI assistants working in this repository.

## Project

Intuition UI: agnostic, AI-first component library built on Web Components. Undergraduate thesis (UTFPR). Each component is defined once by a base signature (Custom Elements Manifest); framework ports (React, Vue, Svelte) and AI documentation (`llms.txt`) derive from it.

Research question: can generative AI interface components be reused across web frameworks with low integration effort?

## Stack (see `docs/adr/`)

- TypeScript 7 (`experimentalDecorators: true`, `useDefineForClassFields: false`)
- Lit 3 for components
- npm workspaces, packages in `packages/*` (only `core` for now)
- Build: `tsc` to ESM (no bundler) + `esbuild` single-file CDN bundle
- Dev server: `@web/dev-server`; tests: `@web/test-runner` + Playwright (Chromium)
- Lint/format: Biome (single quotes, 2 spaces)
- Node 22+
- Tag prefix: `iu-` (e.g. `<iu-button>`)
- Package scope: `@intuition-ui`
- License: MIT
- Code, comments, README and docs in English

## Roadmap

- [x] Phase 0: decisions and monorepo setup
- [ ] Phase 1: `iu-button` in Lit, working in a plain HTML page; decide event naming by empirical test
- [ ] Phase 2: generate `custom-elements.json` with the CEM analyzer
- [ ] Phase 3: React, Vue and Svelte ports, one at a time, each with an example app
- [ ] Phase 4: AI documentation generated from the signature
- [ ] Phase 5: npm publication
- [ ] Phase 6: AI components (prompt input, streaming output)
- [ ] Phase 7: metrics (lines of code, bundle size per framework)

## Working rules

- Small steps.
- Architecture decisions belong to the author: present options, recommend one, wait for the answer.
- One ADR per decision in `docs/adr/`, using the template in `docs/adr/template.md`. Revised ADRs are never deleted; mark them "Superseded by ADR NNNN".
- Update `docs/JOURNAL.md` at every step.
- Conventional Commits. Never commit without the author's confirmation.
- Avoid em dashes in documentation.
- Cite sources with links; state clearly when something is an inference.
- Stay within the approved scope (no iterative AI correction loop, no native non-webview UIs).
