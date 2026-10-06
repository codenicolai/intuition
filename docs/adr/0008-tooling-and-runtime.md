# ADR 0008: Tooling and runtime

- **Status:** accepted
- **Phase:** 0
- **Date:** 2026-09-26

## Context

Development needs a dev server that resolves bare imports without a bundler, browser-based tests for Shadow DOM, and lint and formatting.

## Decision

- Node 22 LTS (`engines` and `.nvmrc`).
- `@web/dev-server` for demo pages.
- `@web/test-runner` with Playwright (Chromium) for tests in a real browser.
- Biome for lint and formatting (single quotes, 2 spaces).

## Alternatives considered

- Vite as dev server; Vitest browser mode for tests.
- ESLint plus Prettier (with lit-analyzer): more configuration.

## Consequences

- Few dependencies, all designed for Web Components or buildless workflows.
- Playwright requires downloading Chromium once (`npx playwright install chromium`).

## Traceability

RNF05
