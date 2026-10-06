# ADR 0013: Test setup

- **Status:** accepted
- **Phase:** 1
- **Date:** 2026-10-06

## Context

ADR 0008 chose `@web/test-runner`. Tests must not end up in the published `dist`, and Lit decorators in TypeScript must run in the browser.

## Decision

- Tests live in `packages/<name>/test/*.test.ts`, outside `src`, so `tsc` never emits them to `dist`.
- `@web/dev-server-esbuild` transpiles TypeScript on the fly for the test runner, using `tsconfig.base.json` (keeps `experimentalDecorators`).
- `@open-wc/testing` provides `fixture`, Chai assertions and an accessibility check (`to.be.accessible()`, based on axe-core).

## Alternatives considered

- Compile tests with `tsc` into a separate folder: one more build step.
- Tests next to the source (`src/**/*.test.ts`) with an exclude pattern: easy to leak into `dist` by mistake.

## Consequences

- No extra build step before running tests.
- esbuild only strips types; type errors in tests are not reported. A typecheck script for tests can be added later.

## Traceability

RNF02, RNF04
