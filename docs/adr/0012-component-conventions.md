# ADR 0012: Component conventions

- **Status:** accepted
- **Phase:** 1
- **Date:** 2026-10-06

## Context

The first component (`iu-button`) sets the pattern for the whole catalog. Four questions had to be answered: how components are styled, whether they use Shadow DOM, how they participate in native forms, and how large the initial API is.

## Decision

1. **Styling:** minimal neutral styles, customizable through CSS custom properties (`--iu-<component>-*`) and `::part()`.
2. **Shadow DOM:** components render into Shadow DOM and expose content through `<slot>`. Focus is delegated (`delegatesFocus: true`) to the internal native element.
3. **Forms:** components that interact with forms are form-associated (`static formAssociated = true` plus `ElementInternals`). `iu-button` calls `form.requestSubmit()` or `form.reset()` according to `type`.
4. **`iu-button` API:** `variant` (`primary` | `secondary` | `ghost`), `size` (`sm` | `md` | `lg`), `disabled` (boolean) and `type` (`button` | `submit` | `reset`). `variant`, `size` and `disabled` are reflected to attributes so CSS can target them. Clicks are the native `click` event.
5. **Documentation in source:** JSDoc tags (`@summary`, `@slot`, `@csspart`, `@cssprop`) describe the public surface so the CEM analyzer can extract them in Phase 2.

## Alternatives considered

- Headless (no styles): closer to the original "shadcn without styles" idea, but demos look unfinished.
- Full design system with themes: out of the thesis focus.
- Light DOM: global CSS (e.g. Tailwind) applies directly, but loses slots and encapsulation.
- Internal `<button>` only, without form association: a button inside Shadow DOM does not submit an outer `<form>`.
- Larger API (loading, icon slots, `href`): more surface to port and document before the pipeline is validated.

## Consequences

- The API exercises string enums and booleans, which is enough to test the manifest and the ports.
- Native `click` avoids a custom event for the Button, so the event naming question is not blocking for this component. It remains open for AI components (Phase 6) and will be tested empirically.
- CSS custom properties and parts become part of the base signature and must be kept stable.

## Traceability

Objective 2, RF01, RF02, RNF02
