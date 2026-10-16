# ADR 0015: React port generated from the manifest

- **Status:** accepted
- **Phase:** 3
- **Date:** 2026-10-12

## Context

React 19 renders custom elements, but using `iu-button` directly requires hand-written JSX types (13 lines in the test app), gives no autocompletion, and accepts `onIuPress`, which silently never fires because React listens to the exact event name. The research question (RF01, RF02) asks whether framework ports can derive from a single base signature, so the port should come from `custom-elements.json` instead of being written by hand.

## Decision

Create `@intuition-ui/react` with two outputs, both generated from `@intuition-ui/core/custom-elements.json` by `packages/react/scripts/generate.mjs`:

1. **Components** (`src/components.generated.ts`): one PascalCase component per custom element (`IuButton` becomes `Button`), built with `@lit/react` `createComponent`. Custom events are mapped to React props (`iu-send` becomes `onIuSend`).
2. **JSX types** (`src/jsx.generated.ts`): `JSX.IntrinsicElements` entries for the raw tags (`<iu-button>`), with the literal union types and descriptions from the manifest, and `on<event-name>` handlers typed with the event detail.

Generated files are committed. `npm run lint` fails if they are out of date (`generate:check`). React 19 is a peer dependency.

## Alternatives considered

- Hand-written wrapper: no generator to maintain, but drifts from the core with every API change (the problem the thesis addresses).
- Generator fully written by us (without `@lit/react`): no extra dependency, but we would maintain property and event bridging that `@lit/react`, maintained by the Lit team, already handles.
- `wc-toolkit/react-wrappers`: ready-made, but less control over the output and another third-party dependency.
- Types only, no components: smallest change, but keeps the lowercase tag and `oniu-send` spelling, which React developers do not expect.
- Generate only at build time: smaller repository, but changes to the port API would not show in the git history.

## Consequences

- Using `iu-button` in React needs one import (`import { Button } from '@intuition-ui/react'`) and no hand-written types. Invalid values (`variant="danger"`, `size="xl"`) and unknown props (`onIuPress` on the raw tag) are type errors.
- A change in the core API updates the port by regenerating; verified in a sandbox by adding a property and an event to the manifest.
- `e2e/` tests the port: same behavior as the raw element and pixel-identical buttons (33/33 tests).
- In the monorepo, the port resolves `react` and `@types/react` from the root, so the e2e app needs `resolve.dedupe` (Vite) and `paths` (tsconfig) to keep a single copy. Consumers installing from npm get a single copy and do not need this.
- The same generator approach is expected for Vue and Svelte (separate decisions).

## Traceability

Objective 3, RF01, RF02, RNF01, RNF04
