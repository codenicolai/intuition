# ADR 0016: Vue and Svelte ports generated from the manifest

- **Status:** accepted
- **Phase:** 3
- **Date:** 2026-10-12

## Context

ADR 0015 generated the React port from `custom-elements.json`. Vue and Svelte also render custom elements directly, but each needs extra work from the consumer: Vue requires `isCustomElement` in the Vite config and gives no prop checking; Svelte gives no types and its compiler raises two accessibility warnings on `<iu-button onclick>`, because it does not know the element is interactive.

## Decision

Create `@intuition-ui/vue` and `@intuition-ui/svelte`, each with a generator that reads `@intuition-ui/core/custom-elements.json` and writes components, following the same rules as the React port (committed generated files, checked by `npm run lint`).

- **Vue** (`src/components.generated.ts`): one `defineComponent` per element, exported as `IuButton` and used in templates in kebab-case (`<iu-button>`). The Vue style guide recommends PascalCase in SFCs but accepts kebab-case everywhere ([Vue style guide](https://vuejs.org/style-guide/rules-strongly-recommended.html)); kebab-case keeps the tag identical to the custom element and to plain HTML, and differentiates Vue from the PascalCase used by React and Svelte. Props carry the manifest type, default and, for literal unions, a `validator` that warns in development (`variant="danger"`). Events become declared `emits` (`@iu-send`). The component renders the tag with `h()`, so no `isCustomElement` config is needed.
- **Svelte** (`src/generated/<Name>.svelte`, Svelte 5): one component per element (`Button`), typed `$props` with manifest defaults, `on<event-name>` props for events (`oniu-send`), children forwarded as a snippet. The accessibility warning is silenced once inside the generated component, so apps compile without warnings. Packaged with `@sveltejs/package`.

## Alternatives considered

- Types only (Volar declarations for Vue, `svelte/elements` for Svelte): smaller, but Vue would still need `isCustomElement` and Svelte apps would keep the warnings.
- Hand-written components: drift from the core with every API change.
- One generic generator for the three frameworks: shared code, but the outputs differ enough (render function, SFC, `createComponent`) that separate small generators are easier to read and maintain.

## Consequences

- Vue: one import, no config. Svelte: one import, no warnings. Both typed from the manifest.
- `e2e/` tests the three ports: same behavior as the raw element, no console warnings, pixel-identical buttons (44/44 tests).
- Events and new properties were verified in a sandbox with a manifest that had an `iu-press` event and a `loading` property: both ports forwarded them correctly.
- Usage differs by framework: `<Button>` in React and Svelte, `<iu-button>` in Vue. This must be explained in the AI documentation (Phase 4).
- In Vue, `<iu-button>` resolves to the imported `IuButton` component only if the project does not mark `iu-*` as custom elements. With `isCustomElement`, the compiler silently renders the raw element and the port is bypassed (verified by `e2e/tests/vue-kebab.spec.ts`).
- In the monorepo, the e2e apps need `resolve.dedupe` to keep a single copy of Vue or Svelte; npm consumers do not.

## Traceability

Objective 3, RF01, RF02, RNF01, RNF04
